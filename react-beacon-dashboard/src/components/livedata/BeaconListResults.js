import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Divider
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const settings = {
  port: 8080,
  clientId: 'dribris_dashboard'
};

var client = mqtt.connect('mqtt://localhost', settings);
client.on('connect', function () {
  console.log('connected');
  client.subscribe('/3/310');
});

const BeaconListResults = () => {
  let [beacons, setBeacons] = useState([]);
  let [message, setMessage] = useState("");
  useEffect(() => {
    console.log('Run useEffect');
    try {
      client.on('message', function (topic, message) {
        try{
          if (message.toString().includes("overcrowded")) {
            setMessage(message.toString());
          }
        if (Array.isArray(JSON.parse(message)) && JSON.parse(message).length > 0) {
          setBeacons(JSON.parse(message));
        }else{
          setBeacons([]);
        }
      }catch(err){

      }
      });
    } catch (err) {
  
    }
  }, []);
  return (
    <Card>
      <PerfectScrollbar>
      <Typography sx={{fontSize : '30px', textAlign:'center', color: 'red'}}>{message}</Typography>
      <Divider/>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Matricula
                </TableCell>
                <TableCell>
                  Student's Name
                </TableCell>
                <TableCell>
                  Department
                </TableCell>
                <TableCell>
                  Beacon UUID
                </TableCell>
                <TableCell>
                  Floor Number
                </TableCell>
                <TableCell>
                  Room Number
                </TableCell>
                <TableCell>
                  Entry
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {beacons.map(beacon => (
                <TableRow>
                  <TableCell> {beacon._id}
                  </TableCell>
                  <TableCell>
                    {beacon.student_name}
                  </TableCell>
                  <TableCell>
                    {beacon.department}
                  </TableCell>
                  <TableCell>
                    {beacon.beacon_uid}
                  </TableCell>
                  <TableCell>
                    {beacon.floor_no}
                  </TableCell>
                  <TableCell>
                    {beacon.room_no}
                  </TableCell>
                  <TableCell>
                    {beacon.enter_time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default BeaconListResults;
