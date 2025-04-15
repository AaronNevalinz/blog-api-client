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
        <div className="bg-gray-200">
            <nav className="flex justify-between items-center px-5 py-5 bg-white shadow absolute z-20 top-0 w-full">
                <h1>
                    <Link className={"text-3xl font-black leading-7"} to="/">Reeadsy</Link>
                </h1>
                <ul className={"flex gap-x-10 items-center "}>
                    <li>
                        <Link to="/">Our Story</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Our Story</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Membership</Link>
                    </li>
                    <li>
                        <Link to="/">Write</Link>
                    </li>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="default" className={"bg-black text-slate-200 px-4 py-2 text-lg font-bold cursor-pointer rounded-lg"}>Get Started</Button>
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







            <main className={"relative flex flex-col gap-y-5 justify-center w-full h-screen items-center"}>
                <h1 className={"text-9xl text-center"}>Human Stories and <br/> Ideas</h1>
                <p className={"text-2xl"}>A place to read, write and deepen your understanding</p>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" className={"bg-black text-slate-200 px-4 py-2 text-lg font-bold cursor-pointer rounded-lg"}>Start Reading</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>You need to sign up</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" placeholder="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" type={"password"} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Register</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </main>
        </div>
    )
}