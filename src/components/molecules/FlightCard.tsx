import {Card, CardContent, Typography, Box, CardMedia} from '@mui/material';
import {FlexBox} from '../atoms/FlexBox';
import {Carrier, Itinerary, Leg} from '../../type/Itenerary';

const FlightCard = ({itinerary}: {itinerary: Itinerary}) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        {itinerary.legs.map((leg: Leg, legIndex: number) => (
          <FlexBox
            justifyContent='space-between'
            flexDirection={{xs: 'column', sm: 'row'}}
            gap={2}
            key={legIndex}
            sx={{
              padding: 2,
              '@media (max-width: 600px)': {
                alignItems: 'flex-start',
              },
            }}
          >
            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
              {leg.carriers?.marketing?.map(
                (carrier: Carrier, carrierIndex: number) => (
                  <CardMedia
                    key={carrierIndex}
                    component='img'
                    image={carrier.logoUrl}
                    alt={`${carrier.name} logo`}
                    sx={{
                      width: {xs: '30px', sm: '40px'},
                      height: {xs: '30px', sm: '40px'},
                      objectFit: 'cover',
                    }}
                  />
                )
              )}
            </Box>

            <Box sx={{flex: 1}}>
              <Typography>
                <strong>Origin:</strong> {leg.origin?.name}
              </Typography>
              <Typography>
                <strong>Departure:</strong> {leg.departure}
              </Typography>
              <Typography>
                <strong>Carriers:</strong>{' '}
                {leg.carriers?.marketing
                  .map((carrier: Carrier) => carrier.name)
                  .join(', ')}
              </Typography>
            </Box>

            <Box sx={{flex: 1}}>
              <Typography>
                <strong>Destination:</strong> {leg.destination?.name}
              </Typography>
              <Typography>
                <strong>Arrival:</strong> {leg.arrival}
              </Typography>
            </Box>

            <Box sx={{flex: 1}}>
              <Typography>
                <strong>Duration:</strong> {leg.durationInMinutes} minutes
              </Typography>
              <Typography>
                <strong>Stops:</strong> {leg.stopCount}
              </Typography>
            </Box>

            <Box>
              <Typography variant='h6' color='secondary'>
                Price: {itinerary.price?.formatted}
              </Typography>
            </Box>
          </FlexBox>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlightCard;
