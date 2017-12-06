// users.js

// Actions
export const CURRENT_USER = 'math-game-web/users/CURRENT_USER';

// Reducers
export default function currentUser(state = '', action) {
  switch (action.type) {
    case CURRENT_USER:
      return action.name;
    default:
      return state;
  }
}

//Actions creators
export function setCurrentUser(name) {
  return {
    type: CURRENT_USER,
    name: name,
  };
}

/*users: [ 
  0: {
      name: Vasya,
      score: [['star', '80%'], ['circle', '60%']],
      complexity: 3
    },
  1: {
      name: Vasya,
      score: [['star', '80%'], ['circle', '60%']],
      complexity: 3
    }
]
 */
