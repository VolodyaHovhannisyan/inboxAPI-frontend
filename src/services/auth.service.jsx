const API_URL = "https://inbox-api-backend.herokuapp.com/authentication/";
export default function AuthService() {
  async function login(email, password) {
    return await fetch(API_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken && data.refreshToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        return data;
      })
      .catch(err => console.log(err))
  }
  function logout() {
    localStorage.removeItem("user");
  }
  async function register(email, password) {
    return await fetch(API_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch(err => console.log(err))
  }
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  return { login, logout, register, getCurrentUser };
}


