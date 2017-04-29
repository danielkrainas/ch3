export const SET_ACTIVE_CONSOLE = 'SET_ACTIVE_CONSOLE';


export const setActiveConsole = c => { 
	return { 
		type: SET_ACTIVE_CONSOLE, 
		console: c, 
	};
};
