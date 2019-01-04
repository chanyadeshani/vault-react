import {applyMiddleware, createStore} from "redux";
import {token} from './reducers';
import stateData from "../data/initialState";

const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result;
};

const storeFactory = () =>
    applyMiddleware(saver)(createStore)(
        token,
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            stateData
    );

export default storeFactory;