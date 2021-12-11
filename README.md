# Contact Tracing System Using Node.js and Beacon Low Power Devices

#### Goals
<ol>
  <li>To calculate the number of students present in a room in a given time period.</li>
  <li>Show Historical Data of a given Matricula number.</li>
</ol>

#### Assumptions
<ol>
  <li>Students are registered with the system and are given a beacon with static UUID.</li>
</ol>

## Packages In Use

#### Scanner
<ol>
  <li>“node-beacon-scanner” and “noble” packages for scanning Beacon Devices.</li>
  <li>MQTT Client.</li>
</ol>

#### Server
<ol>
  <li>“Express” web App Framework for building HTTP REST API.</li>
  <li>“Mosca” Node.js MQTT Broker.</li>
  <li>“Vonage” for smsservice.</li>
</ol>

#### Dashboard
<ol>
  <li>React.js</li>
  <li>MQTT Client for receiving published data.</li>
  <li>React-chartjs-2 for analytics.</li>
</ol>

#### Simulator
<ol>
  <li>“bleno” package for simulating iBeacons.</li>
</ol>

## Architecture
![Architecture of the Application](/assets/Architecture.png)

## Beacon Scanner
<ol>
  <li>Beacon scanner is the device which collects the beacon UUIDs using noble library.</li>
  <li>It also sends the data to server using MQTT.</li>
  <li>It stores historical data of beacons along with their location of in the Mongo DB.</li>
</ol>

### Class Diagram of the Beacon Scanner
![Beacon Scanner](/assets/class_diagram_beacon_scanner.png)

## MQTT Server
<ol>
  <li>Receives signals from beacon scanners.</li>
  <li>Sends alerts when the rooms are overcrowded.</li>
  <li>It stores historical data of beacons along with their location of in the Mongo DB.</li>
  <li>Provides REST services to the client dashboard such as:
    <ul>
      <li>Number of active beacons per room.</li>
      <li>Number of active beacons per Department.</li>
      <li>Gross time spent in each room by a beacon associated to a matricula number.</li>
    </ul>
  </li>
</ol>

### Class Diagram of the MQTT Server
![MQTT Server](/assets/class_diagram_MQTT_server.png)

## Client Dashboard
The client dashboard fetches the data from the server with MQTT and HTTP protocols. It displays the information about the beacons
<ol>
  <li>In a detailed list</li>
  <li>As analytical graphs</li>
</ol>

### Class Diagram of the Client Dashboard
![MQTT Server](/assets/class_diagram_dashboard.png)

## Beacon Simulator
<ol>
  <li>Simulation of the BLE device carried by the students.</li>
  <li>Emits a beacon with a static UUID provided by the admin.</li>
  <li>Implemented using Blenopackage.</li>
</ol>

## Video Presentation

<a href="https://www.youtube.com/watch?v=FnoAfeVcyWs" title="Link to YouTube Video">![Load Application](/assets/Thumbnail.png "Click to Play the Video on YouTube")</a>
