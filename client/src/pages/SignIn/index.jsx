import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, login } from "../../api/auth";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: "",
    success: false,
    error: "",
  });

  const { email, password, loading, success, error } = values;

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, loading: "loading" });

    if (!(email && password)) {
      console.log("Please fill all the fields");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Fill all the fields",
      });
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log("Please enter a valid email address");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "Enter valid email",
      });
    }

    if (password.length < 6) {
      console.log("Password must have atleast 6 characters");
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: "password must be at least 6 characters",
      });
    }

    try {
      const data = await login({ email, password });

      if (data.error) {
        return setValues({
          ...values,
          loading: "",
          success: false,
          error: data.error,
        });
      }
      authenticate(data);

      console.log(data);

      return navigate(`/userBoard/projects/${data.user._id}`);
    } catch (error) {
      return setValues({
        ...values,
        loading: "",
        success: false,
        error: error,
      });
    }
  };
  return (
    <section className="signIn">
      <nav className="signIn-nav">
        <div className="signIn-nav-wrap wrap">
          <Link to="/">
            <h2 className="signIn-nav-logo">Node Armor</h2>
          </Link>
        </div>
      </nav>
      <div className="signIn-hero-sec">
        <div className="signIn-hero-wrap wrap">
          <div className="signIn-hero-img-sec"></div>
          <div className="signIn-hero-form-sec">
            <h1 className="signIn-hero-form-header">Sign In</h1>
            <h3 className="signIn-hero-form-subHeader">
              You don’t have an account,{" "}
              <Link to="/signup">
                <span>SignUp</span>
              </Link>
            </h3>
            <form className="signIn-hero-form-form">
              <div className="signIn-hero-form-input-sec">
                <h3 className="signIn-hero-form-label">Email</h3>
                <input
                  type="text"
                  value={email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="signIn-hero-form-input"
                />
              </div>
              <div className="signIn-hero-form-input-sec">
                <h3 className="signIn-hero-form-label">Password</h3>
                <input
                  type="text"
                  value={password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="signIn-hero-form-input"
                />
              </div>
              <button className="signIn-hero-form-button" onClick={onSubmit}>
                {loading ? "Logging In" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
