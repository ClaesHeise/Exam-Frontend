import { useState } from "react";

const URL = "http://onebrightcreation.com:8081/pro_exam/api";
 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
 const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
// const loggedIn = () => {
//   const loggedIn = getToken() != null;
//   return loggedIn;
// }
const logout = () => {
  localStorage.removeItem("jwtToken");
  setLog(false);
  setUser("No user");
}

let user = "No user";

let loggedIn = false;


const setUser = (userResult) => {
  user = userResult;
}

const getUser = () => {
  return user;
}

const setLog = (setLog) => {
  loggedIn = setLog;
}

const getLog = () => {
  return loggedIn;
}

const getUserFromToken = (setLogginText) => {
  setLog(true)
  const options = makeOptions("POST", true)
  return fetch(URL + "/user/verify", options)
    .then(res => res.json())
    .then(json => {
      if ("code" in json) {
        logout()
      } else {
        setUser(json.username)
        setLogginText("Logout")
      }
    })
}

//Todo: Maybe remove /user
const login = (user, password) => {
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(URL + "/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        setUser(res.username);
        setLog(true);
      })
}

//Create function
const createUser = async (user, password, roles) => {
    const options = makeOptions("POST", true,{name: user, password: password, roles: roles});
    await fetch(URL + "/user", options)
    .then(handleHttpErrors);
    return login(user, password);
}

//Update function
const updatePassword = async (password) => {
  const user = getUser();
  console.log(user);
  const options = makeOptions("PUT", true,{password: password});
  return fetch(URL + "user", options)
  .then(handleHttpErrors);
}

const deleteUser = (name) => {
  const options = makeOptions("DELETE", true,{name: name});
  return fetch(URL + "/user", options)
  .then(handleHttpErrors);
}

//Make sure this is removed or else remove
const fetchData = () => {
  const options = makeOptions("GET",true); //True add's the token
   return fetch(URL + "/info/user", options).then(handleHttpErrors);
}

//Get list function - change to fit
const getAllUsers = async (userRole, num) => {
    let users = [];
    await fetch(URL + "/user/all/"+userRole,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    })
    .then(handleHttpErrors)
    .then(res => {
      // if(userRole === "admin"){}
      if(num === 1){
        for(const ele of res){
          users.push({username: ele.username, role: ele.role[0]});
        }
      }
      else{
        for(const ele of res){
          users.push(ele.username);
        }
      }
      
    });
    return users;
}

const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }

 return {
     makeOptions, //Make sure this is used
     getToken, //Make sure this is used
     getLog,
     getUserFromToken,
     setToken, 
     login,
     logout,
     fetchData,
     updatePassword,
     getUser,
     createUser,
     deleteUser,
     getAllUsers,
 }
}
const facade = apiFacade();
export default facade;
