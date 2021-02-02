import { Action } from '../reducers/bugs';
import * as actions from './actionTypes';

export const addBug = (desc: string): Action => {
    return {
        type: actions.ADD_BUG,
        payload: {
            desc
        }
    }
}

export const resolveBug = (id: number): Action => {
    return {
        type: actions.RESOLVE_BUG,
        payload: {
            id
        }
    }
}

export const unresolveBug = (id: number): Action => {
    return {
        type: actions.UNRESOLVE_BUG,
        payload: {
            id
        }
    }
}

export const deleteBug = (id: number): Action => {
    return {
        type: actions.DELETE_BUG,
        payload: {
            id
        }
    }
}