import {createContext, useEffect, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        if(token){
            getPosts();
        }
    }, [token]);



    return (
        <AppContext.Provider value={{user, setUser, getPosts, posts, setToken, token}}>
            {children}
        </AppContext.Provider>
    )
}

