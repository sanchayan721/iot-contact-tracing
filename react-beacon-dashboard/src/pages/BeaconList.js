import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BeaconListResults from 'src/components/livedata/BeaconListResults';

const BeaconList = () => { 

  return (
  <>
    <Helmet>
      <title>Live Beacons</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <BeaconListResults />
        </Box>
      </Container>
    </Box>
  </>
);
}

export default BeaconList;
