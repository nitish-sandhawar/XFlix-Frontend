import React, { useState } from 'react';
import {Select, Button, InputLabel, TextField,Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormHelperText} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {backEndPoint} from "../App";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import "./VideoUpload.css";

const VideoUpload = ({open, handleClose}) =>{
  const [videoLink, setVideoLink] = useState("");
  const [thumbnailLink, setThumbnailLink] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [releaseDate, setReleaseDate] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  
  const months = ['Jan','Fab','March','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']

  const payload = ()=>{
    if(videoLink && thumbnailLink && title && genre && rating && releaseDate){
      let month = releaseDate.getMonth();
      for(let i = 0; i<months.length; i++){
        if(i===month){
          month = months[i];
          break;
        }
      }
      let date = releaseDate.getDate();
      let year = releaseDate.getFullYear();
      let release = date+" "+month+" "+year;
      return{
          "videoLink": videoLink,
          "title": title,
          "genre": genre,
          "contentRating": rating,
          "releaseDate": release,
        "previewImage":thumbnailLink
      }
    }else{
      enqueueSnackbar("Missing Field", { variant: 'error',autoHideDuration: 3000 })
    }
    
  }

  const handleUploadClick = async ()=>{
    let reqObj = payload();
    let response = await axios.post(backEndPoint, reqObj ,{headers:{
      "Content-Type":"application/json",
  }})
    handleClose();
  }

  return (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="outlined-basic-video-link"
                label="Video Link"
                type="text"
                fullWidth
                variant="outlined"
                helperText="This link will be used to derive the video"
                onChange = {(event)=>setVideoLink(event.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="outlined-basic-thumbnail"
                label="Thumbnail Image Link"
                type="text"
                fullWidth
                variant="outlined"
                helperText="This link will be used to preview the thumbnail image"
                onChange = {(event)=>setThumbnailLink(event.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="outlined-basic-title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                helperText="The title will be the representative text for video"
                onChange = {(event)=>setTitle(event.target.value)}
              />

              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="demo-simple-select-genre"
                value={genre}
                fullWidth
                label= "Genre"
                onChange = {(event)=>setGenre(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Sport">Sport</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
              </Select>
              <FormHelperText>Genre will help in categorizing your videos</FormHelperText>

              <InputLabel id="rating-label">Suitable age group for the clip</InputLabel>
              <Select
                labelId="rating-label"
                id="demo-simple-select-rating"
                value={rating}
                fullWidth
                label= "Suitable age group for the clip"
                onChange = {(event)=>setRating(event.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="7+">7+</MenuItem>
                <MenuItem value="12+">12+</MenuItem>
                <MenuItem value="16+">16+</MenuItem>
                <MenuItem value="18+">18+</MenuItem>
              </Select>
              <FormHelperText>This will be used to filter videos on age group suitability</FormHelperText>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Release date"
                  value={releaseDate}
                  onChange={(newValue) => {
                    setReleaseDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormHelperText>This will be used to sort videos</FormHelperText>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions sx={{justifyContent:"flex-start"}}>
              <Button onClick={handleUploadClick} sx={{backgroundColor:"#EE1520", color:"#fff"}}
              className = "upload">
                Upload Video
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default VideoUpload;