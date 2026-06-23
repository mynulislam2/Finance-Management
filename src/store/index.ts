import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import budgetReducer from './budgetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    budgets: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;