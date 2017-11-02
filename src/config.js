const config = {
    numberOfLevels: 2,
    numberOfQuestions: 5,
    complexity: {
    	1: {
    		operators: ['+', '-'],
    		maxNumber: 9
    	},
    	2: {
    		operators: ['+', '-'],
    		maxNumber: 20
    	},
    	3: {
    		operators: ['+', '-', 'x'],
    		maxNumber: 30
    	}
    }    
};

export default config;