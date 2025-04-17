import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Feed from "@/pages/Feed.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import Login from "@/pages/auth/Login.jsx";
import {useContext} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import PublishBlog from "@/pages/PublishBlog.jsx";
import ArticleView from "@/pages/ArticleView.jsx";

function App() {
    const {user} = useContext(AppContext);
  return (
      <BrowserRouter>
        <Routes className="font-poppins">
          <Route path="/" element={<Home/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path={"/new-story"} element={ <PublishBlog/>} />
            <Route path={"/login"} element={user ? <Feed /> :<Login/>} />
            <Route path={"/article/:id"} element={<ArticleView/>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
  )
}

export default App
