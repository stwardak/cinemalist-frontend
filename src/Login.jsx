import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log("Login response:", response.data);
        const { jwt, user_id, username } = response.data;  // Destructure response
        if (jwt && user_id && username) {  // Ensure all values are present
          axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("userId", user_id);  // Use user_id to match backend response
          localStorage.setItem("user_username", username);
          
          event.target.reset();
          window.location.href = "/";  // Redirect or hide modal
        } else {
          setErrors(["Invalid response from server"]);
        }
      })
      .catch((error) => {
        console.log("Login error:", error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
      
      {errors.length > 0 && (
        <ul className="mb-6">
          {errors.map((error) => (
            <li key={error} className="bg-red-700 text-white p-2 rounded-md">{error}</li>
          ))}
        </ul>
      )}
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
          <input id="email" name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
          <input id="password" name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Login</button>
      </form>
    </div>
  );
}