import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";

function LoginPage() {

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login?_holidaze=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseBody = await response.json();
      login(responseBody.data);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  }


  return (
    <div className="bg-[url('/images/background-flowers.png')] bg-cover bg-center h-[80vh] flex items-center justify-center">
      <div className="bg-white w-[630px] h-[650px] shadow-lg items-center justify-center flex flex-col">
        <h2>Log in</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
          />
          <button className="primary-button-dark" type="submit">Log in</button>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/register">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
