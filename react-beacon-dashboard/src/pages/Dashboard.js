import { Helmet } from 'react-helmet';
import {
  Box,
  Grid
} from '@material-ui/core';
import BeaconDuration from 'src/components/dashboard/BeaconDuration';
import PieChartsBeacons from 'src/components/dashboard/PieChartsBeacons';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Indoor Tracker</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%'
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      ><Grid
        item
        sx={{
          padding: '16px',
          display: 'inline-block',
          maxWidth: '50%',
          alignItems: 'start'
        }}  xs={6}>
          <PieChartsBeacons sx={{ direction: "row", justify: "flex-start" }} />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <BeaconDuration />
        </Grid>
      </Grid>
    </Box>
  </>
);

export default Dashboard;
