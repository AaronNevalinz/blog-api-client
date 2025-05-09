import {Link, useNavigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Input } from "./ui/input";
import Tags from "./Tags";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { IoIosLogOut } from "react-icons/io";
import logo from '../../public/logo.png'
import userLogo from '../../public/user.jpg'

export default function Navbar() {
    const {setUser, setToken, setLoggedInUserProfile, loggedUserProfile} = useContext(AppContext)
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const handleLogout = (e)=>{
        e.preventDefault();
        setUser(null);
        setToken(null);
        setLoggedInUserProfile(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        navigate('/login');
    }

    const handleQuerySubmit = (e)=>{
        e.preventDefault()
        if(query.trim()){
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    

    return (
        <div className="fixed w-full z-50 bg-white shadow-lg" >

        <div className="">
            <nav className="flex items-center justify-between max-w-6xl px-4 lg:px-0 mx-auto py-2">
                <div className="flex items-center gap-x-2">
                    <Link className={"bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-xl"} to="/feed">
                        <div className="flex items-center gap-x-3">
                            <img src={logo} alt="" className="w-8" />
                            <span>Reeadsy<span className="italic font-black text-2xl">!</span></span>
                        </div>
                    </Link>
                    <form action="" onSubmit={handleQuerySubmit}>
                        <Input type={"text"} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."/>
                    </form>
                </div>
                <ul className={"flex gap-x-4 items-center "}>
                    <li>
                        <Link to={"/new-story"} className={"flex items-center gap-x-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <span className="text-sm font-bold font-montserrat">Write</span>
                        </Link>
                    </li>
                    <li>


                            <DropdownMenu className={""}>
                                <DropdownMenuTrigger>
                                    {
                                        loggedUserProfile ?
                                            <div className={"w-[2.5rem] cursor-pointer h-[2.5rem] shadow-sm rounded-full"}>
                                                <img src={loggedUserProfile.imgUrl} className='h-full w-full object-cover rounded-full' alt="" />
                                            </div> : 
                                            <img src={userLogo} className="w-12 cursor-pointer" alt="" />
                                    }
                                    
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to={"/profile"}>
                                        <DropdownMenuItem className={"cursor-pointer"}>
                                                Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <form action="" onSubmit={handleLogout} className="cursor-pointer hover:bg-gray-100 rounded-md">
                                        <button className="cursor-pointer">
                                            <DropdownMenuItem>
                                                <div className="flex items-center gap-x-2 cursor-pointer">
                                                    <p>logout</p>
                                                    <IoIosLogOut />
                                                </div>
                                            </DropdownMenuItem>
                                        </button>
                                    </form> 
                                </DropdownMenuContent>
                            </DropdownMenu>
                    </li>
                </ul>
            </nav>
            </div>
            <div className="px-4 lg:px-0">
                <Tags/>
            </div>
        </div>
    )
}