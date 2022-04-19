import axios from "axios";
import { useState } from "react";
import authHeader from "./auth-header";
const API_URL = "https://inbox-api-backend.herokuapp.com/authentication/";

function UserService() {
  const [domain, setDomain] = useState(false);

  function getUser() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  function checkDomain(domain, token) {
    return axios.post("https://inbox-api-backend.herokuapp.com/users/domain", { domain, token });
  }

  async function refreshAccToken(userDt) {
    return fetch(API_URL + "refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'authorization': userDt.refreshToken
      },
      body: JSON.stringify({
        user: { email: userDt.user.email, _id: userDt.user.id }
      }),
    })
    .then(res => res.json())
    
  }

  return { getUser, checkDomain, domain, setDomain, refreshAccToken };
}

export default UserService;
