import { Link, useNavigate } from "react-router-dom";
import {toast} from "sonner";
import {useContext, useState} from "react";
import {AppContext} from "@/context/AppContext.jsx";


export default function Login() {
    const {setUser, setToken} = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleLogin =  async (e)=>{
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8080/api/auth/login", {
            method:'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        console.log(data)
        if(data.status){
            setUser(data.user);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/blogs');
            toast.success("Login successful!");
        }
    }



    return (
        <div className='flex justify-center items-center h-screen bg-[#333d51]'>
            <form action="" className="max-w-[700px] shadow-md rounded-lg py-10 px-10 shadow-slate-700 space-y-4 bg-white" onSubmit={handleLogin}>
                <div className="flex gap-5 items-center">
                    <h1 className="text-3xl font-bold">Login into your Account</h1>
                    <p className="uppercase underline">
                        <Link to={'/register'}>create an account</Link>
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input type="text" onChange={e => setFormData({ ...formData, username: e.target.value })} placeholder="Username" className="outline-none py-2 px-4 border bg-transparent border-slate-300 rounded-md"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Password" className="outline-none py-2 px-4 border bg-transparent border-slate-300 rounded-md" />
                </div>
                <div>
                    <button className="bg-orange-600 text-white  py-2 px-4 rounded-md text-lg font-medium">Submit</button>
                </div>
            </form>
        </div>
    )
}
