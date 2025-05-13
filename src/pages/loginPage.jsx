import { Link } from "react-router-dom";

function loginPage() {

  async function handleLogin(event) {
    event.preventDefault();

    const email = event.target.elements[0].value;
    const password = event.target.elements[1].value;

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  }

  return (
    <div className="bg-[url('../images/background-flowers.png')] bg-cover bg-center h-[80vh] flex items-center justify-center">
      <div className="bg-white w-[630px] h-[650px] shadow-lg items-center justify-center flex flex-col">
        <h2>Log in</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
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
export default loginPage;
