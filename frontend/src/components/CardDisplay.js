import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CardDisplay = ({video}) =>{
    let date = new Date(video.releaseDate)
    let year = date.getFullYear();
    let month = date.getMonth();
    let currDate = new Date();
    let currYear = currDate.getFullYear();
    let currMonth = currDate.getMonth;
    let releaseYear, releaseMonth;
    (year!==currYear)? releaseYear = currYear-year: releaseMonth = currMonth-month;
    return (
        <Card sx={{ maxWidth: 345, backgroundColor:"secondary.main", color:"secondary.contrastText" }} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={video.previewImage}
              alt={video.title}
            />
            <CardContent className="card-content">
              <Typography gutterBottom  variant="h6" component="div">
                {video.title}
              </Typography>
              <Typography variant="body2">
                {`${(releaseYear)?releaseYear+' year ago':releaseMonth+ ' months ago'}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}

export default CardDisplay;