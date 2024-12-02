import './App.css';
import {Container, Typography} from '@mui/material';
import BackgroundImage from '../src/assets/images/flights_nc_4.svg';
import {FlexBox} from './components/atoms/FlexBox';
import SearchSection from './components/molecules/SearchSection';

function App() {
  return (
    <Container>
      <FlexBox
        sx={{
          justifyContent: 'center',
          margin: 0,
          padding: 0,
          width: '100%',
          height: '300px',
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography sx={{mt: 30}} variant='h2'>
          Flights
        </Typography>
      </FlexBox>
      <FlexBox sx={{justifyContent: 'center', mt: 5}}>
        <SearchSection />
      </FlexBox>
    </Container>
  );
}

export default App;
