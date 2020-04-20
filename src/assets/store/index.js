/*
 * @Descripttion: 
 * @version: 
 * @Author: liujinyuan
 * @Date: 2019-08-15 16:41:27
 * @LastEditors: liujinyuan
 * @LastEditTime: 2019-08-15 17:23:39
 */

import {combineReducers, createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import photo from './photo';
const todoApp = combineReducers({
    photo
});

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(todoApp);

export default store;