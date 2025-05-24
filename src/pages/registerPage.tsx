import { Link } from "react-router-dom";
import React from "react";

function registerPage() {
  async function registerUser(name: string, email: string, password: string) {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return await response.json();
  }

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!email.endsWith("@stud.noroff.no")) {
      alert(
        "You need to have a valid Noroff email address to register."
      );
      return;
    }

    registerUser(name, email, password)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  }

  return (
    <div className="bg-[url('../images/background-flowers.png')] bg-cover bg-center h-[80vh] flex items-center justify-center">
      <div className="bg-white w-[630px] h-[650px] shadow-lg items-center justify-center flex flex-col">
        <h2>Register</h2>
        <form
          className="flex flex-col mt-4"
          onSubmit={(event) => {
            handleRegister(event as React.FormEvent<HTMLFormElement>);  
          }}
        >
          <label htmlFor="name">Username:</label>
          <input
            required
            minLength={3}
            type="text"
            id="name"
            placeholder="Name"
            className="border border-gray-300 p-2 rounded"
          />
          <label htmlFor="email">Email:</label>
          <input
            required
            type="email"
            id="email"
            placeholder="email"
            className="border border-gray-300 p-2 rounded"
          />
          <label htmlFor="password">Password:</label>
          <input
            required
            minLength={8}
            maxLength={20}
            type="password"
            id="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded"
          />
          <button className="primary-button-dark" type="submit">
            Register
          </button>
          <p className="text-center text-gray-500 mt-4">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default registerPage;
