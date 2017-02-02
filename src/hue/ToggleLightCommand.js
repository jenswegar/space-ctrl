
/**
 * Provides a command for toggling a connected Hue Light. 
 * 
 * This simply switches a light off, or back to it's previous state.
 */
class ToggleLightCommand {
	
	get lightId() { return this._lightId; }
	get api() { return this._api; }
	set api(api) { this._api = api; }
	get lightState() { return this._lightState; }
	set lightState(lightState) { this._lightState = lightState; }

	get state() { return this._state; }

    constructor(options){
		this._lightId = options.lightId;
		this._api = options.api;
		this._lightState = options.lightState;
    }
    
    execute(state){
		console.log('Toggling light: ', state);
		
		let hueState = this.lightState.create().on(state);
		this.api
		.setLightState(this.lightId, hueState)
		.then(this.onStateChangeComplete)
		.fail(this.onStateChangeError)
		.done();
	}
	
	onStateChangeComplete(result){
		console.log(JSON.stringify(result, null, 2));
	}
	
	onStateChangeError(err){
		console.log(JSON.stringify(err, null, 2));
	}
}

module.exports = ToggleLightCommand;
