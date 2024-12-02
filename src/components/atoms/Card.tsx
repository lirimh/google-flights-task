import * as React from 'react';
import {default as MuiCard} from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {FC} from 'react';
import {FlexBox} from './FlexBox';

interface CardProps {
  image?: string;
  title: string;
  date: string;
  price: string;
  time: string;
}

const Card: FC<CardProps> = ({image, date, price, time, title}) => {
  return (
    <MuiCard sx={{maxWidth: 345, boxShadow: 'none!important'}}>
      <CardActionArea>
        <CardMedia
          sx={{borderRadius: '10px'}}
          component='img'
          height='140'
          image={image}
          alt='image'
        />
        <CardContent>
          <FlexBox sx={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography
              gutterBottom
              variant='h6'
              fontSize='16px'
              component='div'
              fontWeight='bold'
            >
              {title}
            </Typography>
            <Typography
              fontSize='15px'
              fontWeight='bold'
              gutterBottom
              variant='h5'
              component='div'
            >
              {price}
            </Typography>
          </FlexBox>

          <Typography
            fontSize='14px'
            color='#70757a'
            gutterBottom
            variant='h5'
            component='div'
          >
            {date}
          </Typography>
          <Typography
            fontSize='14px'
            color='#70757a'
            gutterBottom
            variant='h5'
            component='div'
          >
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
