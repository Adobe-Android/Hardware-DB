const express = require('express');
const pcpartpicker = require('./pcpartpicker');
const app = express()
const port = process.env.PORT || 8000;
app.set('port', port)
const request = require('request');

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ohdb',
  password: 'postgrespass',
  port: 5432,
});
client.connect();

function createProcessorTable() {
  console.log("It's working!");
  client.query('create table if not exists processor(id SERIAL PRIMARY key, name text, price float, clock_speed float, tdp int, cores text);', (err, res) => {
    console.log(err, res);
  })
};
createProcessorTable();

let getCPUs = new Promise((resolve, reject) => {
    pcpartpicker.getCPUs('', function (CPUs) {
      // console.log(CPUs); // prints all CPUs
      // console.log(CPUs[0].name); // prints name of first listed CPU
      // console.log(CPUs[0].price); // prints price of first listed CPU
      // console.log(CPUs[0].speed); // prints speed of first listed CPU
      // console.log(CPUs[0].tdp); // prints TDP of first listed CPU
      // console.log(CPUs[0].cores); // prints cores of first listed CPU
      resolve(CPUs);
    })
})
const text = "INSERT INTO processor(name) VALUES ($1) RETURNING *"
getCPUs.then((CPUs) => {
  for (let i = 0; i < CPUs.length; i++) {
    const cpu = CPUs[i];
    const values = [];
    console.log(cpu.name);
    let name = cpu.name;
    values.push(name)
    client.query('BEGIN', (err) => {
      client.query(text, values, (err, res) => {
        console.log(err, res);
      });
      client.query('COMMIT', (err) => {
        if (err) {
          console.error('Error committing transaction', err.stack)
        }
      })
    })
  }
})
// client.end();

// MIDDLEWARE (transform stream)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.get('/getMobos/:sortOptions', (req, res) => {
//   let sortOptions = {socket: [req.params.sortOptions]};
//   pcpartpicker.getMotherboards(sortOptions, function(mobos) {
//     res.send(mobos);
    // console.log("mobos", mobos);
//   });
  // request.get(apiReq, (err, _, body) => {
  //   res.send(body)
  // });
// });

// app.get('/getCPUs/:sortOptions', (req, res) => {
//   let sortOptions = {socket: [req.params.sortOptions]};
//   pcpartpicker.getCPUs(sortOptions, function(cpus) {
//     res.send(cpus);
//     console.log("cpus", cpus);
//   });
//   // request.get(apiReq, (err, _, body) => {
//   //   res.send(body)
//   // });
// });

// app.get('/getMem/:sortOptions', (req, res) => {
//   // TODO Add Speed metric
//   let sortOptions = {
//     // maxRAM (ramSlotsxmaxRAM)
//     size: [req.params.sortOptions], 
//     speed: ["DDR4-2400", "DDR4-2666", "DDR4-3000", "DDR4-3200", "DDR4-3466", "DDR4-3600"]
//   };

//   pcpartpicker.getMemory(sortOptions, function(mem) {
//     res.send(mem);
//     // console.log("mem", mem);
//   });
//   // request.get(apiReq, (err, _, body) => {
//   //   res.send(body)
//   // });
// });

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)