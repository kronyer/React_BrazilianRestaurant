import React, { useState } from "react";
import { inputHelper } from "../../../Helper";
import { useLoginUserMutation } from "../../../Apis/authApi";
import { apiResponse, userModel } from "../../../Interfaces";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router";

function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });

    setLoading(false);

    if (response.data) {
      const { token } = response.data.result;

      const { fullName, id, email, role }: userModel = jwtDecode(token);

      localStorage.setItem("token", token);

      dispatch(
        setLoggedInUser({
          fullName,
          id,
          email,
          role,
        })
      );
      navigate("/");
    } else if (response.error) {
      response.error;
      setError(response.error.data.errorMessages[0]);
    }
  };
  return (
    <div className="row justify-content-center text-center mt-5">
      <div className="col-10 col-md-4">
        <h2>Login</h2>
        {error && <p className="text-danger">{error}</p>}
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              required
              name="userName"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={handleUserInput}
            ></input>
            <label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              required
              name="password"
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
              onChange={handleUserInput}
            ></input>
            <label>Password</label>
          </div>
          <div className="row text-center justify-content-center">
            <div className="col-6">
              {loading ? (
                <button className="btn btn-dark mx-2" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span> LoginIn...</span>
                </button>
              ) : (
                <button className="btn btn-dark mx-2">Login</button>
              )}
              <button
                onClick={() => navigate("/register")}
                className="btn-outline-dark btn mx-2"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
