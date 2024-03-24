import {
    createReducer,
  } from '@ngrx/store';
  
  export interface RootState {}
  
  export const initialState: RootState = {};
  
  export const rootReducer = createReducer(initialState);
    