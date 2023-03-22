import {
  RegisterFormI,
  UpdateFormActionI,
  ActionTypes,
  ActionI,
} from '../actions';
import { Reducer } from 'react';

const initialState: RegisterFormI = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  username: '',
};

export const registerFormReducer: Reducer<RegisterFormI, UpdateFormActionI> = (
  state: RegisterFormI = initialState,
  action: ActionI
) => {
  switch (action.type) {
    case ActionTypes.updateRegisterForm:
      return action.payload;
    default:
      return state;
  }
};
