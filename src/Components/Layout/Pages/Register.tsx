import React, { useState } from "react";
import { inputHelper, toastNotify } from "../../../Helper";
import { useRegisterUserMutation } from "../../../Apis/authApi";
import { apiResponse } from "../../../Interfaces";
import { useNavigate } from "react-router";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });

    setLoading(false);

    if (response.data) {
      toastNotify("Registration successful");
      navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }
  };

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  return (
    <div className="mt-5 text-dark row justify-content-center">
      <div className=" text-secondary col-8 col-md-4">
        <h2 className="text-dark">Register New Account</h2>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            ></input>
            <label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            ></input>
            <label>Full Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            ></input>
            <label>Password</label>
          </div>
          <div className="form-floating mt-3">
            <select
              className="form-control form-select"
              required
              value={userInput.role}
              onChange={handleUserInput}
              name="role"
            >
              <option value={""}>--Select Role--</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <label>Role</label>
          </div>
          <div className="text-center mt-3">
            {loading ? (
              <button disabled className="text-center btn-lg btn btn-dark">
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span> Proccesing...</span>
              </button>
            ) : (
              <button className="text-center btn-lg btn btn-dark">
                Register
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="col-8 col-md-4">
        <br></br>
        <img width={"100%"} src="https://placehold.co/600x400"></img>
        <br></br>
      </div>
    </div>
  );
}

export default Register;
