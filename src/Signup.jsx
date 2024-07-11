import axios from "axios";
import { useState, useEffect } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    // Fetch available avatars from the backend
    axios.get("http://localhost:3000/avatar_options.json")
      .then((response) => {
        setAvatars(response.data.avatars);
        setSelectedAvatar(response.data.avatars[0]); // Set default avatar
      })
      .catch((error) => {
        console.error("Error fetching avatars:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    params.append("profile_visibility", true);
    params.append("avatar", selectedAvatar); 

    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        const { jwt, user_id, username, avatar } = response.data;  // Destructure response
        if (jwt && user_id && username && avatar) {  // Ensure all values are present
          axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("userId", user_id);  // Use user_id to match backend response
          localStorage.setItem("user_username", username);
          localStorage.setItem("user_avatar", avatar);
          
          event.target.reset();
          window.location.href = "/";  // Redirect or hide modal
        } else {
          setErrors(["Invalid response from server"]);
        }
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="min-h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl font-bold mb-6 text-white">Signup</h1>
      
      {errors.length > 0 && (
        <ul className="mb-6">
          {errors.map((error) => (
            <li key={error} className="bg-red-700 text-white p-2 rounded-md">{error}</li>
          ))}
        </ul>
      )}
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Username</label>
          <input id="username" name="username" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
          <input id="email" name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
          <input id="password" name="password" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password_confirmation" className="block text-white text-sm font-bold mb-2">Password Confirmation</label>
          <input id="password_confirmation" name="password_confirmation" type="password" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Select Your Avatar:</label>
          <div className="flex space-x-4 justify-center">
            {avatars.map((avatar) => (
              <img 
                key={avatar}
                src={`http://localhost:3000/assets/avatars/${avatar}`}
                alt={`Avatar ${avatar}`}
                className={`w-16 h-16 rounded-full cursor-pointer ${selectedAvatar === avatar ? 'w-20 h-20 hover:opacity-75' : 'opacity-50 hover:opacity-100'}`}
                onClick={() => setSelectedAvatar(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className= "align-middle text-lg font-bold border-2 border-white border-b-grey-300 border-r-grey-300 ml-2 px-2 text-white rounded hover:translate-x-0.5 hover:translate-y-0.5 hover:border-grey-100 hover:border-b-grey-300 hover:border-r-grey-300 hover:bg-grey-500">Signup</button>
      </form>
    </div>
  );
}
