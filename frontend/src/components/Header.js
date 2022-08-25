import { Button, InputAdornment, Box, TextField,} from "@mui/material";
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import "./Header.css";
import Search from "@mui/icons-material/Search";
import { useState } from "react";
import { useHistory } from "react-router";
import VideoUpload from "./VideoUpload";

  

const Header = ({searchBar, uploadButton, debounceSearch, value})=>{
  const [open, setOpen] = useState(false);
  // const history = useHistory();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return(
        <Box className="header">
            {/* <Typography variant="h5" className="logo">
                XFlix
            </Typography> */}
            <img src = "xflixLogo.png" alt="XFlix" className="logo"/>
            {
              searchBar && 
              <TextField
              className="search-desktop"
              size="small"
              value={value}
              onChange={(e) => debounceSearch(e, 1000) }
              InputProps={{
              endAdornment: (
                <InputAdornment className="search-icon-box" position="end">
                  <Search className="search-icon" />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            name="search"
          />
            }
            {
              uploadButton &&
              <Button variant="contained" startIcon={<UploadOutlinedIcon />} className="upload-button"
              onClick = {()=>handleClickOpen()}>
                Upload
              </Button>
            }
            {
              open &&
              <VideoUpload open = {open} handleClose = {handleClose} />
            }
            
    </Box>
    )
}

export default Header;