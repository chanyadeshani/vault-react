import C from './constants';

export const addToken = (token) => ({
    type: C.ADD_TOKEN,
    token
});

export const removeToken = () => ({
    type: C.REMOVE_TOKEN
});