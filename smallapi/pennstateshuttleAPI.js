const express = require("express");
const axios = require("axios");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", function (req, res) {
  res.send("PennState Mini Shuttle API");
});

app.get("/shuttlevechicles", function (req, res) {
  axios
    .get(
      "https://pennstate.transloc.com/Services/JSONPRelay.svc/GetMapVehiclePoints?ApiKey=8882812681"
    )
    .then((res1) => {
      console.log(res1);
      res.send(res1.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error. Is the Transloc API down??");
    });
});

app.get("/alerts", function (req, res) {
    axios
      .get(
        "https://pennstate.transloc.com/Services/JSONPRelay.svc/GetTwitterJSON?ApiKey=8882812681"
      )
      .then((res1) => {
        console.log(res1);
        res.send(res1.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error. Is the Transloc API down??");
      });
});

app.get("/shuttlecapacity", function (req, res) {
    axios
      .get(
        "https://pennstate.transloc.com/Services/JSONPRelay.svc/GetVehicleCapacities?ApiKey=8882812681"
      )
      .then((res1) => {
        console.log(res1);
        res.send(res1.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error. Is the Transloc API down??");
      });
});

app.get("/dev/getallstopid", function (req, res) {
    axios
      .get(
        "https://pennstate.transloc.com/Services/JSONPRelay.svc/GetStops?ApiKey=8882812681"
      )
      .then((res1) => {
        console.log(res1);
        res.send(res1.data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error. Is the Transloc API down??");
      });
});

app.get("/getnextstop", function (req, res) {
    const vehicleID = req.query.vehicleID; // Get the vehicleID from the query parameter
  
    if (!vehicleID) {
      return res.status(400).send("Error: vehicleID parameter is required");
    }
  
    axios
      .get(`https://pennstate.transloc.com/Services/JSONPRelay.svc/GetVehicleRouteStopEstimates?quantity=1&vehicleIdStrings=${vehicleID}`)
      .then((res1) => {
        console.log(res1.data);
        res.send(res1.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error. Is the Transloc API down?");
      });
  });
  



app.listen(port, () => console.log(`PennState Shuttle API is listening on port ${port}.`));
