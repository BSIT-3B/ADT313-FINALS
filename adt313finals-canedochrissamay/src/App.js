import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Main from './pages/Main/Main';
import Register from './pages/Public/Login/Register'; // Import Register component
import Movie from './pages/Main/Movie/Movie';
import Form from './pages/Main/Movie/Form/Form';
import Lists from './pages/Main/Movie/List/Lists';



const router = createBrowserRouter([
  {
    path: '/',               // The root path points to the login page
    element: <Login />,
  },
  {
    path: '/register',        // Add the Register page route
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      //Temporarily disabled the dashboard route
      // {
      //   path: '/main/dashboard',
      //   element: <Dashboard />,
      // },
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists/>,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
