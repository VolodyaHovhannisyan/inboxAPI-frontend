import "./App.css";
import "./Home.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import useAuth from "./hooks/useAuth";
import UserService from "./services/user.service";

function App() {
  const { user } = useAuth();
  const { refreshAccToken } = UserService();

  window.onload = (event) => {
    var storageDt = JSON.parse(localStorage?.getItem("user"));

    if (storageDt?.user) {
      refreshAccToken(storageDt)
        .then((data) => {
          if (data.accessToken) {
            storageDt.accessToken = data.accessToken
            localStorage.setItem(
              "user",
              JSON.stringify(storageDt)
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="App">
      <>
        <Router>
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/users/login"
                element={user ? <Dashboard /> : <Login />}
              />
              <Route
                path="/users/register"
                element={user ? <Dashboard /> : <Register />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;
