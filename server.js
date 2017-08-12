'use strict'


const express = require('express');
const pcpartpicker = require('./pcpartpicker');
const app = express()
const port = process.env.PORT || 6060;
app.set('port', port)
const request = require('request');

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/getMobos/:sortOptions', (req, res) => {
  let sortOptions = {socket: [req.params.sortOptions]};
  pcpartpicker.getMotherboards(sortOptions, function(mobos) {
    res.send(mobos);
    // console.log("mobos", mobos);
  });
  // request.get(apiReq, (err, _, body) => {
  //   res.send(body)
  // });
});

app.get('/getCPUs/:sortOptions', (req, res) => {
  let sortOptions = {socket: [req.params.sortOptions]};
  pcpartpicker.getCPUs(sortOptions, function(cpus) {
    res.send(cpus);
    // console.log("cpus", cpus);
  });
  // request.get(apiReq, (err, _, body) => {
  //   res.send(body)
  // });
});

app.get('/getMem/:sortOptions', (req, res) => {
  // TODO Add Speed metric
  let sortOptions = {
    size: [req.params.sortOptions], 
    speed: [req.params.sortOptions]
  };

  pcpartpicker.getMemory(sortOptions, function(mem) {
    res.send(mem);
    // console.log("mem", mem);
  });
  // request.get(apiReq, (err, _, body) => {
  //   res.send(body)
  // });
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)