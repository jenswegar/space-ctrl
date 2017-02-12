// import environment variables from .env file
require('dotenv').config();
let bunyan = require('bunyan');
let logger = bunyan.createLogger({name: "Space-Ctrl"});
logger.info({environment: process.env.NODE_ENV}, 'environment config');

// TODO: process for detecting bridge before connecting buttons etc
let hue = require('node-hue-api');
let HueAPI = require('node-hue-api').HueApi;
let apiInstance = null;
let lightState = hue.lightState;

let displayBridges = function(bridge){
	console.log('Hue bridge found', JSON.stringify(bridge));
	
	apiInstance = new HueAPI(bridge[0].ipaddress, process.env.HUE_USER);
	apiInstance.config().then(displayConfig).done();
}

let displayConfig = function(config){
	console.log(JSON.stringify(config, null, 2));
	if(!config.zigbeechannel){
		// not valid user, create one
		apiInstance
			.registerUser('10.0.1.50', 'Space-Ctrl user')
			.then(displayUserResult)
			.fail(displayError)
			.done();
	} else {
		console.log('Hue connection established, can pass connection data to Commands');
		apiInstance.lights().then(displayResult).done();
		toggleLightCommand.api = apiInstance;
	}
}

let displayResult = function(data){
	console.log(JSON.stringify(data));
}

let displayUserResult = function(result){
	console.log('created user:', JSON.stringify(result));
}

let displayError = function(err){
	console.log(err);
}


hue.nupnpSearch().then(displayBridges).done();

if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
    // for development, fake the file system
    let mockFs = require('mock-fs');
    
    mockFs({
        '/proc/cpuinfo' : ''    // need output from rpi board to put here
    });
}

let TouchButton = require("./src/io/TouchButton");
let ToggleSceneCommand = require("./src/hue/ToggleSceneCommand");
let ToggleLightCommand = require("./src/hue/ToggleLightCommand");

let toggleSceneCommand = new ToggleSceneCommand();
let toggleLightCommand = new ToggleLightCommand({
	api: apiInstance,
	lightState: hue.lightState,
	lightId: 6
});

let touchBtn = new TouchButton({
    pin: 11,
    command: toggleLightCommand
});



if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
    // TODO: remove for real test
    mockFs.restore();
}
