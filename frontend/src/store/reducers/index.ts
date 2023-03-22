import { combineReducers } from 'redux';
import { registerFormReducer } from './register';
import { RegisterFormI } from '../actions';

export interface StoreStateI {
  registerForm: RegisterFormI;
}

export const reducers = combineReducers<StoreStateI>({
  // @ts-ignore
  registerForm: registerFormReducer,
});
