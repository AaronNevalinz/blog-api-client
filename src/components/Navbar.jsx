import {Link, useNavigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import { Input } from "./ui/input";
import Tags from "./Tags";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { IoIosLogOut } from "react-icons/io";
import logo from '../../public/logo.png'

export default function Navbar() {
    const {setUser, setToken} = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (e)=>{
        e.preventDefault();
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="fixed w-full z-50 bg-white shadow-lg" >

        <div className="">
            <nav className="flex items-center justify-between max-w-4xl mx-auto py-2">
                <div className="flex items-center gap-x-2">
                    <Link className={"bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-xl"} to="/feed">
                        <div className="flex items-center gap-x-3">
                            <img src={logo} alt="" className="w-8" />
                            <span>Reeadsy<span className="italic font-black text-2xl">!</span></span>
                        </div>
                    </Link>
                    <form action="">
                        <Input placeholder="Search..."/>
                    </form>
                </div>
                <ul className={"flex gap-x-8 items-center "}>
                    <li>
                        <Link to={"/new-story"} className={"flex gap-x-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <span>Write</span>
                        </Link>
                    </li>
                    <li>


                            <DropdownMenu className={"w-[200px]"}>
                                <DropdownMenuTrigger>
                                    <div className={"w-10 h-10 bg-orange-600 rounded-full"}></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to={"/profile"}>
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to={"/profile"}>
                                            Stories
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link to={"/profile"}>
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <form action="" onSubmit={handleLogout} className="cursor-pointer">
                                            <button className="flex items-center gap-x-2">
                                                <p>logout</p>
                                                <IoIosLogOut />
                                            </button>
                                            
                                        </form>                                       
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                    </li>
                </ul>
            </nav>
            </div>
            <div className="">
                <Tags/>
            </div>
        </div>
    )
}