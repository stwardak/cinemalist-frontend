import axios from "axios";

export function Logout() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_username");
    window.location.href = "/login"; 
  };

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}
