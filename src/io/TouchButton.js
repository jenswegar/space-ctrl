let rpio = require("rpio");

/**
 * Provides an interface for interacting with a hardware button 
 */
class TouchButton {
	
	get pinNr() { return this._pinNr; }
	get state() { return this._state; }
	get command() { return this._command; }
	
    constructor(options){
        console.log(options);
        
        this._pinNr = options.pin;
        this._command = options.command;
        this._state = false;
        
        console.log(this.pinNr);
        // init the GPIO 
        rpio.open(this.pinNr, rpio.INPUT, rpio.PULL_UP);
        rpio.poll(this.pinNr, this.pollBtn.bind(this), rpio.POLL_HIGH);
    }
    
    pollBtn(pin){
		this._state = !this._state;
		this.command.execute(this.state);
	}
}

module.exports = TouchButton;
