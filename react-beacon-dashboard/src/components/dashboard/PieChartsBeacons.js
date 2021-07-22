import {  Pie } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';

const PieChartsBeacons = (props) => {
  const theme = useTheme();
  let [result, setResults] = useState([]);
  let [resultDept, setDeptResults] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3030/api/beacon/beaconLiveBeaconsPerRoom', {
      method: 'GET',
      mode: 'cors'
    }).then((response) => response.json())
      .then((responseJson) => {
        setResults(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
      fetch('http://localhost:3030/api/beacon/beaconLiveBeaconsPerDepartment', {
        method: 'GET',
        mode: 'cors'
      }).then((response) => response.json())
        .then((responseJson) => {
          setDeptResults(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);
  console.log(result)
  const data = {
    datasets: [
      {
        data: result.map(a => a.count),
        backgroundColor: [
          colors.green[800],
          colors.orange[800],
          colors.red[500]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: result.map(a => "Room " + a._id),
  };
  const dataForDept = {
    datasets: [
      {
        data: resultDept.map(a => a.count),
        backgroundColor: [
          colors.green[800],
          colors.orange[800],
          colors.red[500]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: resultDept.map(a =>  a._id),
  };

  const options = {
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };


  return (
    <Card {...props}>
      <CardHeader title="Live Analytics" />
      <Divider />
      <CardContent  >
        <Box sx={{
              height: 300,
              position: 'relative'
            }}>
          <Pie
            data={data}
            options={options}
          />
          <Typography>
            Beacons Per Room
         </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Box sx={{
              height: 300,
              position: 'relative'
            }}>
          <Pie
            data={dataForDept}
            options={options}/>
          <Typography >
            Beacons Per Department
         </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChartsBeacons;
