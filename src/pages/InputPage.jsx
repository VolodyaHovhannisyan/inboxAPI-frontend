import { useState } from "react";
import UserService from "../services/user.service";

const InputPage = ({ setDomVal }) => {
  const [formData, setFormData] = useState({
    adomain: "",
    pddToken: "",
  });

  const { adomain, pddToken } = formData;

  const { checkDomain } = UserService();

  function change() {
    return setDomVal(true)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (pddToken.length > 50 && adomain.length > 5) {
      checkDomain(adomain, pddToken)
        .then((data) => {
          if (data.data.success === 'ok') {        
            change()
          }
          else if (data.data.success === 'error') {
            alert('Wrong crendentials provided!')
          }
        })
        .catch((err) => {
          console.log(err);
        });     
    }
  };

  return (
    <>
      <section className="heading">
                <h4>With this application you can create a lot of accounts at once just by providing enough information</h4>
               <p>Please write your Yandex Domain and Pdd Token </p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="adomain"
              name="adomain"
              value={adomain}
              placeholder="Enter your domain"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="pddToken"
              name="pddToken"
              value={pddToken}
              placeholder="Enter your Pdd Token"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default InputPage;
