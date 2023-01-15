import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from "react-dom";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Header from './routes/Header';
import Home from './routes/Home';
import Login from './routes/Login';
import CreateAcc from './routes/CreateAcc';
import AdminPage, {CreateAccount, UpdateAccount, DeleteAccount} from './routes/AdminPage';
import Scoreboard from './routes/Scoreboard';
import reportWebVitals from './reportWebVitals';
import facade from './facades/apiFacade';


ReactDOM.createRoot(document.getElementById('root')).render(
// const rootElement = document.getElementById("root");
// render(
  <BrowserRouter>
    <Routes>
      <Route element={<Header/>}>
      {/* <Route path="/" element={<Header />}> */}
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="createacc" element={<CreateAcc />}/>
        <Route path="adminPage" element={<AdminPage />}>
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="updateAccount" element={<UpdateAccount />} />
          <Route path="deleteAccount" element={<DeleteAccount />} />
        </Route>
        <Route path="scoreboard" element={<Scoreboard />}/>
      {/* </Route> */}
      <Route 
        path="*"
        element={
          <main>
            <h3>You've hit a page with nothing on it - please go back</h3>
          </main>
        }
      />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
