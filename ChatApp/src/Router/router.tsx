import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/Login';


export const Router = () => {

const PATH_LOGIN = "/login"
const PATH_HOME = "/"

const isAuthenticated = !!localStorage.getItem("user")

  return (
    <Routes>
      <Route path={PATH_HOME} element={ <ProtectedRoute isAllowed={isAuthenticated} redirectTo={PATH_LOGIN}> <Home/></ProtectedRoute>  } />
      <Route path={PATH_LOGIN} element={ <ProtectedRoute isAllowed={true} redirectTo={PATH_HOME}> <Login/></ProtectedRoute>  } />
    </Routes>
  );
}


