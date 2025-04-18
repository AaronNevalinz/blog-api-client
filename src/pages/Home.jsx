import {Link} from "react-router-dom";
import vid from '../assets/images/homepage-hero.mp4'
import logo from '../../public/logo.png'

export default function Home() {
   
    return (
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-purple-500">
           <div className="pt-5 max-w-7xl mx-auto">
           <nav className=" bg-white mx-4 md:mx-0 py-2 px-4 rounded-lg">
                <div className="flex justify-between">
                <h1>
                    <Link className={"bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-xl"} to="/feed">
                        <div className="flex items-center gap-x-2">
                            <img src={logo} alt="" className="w-8" />
                            <span>Reeadsy<span className="italic font-black text-2xl">!</span></span>
                        </div>
                    </Link>
                </h1>
                <ul className={"flex gap-x-5 items-center "}>
                    <li>
                        <Link to="/login" className="border text-black px-4 py-2 rounded-md font-poppins">Sign in</Link>
                    </li>
                    <li>
                        <Link to={'/register'} className="bg-gradient-to-r text-white px-4 py-2 rounded-md font-poppins from-blue-900 to-red-500">Get Started</Link>
                    </li>
                </ul>
                </div>
            </nav>
           </div>





            <main className={"relative flex flex-col gap-y-5 justify-center max-w-4xl mx-auto h-screen items-center px-5"}>
               <div className="flex flex-col items-center">
                    <h1 className={"md:text-7xl text-5xl font-bold text-center font-montserrat text-white mb-4"}>
                        Stories That Think. Ideas That Feel.
                    </h1>
                    <p className={"md:text-xl text-center text-slate-200"}>A place to read, write and deepen your understanding</p>
                    <video width="400" className="shadow mt-4 rounded-lg" >
                        <source src={vid} type="" />
                    </video>
               </div>

            </main>
        </div>
    )
}