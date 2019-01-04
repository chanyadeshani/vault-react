import C from '../constants';

export const token = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_TOKEN:
            return {
                token: action.token
            };
        case C.REMOVE_TOKEN:
            return {
                token: ''
            };
        default :
            return state;
    }
};