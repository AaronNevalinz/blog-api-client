import {createContext, useEffect, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [loggedInUserPosts, setLoggedInUserPosts] = useState([])


        const [loggedUserProfile, setLoggedInUserProfile] = useState(null)

    const getPosts = async () => {
        const response = await fetch("http://127.0.0.1:8080/blog/posts-summary", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        if(response.ok){
            setPosts(data.result);
        }
    }

    const getUserPosts = async () => {
        const res = await fetch("http://localhost:8080/blog/posts/user",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data = await res.json()
        if(data.status){
            setLoggedInUserPosts(data.result)
        }
    }

    const getTags = async ()=>{
        const res = await fetch("http://127.0.0.1:8080/topics", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        if(res.ok){
            setTags(data.topics)
        }
    }
    useEffect(()=>{
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        if(storedToken && storedUser) {
            setToken(storedToken)
            setUser(storedUser)
        }
    }, [])

     const getUserProfile = async ()=>{
            const res = await fetch(`http://localhost:8080/profile/get-user/profile/`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            if(data.status){
                console.log(data.result);
                setLoggedInUserProfile(data.result)
            }
        }
    
        useEffect(()=>{
            getUserPosts()
            getUserProfile()
        }, [])

    useEffect(() => {
        if(token){
            getPosts();
            getTags()
        }
    }, [token]);



    return (
        <AppContext.Provider value={{user, getUserProfile, loggedUserProfile, tags, getUserPosts, loggedInUserPosts, setUser, getPosts, posts, setToken, token}}>
            {children}
        </AppContext.Provider>
    )
}

