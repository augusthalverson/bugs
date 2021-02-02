import * as actions from '../actions/actionTypes';
import {Action, Bug} from '../types';

let nextId = 0;

const bugsReducer = (state: Bug[] = [], action: Action) => {
  switch (action.type) {
    case actions.ADD_BUG:
      return [
        ...state,
        {
          id: nextId++,
          desc: action.payload.desc,
          isResolved: false,
        },
      ];

    case actions.RESOLVE_BUG:
      return state.map((bug: Bug) => {
        if (bug.id === action.payload.id) {
          return {...bug, isResolved: true};
        }
        return bug;
      });

    case actions.UNRESOLVE_BUG:
      return state.map((bug: Bug) => {
        if (bug.id === action.payload.id) {
          return {...bug, isResolved: false};
        }
        return bug;
      });

    case actions.DELETE_BUG:
      return state.filter((bug: Bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
};

export default bugsReducer;
