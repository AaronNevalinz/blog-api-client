import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blogs from "@/pages/Blogs.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import Login from "@/pages/auth/Login.jsx";
import {useContext} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import PublishBlog from "@/pages/PublishBlog.jsx";
import SingleBlog from "@/pages/SingleBlog.jsx";

function App() {
    const {user} = useContext(AppContext);
  return (
      <BrowserRouter>
        <Routes className="font-sans">
          <Route path="/" element={<Home/>} />
            <Route path="/blogs" element={user ? <Blogs/> : <Login/>} />
            <Route path={"/new-story"} element={ <PublishBlog/>} />
            <Route path={"/login"} element={user ? <Blogs /> : <Login/>} />
            <Route path={"/single-blog"} element={<SingleBlog/>} />
        </Routes>
          <Toaster />
      </BrowserRouter>
  )
}

export default App
