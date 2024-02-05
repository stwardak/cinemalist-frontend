import { Signup } from "./Signup";
import { Login } from "./Login";
import { Logout } from "./Logout";

export function Content() {
  return (
    <main>
      <h1>Welcome to React!</h1>
      <Signup/>
      <Login/>
      <Logout/>
    </main>
  )
}