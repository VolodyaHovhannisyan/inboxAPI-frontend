import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import AuthService from "../services/auth.service";
import useAuth from "../hooks/useAuth";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  }); 

  const { email, password, password2 } = formData;

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const { register } = AuthService();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords are different!!!");
      setUser(false);
    }

    if (email.length > 5 && password.length > 5) {
      register(email, password)
        .then((data) => {
          if (data.email) {
            setUser(true);
            navigate("/users/login");
            setFormData({
              email: "",
              password: "",
              password2: "",
            });
          }
          if (data.statusCode === 400) {
            alert(data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
