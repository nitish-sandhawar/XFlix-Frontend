import {backEndPoint} from '../App';
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardDisplay from './CardDisplay';
import {Grid, Box} from '@mui/material';
import Header from './Header';
import "./HomePage.css";
import Filters from './Filters';
import { useSnackbar } from "notistack";
import { useHistory } from 'react-router-dom';


const HomePage = ()=>{
    const { enqueueSnackbar } = useSnackbar();
    const [videoList, setVideoList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [debounceTimeout, setDebounceTimeout] = useState(0);
    const [filters, setFilters] = useState({
        genre:['All Genre'],
        rating:"Any age group",
    })
    const [sortBy, setSortBy] = useState("");
    const history = useHistory();

//*************NO NEED for it. SINCE PerfomrSearch is already doing this******************** */
    // const getDetails = async () =>{
    //     // let videoDetails;
    //     try{
    //         let videoDetails = await axios.get(backEndPoint);
            
    //         setVideoList(videoDetails.data.videos);

    //         // return videoDetails.data.videos;      //may need later
    //     }catch(error){
    //         enqueueSnackbar("something went wrong", { variant: 'error',autoHideDuration: 3000 });
    //     }  
    // }

    // useEffect(()=>{
    //     getDetails();
    // },[]);

//********************************************************************************************** */

    const performSearch = async (text,filters) => {
        // setisLoading(true)                       //for showing circular progress bar
        try {
            if(text && filters.genre[0] ==="All Genre" && filters.rating==="Any age group"){
                const response = await axios.get(`${backEndPoint}?title=${text}`);
                setVideoList(response.data.videos);
            } 
            else if(!text && filters.genre[0]!=="All Genre" && filters.rating==="Any age group"){
                let genreString =filters.genre[0];
                if(filters.genre.length>0){
                    for(let i = 1; i<filters.genre.length; i++){
                        genreString = genreString+','+filters.genre[i];
                    }
                }
                
                const response = await axios.get(`${backEndPoint}?genres=${genreString}`);
                setVideoList(response.data.videos);
            }
            else if(!text && filters.genre[0]==="All Genre" && filters.rating!=="Any age group"){
  
                const response = await axios.get(`${backEndPoint}?contentRating=${encodeURIComponent(filters.rating)}`);
                // console.log(encodeURIComponent(`${backEndPoint}?contentRating=${filters.rating}`))
                setVideoList(response.data.videos);
            }
            else if(!text && filters.genre[0]!=="All Genre" && filters.rating!=="Any age group"){
                let genreString =filters.genre[0];
                if(filters.genre.length>0){
                    for(let i = 1; i<filters.genre.length; i++){
                        genreString = genreString+','+filters.genre[i];
                    }
                }
                
                const response = await axios.get(`${backEndPoint}?genres=${genreString}&contentRating=${encodeURIComponent(filters.rating)}`);
                setVideoList(response.data.videos);
            }
            else if(text && filters.genre[0]!=="All Genre" && filters.rating!=="Any age group"){
                let genreString =filters.genre[0];
                if(filters.genre.length>0){
                    for(let i = 1; i<filters.genre.length; i++){
                        genreString = genreString+','+filters.genre[i];
                    }
                }
                
                const response = await axios.get(`${backEndPoint}?title=${text}&genres=${genreString}&contentRating=${encodeURIComponent(filters.rating)}`);
                setVideoList(response.data.videos);
            }
            else if(!text && filters.genre[0]==="All Genre" && filters.rating==="Any age group"){
                const response = await axios.get(backEndPoint);
                setVideoList(response.data.videos);
            }
        } catch (err) {
            enqueueSnackbar("something went wrong", { variant: 'error',autoHideDuration: 3000 })
        }
        // setisLoading(false)                    //deactivating circular progress bar
    };

    useEffect(()=>{
        performSearch("",filters);
    },[filters]);

    const debounceSearch = (event, debounceTimeoutLocal) => {
        setSearchInput(event.target.value);
        if (debounceTimeout !== 0) {
          clearTimeout(debounceTimeout);
        }
        // call
        const newTimeout = setTimeout(() => performSearch(event.target.value, filters), debounceTimeoutLocal);
        setDebounceTimeout(newTimeout);
    };

      const performSort = async (sortBy) =>{
        if(sortBy){
            try{
                const response = await axios.get(`${backEndPoint}?sortBy=${sortBy}`)
                
                setVideoList(response.data.videos);
    
                // return videoDetails.data.videos;      //may need later
            }catch(error){
                enqueueSnackbar("something went wrong", { variant: 'error',autoHideDuration: 3000 });
            } 
        }
    }
    useEffect(()=>{
        performSort(sortBy)
    },[sortBy]);

    const handleCardClick = async (id) =>{
        try{
            const response = await axios.get(`${backEndPoint}/${id}`);
            history.push(`/videos/${id}`, {from:"HomePage"});
        }catch(err){
            enqueueSnackbar("Video Not Found", { variant: 'error',autoHideDuration: 3000 })
        } 
    }

    return(
        <Box sx={{backgroundColor: "primary.main"}} className='main-container'>
            <Header searchBar uploadButton debounceSearch = {debounceSearch} value = {searchInput} />
            <Filters 
            filters = {filters} 
            setFilters = {setFilters}
            sortBy = {sortBy}
            setSortBy = {setSortBy} />
            <Box className='grid-container' sx = {{backgroundColor:"secondary.main"}}>
                <Grid container spacing={1}>
                {
                    videoList.map((video)=>{
                        return (
                            <Grid item xs={6} md = {3} key = {video.id} className = "video-grid" onClick = {()=>{handleCardClick(video["_id"])}}>
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

export default HomePage;