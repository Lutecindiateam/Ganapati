import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import FormExample from './form';
import Poster from './poster';




const router = createBrowserRouter([

   {
    path:"/",
    element:< FormExample/>,
  },
  {
    path:"/poster/:id",
    element:< Poster/>,
  }
  

]);


export default router;
