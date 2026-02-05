import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
let navigate = useNavigate()
  let [form, setform] = useState({
    email: "",
    pass: "",
  });

  let handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    let cleanEmail = form.email.includes("@") && form.email.includes(".com");
    let hasNumber = form.pass.match(/[1234567890]/); // regexp
    let hasSymbol = form.pass.match(/[1234567890]/); // regexp
    let hasUpperCase = form.pass.match(/[1234567890]/); // regexp
    let hasLowerCase = form.pass.match(/[1234567890]/); // regexp
    let valid = true;

    if (!cleanEmail) {
      alert("Please enter valid email");
      valid = false;
    } else if (!(hasNumber && hasSymbol && hasUpperCase && hasLowerCase)) {
      alert("Please enter valid email");
      valid = false;
    }

    if (valid) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      let authUser = users.find((e) => {
        return e.email === form.email && e.pass === form.pass;
      });
      if (authUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(authUser));
        localStorage.setItem("useremail", authUser.email)
                alert("Login Succesul"); 
                navigate("/home") 
        return;
      }
      else{
        alert("Please enter vaild email and pass")
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        Enter Email:{" "}
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />{" "}
        <br /> <br />
        Enter Pass:{" "}
        <input
          type="text"
          name="pass"
          value={form.pass}
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

export default Login;
