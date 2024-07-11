import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter} from "react-router-dom";
import "./index.css"

function App() {
  return (
    <div className= "bg-black">
    <BrowserRouter>
    <Header />
      <Content />
    <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App;