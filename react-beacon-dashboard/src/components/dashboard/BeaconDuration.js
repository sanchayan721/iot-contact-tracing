import { Bar } from 'react-chartjs-2';
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  useTheme,
  colors,
  Typography
} from '@material-ui/core';

const Sales = (props) => {
  const theme = useTheme();
  let [result, setResults] = useState();
  let [matricula, setMatricula] = useState("");

  if (matricula.length === 7) {
    fetch('http://localhost:3030/api/beacon/timeRecordsPerBeacon?matricula=' + matricula, {
      method: 'GET',
      mode: 'cors'
    }).then((response) => response.json())
      .then((responseJson) => {
        setResults(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  let time_records = []
  let data_time = []
  if (result) {
    time_records = result.time_record
    time_records.forEach(element => {
      data_time.push((Math.abs((new Date(element.enter_time) - new Date(element.exit_time))) / (1000*60*60)).toFixed(2));
    });
  }

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: data_time,
        label: 'Hours spent'
      }
    ],
    labels: time_records.map(a => a.room_no + " " +new Date(a.exit_time).getUTCDate()+"/"+
    new Date(a.exit_time).getUTCMonth()+"/"+ new Date(a.exit_time).getUTCFullYear())
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
      <CardHeader title="Historical Data Analytics" />
      <Divider />
      <TextField sx={{ alignSelf: 'center' }}
        id="first-name"
        label="Matricula"
        value={matricula}
        onChange={e => setMatricula(e.target.value)}
      />
      <Divider />
      <CardContent sx={{ alignSelf: 'center' }}>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Box
        sx={{
          height: 400,
          position: 'relative',
          justifyItems: 'center'
        }}
      > <Typography>Matricula : {result?result._id:""}</Typography>
         <Typography>Student Name : {result?result.student_name:""}</Typography>
         <Typography>Department : {result?result.department:""}</Typography>
      </Box>
    </Card>
  );
};

export default Sales;
