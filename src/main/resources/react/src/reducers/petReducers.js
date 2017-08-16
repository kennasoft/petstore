import actions from '../actions/constants';

const initialState = {
    currentPet: null,
    tempPet: null,
    error: null,
    categories: [],
    requestStatus: {}
}

export default (state = initialState, action) => {
    let reqStatus = {};
    switch (action.type){
        case `${actions.UPDATE_PET}_${actions.PENDING}`:
        case `${actions.CREATE_PET}_${actions.PENDING}`:{
            reqStatus[actions.CREATE_PET] = actions.PENDING;
            return {
                ...state,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            };
        }
        case `${actions.UPDATE_PET}_${actions.FULFILLED}`:
        case `${actions.CREATE_PET}_${actions.FULFILLED}`:{   
            reqStatus[actions.CREATE_PET] = actions.FULFILLED;         
            return {
                ...state,
                currentPet: action.payload.data,
                tempPet: {},
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            };
        }
        case `${actions.UPDATE_PET}_${actions.REJECTED}`:
        case `${actions.CREATE_PET}_${actions.REJECTED}`:{  
            reqStatus[actions.CREATE_PET] = actions.REJECTED;          
            return {
                ...state,
                error: action.payload,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            };
        }
        case `${actions.FIND_PET}_${actions.PENDING}`: {
            reqStatus[actions.FIND_PET] = actions.PENDING;         
            return {
                ...state,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case `${actions.FIND_PET}_${actions.FULFILLED}`: {
            reqStatus[actions.FIND_PET] = actions.FULFILLED;
            return {
                ...state,
                currentPet: action.payload.data,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case `${actions.FIND_PET}_${actions.REJECTED}`: {
            reqStatus[actions.FIND_PET] = actions.REJECTED;
            return {
                ...state,
                currentPet: null,
                error: action.payload,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case `${actions.DELETE_PET}_${actions.PENDING}`: {
            reqStatus[actions.DELETE_PET] = actions.PENDING;
            return {
                ...state,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            };
        }
        case `${actions.FETCH_CATEGORIES}_${actions.PENDING}`: {
            reqStatus[actions.FETCH_CATEGORIES] = actions.PENDING;
            return {
                ...state,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case `${actions.FETCH_CATEGORIES}_${actions.FULFILLED}`: {
            reqStatus[actions.FETCH_CATEGORIES] = actions.FULFILLED;
            return {
                ...state,
                categories: action.payload.data || [],
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case `${actions.FETCH_CATEGORIES}_${actions.REJECTED}`: {
            reqStatus[actions.FETCH_CATEGORIES] = actions.REJECTED;
            return {
                ...state,
                error: action.payload,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        case actions.EDIT_PET: {
            reqStatus[actions.EDIT_PET] = actions.FULFILLED;
            return {
                ...state,
                tempPet: action.payload,
                requestStatus: Object.assign({}, state.requestStatus, reqStatus)
            }
        }
        default:
            return state;
    }
}