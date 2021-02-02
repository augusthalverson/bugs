import {Action} from '../types';
import * as actions from './actionTypes';

export const addBug = (desc: string, id: string): Action => {
  return {
    type: actions.ADD_BUG,
    payload: {
      desc,
      id,
    },
  };
};

export const resolveBug = (id: string): Action => {
  return {
    type: actions.RESOLVE_BUG,
    payload: {
      id,
    },
  };
};

export const unresolveBug = (id: string): Action => {
  return {
    type: actions.UNRESOLVE_BUG,
    payload: {
      id,
    },
  };
};

export const deleteBug = (id: string): Action => {
  return {
    type: actions.DELETE_BUG,
    payload: {
      id,
    },
  };
};
