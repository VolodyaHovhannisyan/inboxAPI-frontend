import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthService from "../services/auth.service";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, setUser, setUserTrue } = useAuth();

  const { email, password } = formData;

  const navigate = useNavigate();

  const { login } = AuthService();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.length > 5 && password.length > 5) {
      login(email, password)
        .then((data) => {
          console.log(data);
          if (data?.user) {
            setUser(true);
            setUserTrue(true);
            navigate("/");
            window.location.reload();
          }
          if (data.statusCode) {
            console.log(data);
            alert(data.message);
          }
        })
        .catch((err) => console.log(err));

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start manage your inbox</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              onClick={() => user && navigate("/")}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
    
  );
}

export default Login;
