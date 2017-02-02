// import environment variables from .env file
require('dotenv').config();
let bunyan = require('bunyan');
let logger = bunyan.createLogger({name: "Space-Ctrl"});
logger.info({environment: process.env.NODE_ENV}, 'environment config');

if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
    // for development, fake the file system
    let mockFs = require('mock-fs');
    
    mockFs({
        '/proc/cpuinfo' : ''    // need output from rpi board to put here
    });
}



let TouchButton = require("./src/io/TouchButton");


let touchBtn = new TouchButton({
    "pin": 11
});

if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
    // TODO: remove for real test
    mockFs.restore();
}