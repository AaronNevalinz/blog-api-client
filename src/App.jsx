import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Feed from "@/pages/Feed.jsx";
import {Toaster} from "@/components/ui/sonner.jsx";
import Login from "@/pages/auth/Login.jsx";
import {useContext} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import PublishBlog from "@/pages/PublishBlog.jsx";
import ArticleView from "@/pages/ArticleView.jsx";
import FeedByTag from "./pages/FeedByTag.jsx";
import Register from "./pages/auth/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";

function App() {
    const {user} = useContext(AppContext);
  return (
      <BrowserRouter>
        <Routes className="font-poppins">
          <Route path="/" element={<Home/>} />
            <Route path="/feed" element={user ? <Feed/> : <Login/>} />
            <Route path="/feed/tag/:id" element={user ? <FeedByTag/> : <Login/>} />
            <Route path={"/new-story"} element={ user ? <PublishBlog/> : <Login/>} />
            <Route path={"/login"} element={user ? <Feed /> :<Login/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path={"/article/:id"} element={user ? <ArticleView/>:<Login/>} />
            <Route path="/profile" element={<UserProfile/>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
  )
}

export default App
