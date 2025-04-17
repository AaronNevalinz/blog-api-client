import {createContext, useEffect, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

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
    useEffect(() => {
        if(token){
            getPosts();
            getTags()
        }
    }, [token]);



    return (
        <AppContext.Provider value={{user, tags, setUser, getPosts, posts, setToken, token}}>
            {children}
        </AppContext.Provider>
    )
}

