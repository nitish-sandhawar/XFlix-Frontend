import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Filters.css";
import SwapVertIcon from '@mui/icons-material/SwapVert';

const Filters = ({filters, setFilters, sortBy, setSortBy}) =>{
    let [updater, setUpdater] = useState(1);


    const rating = ['Any age group','7+','12+','16+','18+'];
    const genre = ['All Genre','Education','Sport','Comedy','Lifestyle'];

    const setCustomUI = ()=>{
        let genrePills = document.getElementsByClassName("genre-pills");
        let genrePillsList = Array.from(genrePills);
        genrePillsList.forEach((child)=>{
            if(filters.genre.includes(child.innerText)){
                child.classList.add("selected-pill")
            }else{
                child.classList.remove("selected-pill");
            }
        })

        let ratingPills = document.getElementsByClassName("rating-pills");
        let ratingPillsList = Array.from(ratingPills);
        ratingPillsList.forEach((child)=>{
            if(filters.rating===child.innerText){
                child.classList.add("selected-pill")
            }else{
                child.classList.remove("selected-pill");
            }
        })
    }

    const handleGenreClick = (event)=>{
        let incomingfilter = event.target.textContent;
        if(incomingfilter!=="All Genre"){
            if(filters.genre[0]==="All Genre"){
                filters.genre = [];
                // localFilters.genre = [];
            }
            if(!filters.genre.includes(incomingfilter)){
                setFilters({
                    ...filters,
                    genre:[...filters.genre,incomingfilter]
                });
                // setLocalFilters({
                //     ...localFilters,
                //     genre:[...localFilters.genre,incomingfilter]
                // });
                setUpdater(updater+=1);
            }
            
        }else{
            setFilters({
                ...filters,
                genre:["All Genre"]
            });
            // setLocalFilters({
            //     ...localFilters,
            //     genre:["All Genre"]
            // });
            setUpdater(updater+=1);
            
        }
        
        
    }
    const handleRatingClick = (event)=>{
        setFilters({...filters,rating:event.target.textContent});
        // setLocalFilters({...localFilters,rating:event.target.textContent});
        setUpdater(updater+=1);
    }

    useEffect(()=>{
        //to change the background color of selected pills
        setCustomUI();
    },[updater]);

    return(
        <Box className="filters-main-container">
            <Box className="filter-container">
                <Box className="genre-container" onClick={(e)=>handleGenreClick(e)}>
                {
                    genre.map((genres)=>{
                        return(
                            <Box component="span" 
                            className="genre-pills"
                            >{genres}</Box>
                        )
                    })
                }
                </Box>
                <Box className="rating-container" onClick={(e)=>handleRatingClick(e)}>
                {
                    rating.map((ratings)=>{
                        return(
                            <Box component="span" className="rating-pills">{ratings}</Box>
                        )
                    })
                }
                </Box>
            </Box>
            <Box className="sort-container">
            <FormControl sx={{ m: 1, minWidth: 200}} className="selected-pill sort-pill-container">
                <Select
                value={sortBy}
                onChange={(event)=>setSortBy(event.target.value)}
                displayEmpty
                className="sort-pill-select"
                >
                <MenuItem value='' className="sort-pill"><SwapVertIcon className = "swap-icon" />Sort By:</MenuItem>
                <MenuItem value='releaseDate' className="sort-pill"><SwapVertIcon className = "swap-icon" />Sort By: Release Date</MenuItem>
                <MenuItem value='viewCount' className="sort-pill"><SwapVertIcon className = "swap-icon" />Sort By: View Count</MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
            </Box>
        </Box>
    )
}

export default Filters;