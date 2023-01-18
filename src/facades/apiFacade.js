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

let role = "user";

let loggedIn = false;


const setUser = (userResult, varRole) => {
  user = userResult;
  role = varRole;
}

const getRole = () => {
  return role;
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

const getUserFromToken = (setLogginText, setRoleHead) => {
  setLog(true)
  const options = makeOptions("POST", true)
  return fetch(URL + "/user/verify", options)
    .then(res => res.json())
    .then(json => {
      if ("code" in json) {
        logout()
      } else {
        setUser(json.username, json.role[0]);
        setRoleHead(json.role[0]);
        setLogginText("Logout");
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
        console.log(res)
        setUser(res.username);
        setLog(true);
      })
}

//Create functions
const createUser = async (user, password, phone, email, roles) => {
  const options = makeOptions("POST", true,{name: user, password: password, phone: phone, email: email, roles: roles});
  await fetch(URL + "/user", options)
  .then(handleHttpErrors);
}

const createLocation = async (address, city) => {
    const options = makeOptions("POST", true,{address: address, city: city});
    await fetch(URL + "/location", options)
    .then(handleHttpErrors);
}

const createMatch = async (opponentTeam, judge, type, inDoors) => {
  const options = makeOptions("POST", true,{opponentTeam: opponentTeam, judge: judge, type: type, inDoors: inDoors});
  await fetch(URL + "/match", options)
  .then(handleHttpErrors);
}

//Update function
const updatePassword = async (password) => {
  const user = getUser();
  console.log(user);
  const options = makeOptions("PUT", true,{password: password});
  return fetch(URL + "/user", options)
  .then(handleHttpErrors);
}

const updateMatch = async (id, opponentTeam, judge, type, inDoors, users, location) => {
  const options = makeOptions("PUT", true,{id: id, opponentTeam: opponentTeam, judge: judge, type: type, inDoors: inDoors, users: users, location: location});
  return fetch(URL + "/match", options)
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
          users.push({id: ele.id, username: ele.username, role: ele.role[0]});
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

const getAllMatches = async () => {
  let matches = [];
  await fetch(URL + "/match/all",
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
      console.log(res);
      for(const ele of res){
        matches.push({id: ele.id, opponentTeam: ele.opponentTeam, judge: ele.judge, type: ele.type, inDoors: ele.inDoors});
      }
  });
  return matches;
}

const getAllMatchesOnLocation = async (location) => {
  let matches = [];
  await fetch(URL + "/match/all/location/"+location,
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
      for(const ele of res){
        matches.push({opponentTeam: ele.opponentTeam, judge: ele.judge, type: ele.type, inDoors: ele.inDoors});
      }
  });
  return matches;
}

const getPlayersMatches = async (name) => {
  let matches = [];
  const options = makeOptions("GET", true);
  await fetch(URL + "/match/all/player/"+getUser(), options)
  .then(handleHttpErrors)
  .then(res => {
    // if(userRole === "admin"){}
      for(const ele of res){
        matches.push({opponentTeam: ele.opponentTeam, judge: ele.judge, type: ele.type, inDoors: ele.inDoors});
      }
  });
  return matches;
}

const getMatch = async (id) => {
  const options = makeOptions("GET", true);
  return fetch(URL + "/match/"+id, options)
  .then(handleHttpErrors);
}

const getAllLocations = async () => {
  let locations = [];
  await fetch(URL + "/location/all",
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
      for(const ele of res){
        locations.push({locationId: ele.id, address: ele.address});
      }
  });
  return locations;
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
     updateMatch,
     getUser,
     createUser,
     createMatch,
     createLocation,
     deleteUser,
     getAllUsers,
     getAllMatches,
     getPlayersMatches,
     getAllMatchesOnLocation,
     getAllLocations,
     getMatch,
     getRole
 }
}
const facade = apiFacade();
export default facade;
