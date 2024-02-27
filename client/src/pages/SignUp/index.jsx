import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, login, signup } from "../../api/auth";

const SignUp = () => {
  const [values, setValues] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    loading: "",
    success: false,
    error: "",
  });

  const { firstName, secondName, email, password, loading, success, error } =
    values;

  const navigate = useNavigate();

  // onSubmit - Function to submit the signup form
  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: "loading" });

    if (!(firstName && secondName && email && password)) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Enter valid email",
      });
    }

    if (password.length < 5) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "password must be at least 6 characters",
      });
    }

    try {
      var data = await signup({ firstName, secondName, email, password });

      if (data.status === "error") {
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      data = await login({ email, password });
      if (data.status === "error") {
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      authenticate(data);
      return navigate(`/userBoard/projects/${data.user._id}`);
    } catch (error) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: error.message,
      });
    }
  };

  return (
    <section className="signUp">
      <nav className="signUp-nav">
        <div className="signUp-nav-wrap wrap">
          <Link to="/">
            <h2 className="signUp-nav-logo">Node Armor</h2>
          </Link>
        </div>
      </nav>
      <div className="signUp-hero-sec">
        <div className="signUp-hero-wrap wrap">
          <div className="signUp-hero-form-sec">
            <h1 className="signUp-hero-form-header">Sign Up</h1>
            <h3 className="signUp-hero-form-subHeader">
              Discover the capabilities of monitor at no cost.
            </h3>
            <form className="signUp-hero-form-form">
              <div className="signUp-hero-form-input-sec">
                <h3 className="signUp-hero-form-label">First Name</h3>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setValues({ ...values, firstName: e.target.value })
                  }
                  className="signUp-hero-form-input"
                />
              </div>
              <div className="signUp-hero-form-input-sec">
                <h3 className="signUp-hero-form-label">Second Name</h3>
                <input
                  type="text"
                  value={secondName}
                  onChange={(e) =>
                    setValues({ ...values, secondName: e.target.value })
                  }
                  className="signUp-hero-form-input"
                />
              </div>
              <div className="signUp-hero-form-input-sec">
                <h3 className="signUp-hero-form-label">Email</h3>
                <input
                  type="text"
                  value={email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="signUp-hero-form-input"
                />
              </div>
              <div className="signUp-hero-form-input-sec">
                <h3 className="signUp-hero-form-label">Password</h3>
                <input
                  type="text"
                  value={password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="signUp-hero-form-input"
                />
              </div>
              <button className="signUp-hero-form-button" onClick={onSubmit}>
                {loading ? "Signing Up" : "Join Free"}
              </button>
            </form>
          </div>
          <div className="signUp-hero-img-sec"></div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
