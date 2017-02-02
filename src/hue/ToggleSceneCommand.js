
/**
 * Provides a command for toggling a Hue Scene. 
 * 
 * 
 */
class ToggleSceneCommand {
	

    constructor(options){
    }
    
    execute(state){
		console.log('Toggling scene: ', state);
	}
}

module.exports = ToggleSceneCommand;
