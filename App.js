import React from 'react';
import Login  from './src/pages/login/index';
import AppProvider from './src/pages/hooks'


const App = () => {
  return (
  <AppProvider>
    <Login/>
  </AppProvider>
  
  )}

export default App;