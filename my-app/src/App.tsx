import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './router/router';


function App() {
  return (
    <div className="App">
        <RouterProvider router = {createBrowserRouter(routes)} />
    </div>
  );
}

export default App;
