import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { backEndPoint } from "../App";
import { useSnackbar } from "notistack";
import {Grid, Button, Box, Typography, Stack} from '@mui/material';
import Header from './Header';
import "./Videos.css";
import CardDisplay from './CardDisplay';
import { IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Videos = () =>{
    const { enqueueSnackbar } = useSnackbar();
    const [videoDetails, setVideoDetails] = useState({});
    const [votes, setVotes] = useState({})
    const [videoList, setVideoList] = useState([]);
    const history = useHistory();
    const params = useParams();

    const getVideoLink = async(id) =>{
        try{
            // console.log("id printed",id)
            const response = await axios.get(`${backEndPoint}/${id}`);
            setVideoDetails(response.data);
            setVotes(response.data.votes)
            // console.log("votes",response.data.votes);
        }catch(err){
            enqueueSnackbar("Video Not Found", { variant: 'error',autoHideDuration: 3000 })
        }
        
    }

    const getDetails = async () =>{
        try{
            let videoDetails = await axios.get(backEndPoint);
            
            setVideoList(videoDetails.data.videos);
        }catch(err){
            enqueueSnackbar(err.message, { variant: 'error',autoHideDuration: 3000 });
        }  
    }


    const handleCardClick = async (id) =>{
        try{
            const response = await axios.get(`${backEndPoint}/${id}`);
            history.push(`/videos/${id}`, {from:"Videos"});
        }catch(err){
            enqueueSnackbar("Video Not Found", { variant: 'error',autoHideDuration: 3000 })
        }
    }

    const voteChange = async (id, reqObj) =>{
        let response = await axios.patch(`${backEndPoint}/${id}/votes`, reqObj, {headers:{
            "Content-Type":"application/json",
        }})
        if(response.status===204){
            getVideoLink(id);
        }
    }
    const handleVoteClick = (id, vote, change) =>{
        let reqObj ={
            vote,
            change
        }
        voteChange(id,reqObj);
    }
    const viewCount = async (id)=>{
        let response = await axios.patch(`${backEndPoint}/${id}/views`)
    }
    
    useEffect(()=>{
        getVideoLink(params.id);
        viewCount(params.id)
        getDetails();
    },[params]);

    return(
        <Box sx={{backgroundColor: "primary.main"}} className='main-container'>
            <Header />
            <Box className="grid-container" sx = {{backgroundColor:"secondary.main"}}>
            <iframe className = "video-player" title={videoDetails.title} src= {"//www."+videoDetails.videoLink} frameborder="0" allowfullscreen></iframe>
            <Box className="action-area">
                <Box className="text-area">
                    <Typography variant="h5">{videoDetails.title}</Typography><br/>
                    <Typography>{videoDetails.contentRating}&nbsp;&nbsp;{videoDetails.releaseDate}</Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="down vote" size="large" className="icon-button" 
                    onClick = {()=>handleVoteClick(videoDetails["_id"],"upVote","increase")}
                    sx={{color:"#fff"}}
                    >
                        <ThumbUpIcon />
                        <Typography>&nbsp;{votes.upVotes}</Typography>
                    </IconButton>
                    <IconButton aria-label="down vote" size="large" className="icon-button"
                    onClick = {()=>handleVoteClick(videoDetails["_id"],"downVote","increase")} 
                    sx={{color:"#fff"}}
                    >
                        <ThumbDownIcon />
                        <Typography>&nbsp;{votes.downVotes}</Typography>
                    </IconButton>
                </Stack>
            </Box>
            </Box>
            <Box className='grid-container' sx = {{backgroundColor:"secondary.main"}}>
                <Grid container spacing={1}>
                {
                    videoList.map((video)=>{
                        return (
                            <Grid item xs={6} md = {3} key = {video.id} className = "video-grid" onClick = {(e)=>{handleCardClick(video["_id"])}}>
                                <CardDisplay video = {video} />
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Box>
        </Box>
    )
}
export default Videos;