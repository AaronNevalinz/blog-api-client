import {Link, useNavigate} from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import {toast} from "sonner";
import vid from '../assets/images/homepage-hero.mp4'

export default function Home() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const [password_confirmation, setPassword_confirmation] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if(formData.username === "" || formData.password === ""){
            toast.error("Please, Enter all required fields.");
        }
        if(formData.password !== password_confirmation){
            toast.error("Password doesn't match.");
        }

        const res = await fetch("http://127.0.0.1:8080/api/auth/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                'Content-Type': 'application/json',
                Accept:'application/json',
            }
        })
        const data = await res.json();
        if(data.ok){
            toast.success("User registered successfully.");
            navigate("/login")
        }else{
            toast.error(data.error);
        }
    }
    return (
        <div className="">
            <nav className="flex justify-between items-center px-4 lg:px-32 py-5 shadow absolute z-20 top-0 w-full">
                <h1>
                    <Link className={"bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-2xl"} to="/feed">Reeadsy</Link>
                </h1>
                <ul className={"flex gap-x-10 items-center "}>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="default" className={"bg-blue-700 hover:bg-blue-500 text-slate-100 px-4 py-2 text-lg font-bold cursor-pointer rounded-lg"}>Get Started</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                                <form action="" onSubmit={handleRegister}>
                                    <DialogHeader >
                                        <DialogTitle className={"text-center text-3xl font-bold"}>Join Reeadsy</DialogTitle>
                                        <DialogDescription className={"text-center"}>
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Username
                                            </Label>
                                            <Input
                                                id="username"
                                                onChange={(e) => {setFormData({...formData, username: e.target.value})}}
                                                placeholder="John Doe"
                                                className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Password
                                            </Label>
                                            <Input id="password"
                                                   onChange={(e) => {setFormData({...formData, password: e.target.value})}}
                                                   type={"password"}
                                                   className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="l">
                                                Confirm Password
                                            </Label>
                                            <Input id="password_confirmation"
                                                   onChange={(e) => setPassword_confirmation(e.target.value)}
                                                   type={"password"}
                                                   className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button className={"cursor-pointer"} type="submit">Register</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        
                    </li>
                </ul>
            </nav>





            <main className={"relative flex flex-col gap-y-5 justify-center w-full h-screen items-center px-5"}>
               <div className="flex flex-col items-center">
                    <h1 className={"md:text-7xl text-5xl font-bold text-center font-montserrat bg-gradient-to-r from-purple-700 to-black text-transparent bg-clip-text mb-4"}>
                        Stories That Think. Ideas That Feel.
                    </h1>
                    <p className={"md:text-xl text-center"}>A place to read, write and deepen your understanding</p>
                    <video width="400" className="shadow mt-4 rounded-lg" >
                        <source src={vid} type="" />
                    </video>
               </div>

            </main>
        </div>
    )
}