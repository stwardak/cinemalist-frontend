import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter} from "react-router-dom";
import "./index.css"

function App() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <div className="flex-grow pt-48 lg:pt-24">
          <Content />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;