import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StudentDashboard from './Pages/StudentDashboard';
import Login from './Pages/Login';
import Faculty1 from './Pages/Faculty1';
import Admin1 from './Pages/Admin1';
const App = () => {
  const domains=['library','bankloan','hostelfee','department','canteen']
  const router = createBrowserRouter([
    {path: "/",element:<Login />},
    {path:"/studentdashboard",element:<StudentDashboard domains={domains} />},
    {path:"/faculty1",element:<Faculty1 />},
    {path:"/admin1",element:<Admin1 />},
  ])

  return (
    <div>
      <RouterProvider router={router} />
      
    </div>
  );
};
export default App;
