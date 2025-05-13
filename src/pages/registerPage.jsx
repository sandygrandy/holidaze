import { Link } from "react-router-dom";

function registerPage() {
  async function registerUser(name, email, password) {
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

  function handleRegister(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    registerUser(name, email, password)
      .then((data) => {
        console.log("User registered successfully:", data);
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
            event.preventDefault();
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email.endsWith("@stud.noroff.no")) {
              alert(
                "You need to have a valid Noroff email address to register."
              );
              return;
            }

            registerUser(name, email, password)
              .then((data) => {
                console.log("User registered successfully:", data);
              })
              .catch((error) => {
                console.error("Error registering user:", error);
              });
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
