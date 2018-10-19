// users.js

// Actions
export const LOG_IN_USER = 'math-game-web/users/LOG_IN_USER';
export const LOG_OUT_USER = 'math-game-web/users/LOG_OUT_USER';

let initialState = {
  status: false,
  user: '',
};

// Reducers
export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        status: true,
        user: action.user,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        status: false,
        user: '',
      };
    default:
      return state;
  }
}

//Actions creators
export function logInUser(user) {
  return {
    type: LOG_IN_USER,
    status: true,
    user: user,
  };
}

export function logOutUser() {
  return {
    type: LOG_OUT_USER,
    status: false,
    user: '',
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
