# Hardware-DB
An open and extensive computer hardware API (More coming soon).

## Future Plans
This is the future of my old MemDB-server project. I'm going to use many of the same resources that I used to build my own hardware database and expand the data from there to include more advanced specifications on all computer parts. 

To give you a small sample, these are the specs I'd like to have just for the CPUs.

- Name
- Price
- Architecture
- Socket
- Base Clock
- Boost Clock
- Cores
- Threads
- TDP
- L3 Cache
- iGPU (Bool value)
- Thermal Solution / CPU cooler included (Bool value)
- Unlocked (Bool value)
- Manufacturing node (eg. 14nm, 22nm, etc.)
- Number of Memory Channels
- Supported JEDEC Memory Clock
- Die Configuration (eg. 4+0, 4+4, 2+2, etc.)
- Number of PCIe Lanes

## Use
Coming soon.

## Installation

Clone this repository to your local machine

Install necessary dependencies:

```
npm install
```

Start the server:

```
npm start
```

## Technologies

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/) 
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Request.js](https://github.com/request/request)
* [node-pg](https://github.com/brianc/node-postgres)

## License

MIT © [David Brown](https://github.com/Adobe-Android)
