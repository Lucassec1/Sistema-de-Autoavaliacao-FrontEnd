import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Switch,
} from "react-router-dom";
import Home from "./Pages/Home";
import Cadastros from "./Pages/Cadastros/index.js";
import Login from './Pages/Login/Login';
import SideBar from './Components/SideBar';
import Paghomepesquisa from './Pages/formulario/Paghomepesquisa'
import HomeUser from './Pages/User Comum/Home User/index'
import ResUser from "./Pages/User Comum/Resposta User/index";
import Minhapesquisa from './Pages/formulario/Minhapesquisa/MinhaPesquisa'
import Criarpesquisamenu from './Pages/formulario/CriarPesquisaMenu'
import Criarpesquisa from './Pages/formulario/CriarPesquisa/index'
import Grupos from './Pages/Grupos/grupos'
import { useJwt } from "react-jwt";

const PrivateRoute = ({ Item }) => {
  const token = localStorage.getItem('token');
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  const userType = decodedToken?.tipo

  const updateToken = () => {
    const newToken = "A new JWT";
    reEvaluateToken(newToken); // decodedToken and isExpired will be updated
  } 

  if (Item === ResUser) return token ? <Item /> : <Login />;

  return token ? userType !== 3 ? <Item /> : <HomeUser /> : <Login />;
};

export default function Rotas() {
  return (
    <BrowserRouter>
      {window.location.pathname !== '/' ? localStorage.getItem("tipo") !== '3' ? <SideBar /> : null : null}
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path="/home" element={<PrivateRoute Item={Home} />} />
        <Route exact path="/cadastros" element={<PrivateRoute Item={Cadastros} />} />
        <Route exact path="/pesquisas" element={<PrivateRoute Item={Paghomepesquisa} />} />
        <Route exact path="/minhapesquisa" element={<PrivateRoute Item={Minhapesquisa} />} />
        <Route exact path="/homeU" element={<PrivateRoute Item={HomeUser} />} />
        <Route exact path="/menupesquisa" element={<PrivateRoute Item={Criarpesquisamenu} />} />
        <Route exact path="/criarpesquisa/:tipo" element={<PrivateRoute Item={Criarpesquisa} />} />
        <Route exact path="/pesquisa/:id" element={<PrivateRoute Item={ResUser} />} />
        <Route exact path="/Grupos" element={<PrivateRoute Item={Grupos} />} />
      </Routes>
    </BrowserRouter>
  )
}