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
import InfiniteScroll from "./pages/InfiniteScroll.jsx";
import Profile from "./pages/Profile.jsx";
import SearchResults from "./pages/SearchResults.jsx";

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
            <Route path="/profile" element={user? <UserProfile/>:<Login/>} />
            <Route path="/profile/:username" element={user? <Profile/>:<Login/>} />
            <Route path="/scroll" element={<InfiniteScroll/>} />
            <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Toaster 
          // position="bo-center"
          toastOptions={{
            style: {
              background: '#2C3930',
              color: '#DCD7C9',
              border: '1px solid #3F4F44',
              padding: '20px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ecfdf5',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fee2e2',
              },
            },
          }}
        />

      </BrowserRouter>
  )
}

export default App
