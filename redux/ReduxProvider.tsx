/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
 
  return (
  <Provider store={store}>
      {children}
      <ToastContainer />
  </Provider>);
};

export default ReduxProvider;