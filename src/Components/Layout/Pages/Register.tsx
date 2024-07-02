import React, { useState } from "react";
import { inputHelper } from "../../../Helper";

function Register() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="mt-5 text-dark row justify-content-center"
    >
      <div className=" text-secondary col-8 col-md-4">
        <h2 className="text-dark">Register New Account</h2>
        <hr></hr>
        <form>
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
              <option value="admin">Admine</option>
            </select>
            <label>Role</label>
          </div>
          <div className="text-center mt-3">
            <button className="text-center btn-lg btn btn-dark">
              Register
            </button>
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
