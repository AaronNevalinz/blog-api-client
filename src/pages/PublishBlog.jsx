import {useContext, useRef, useState} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import {toast} from "sonner";
import { FaSquarePen } from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import axios from "axios";
import logo from '../../public/logo.png'

export default function PublishBlog(){
    const {token} = useContext(AppContext);
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null);
    const textareaRef = useRef(null);
    const [input, setInput] = useState("");
    const formRef = useRef(null);
    const [topics, setTopics] = useState([])
    const [image, setImage] = useState(null);
    const [post, setPost] = useState({
        title: "",
        content: "",
    })


    const addTag = (e) => {
        if(e.key === "Enter" && input.trim()) {
            e.preventDefault();
            if(topics.length >= 5){
                toast.error("You can only add up to 5 tags");
            }
            if(topics.length < 5 && !topics.includes(input.trim())){
                setTopics([...topics, {name : input.trim()}]);
            }
            setInput("");
        }
    }
    // remove tag
    const removeTag = (index) => {
        setTopics(topics.filter((_, i) => i !== index));
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = ()=>setPreview(reader.result);
        reader.readAsDataURL(file);
    }

    const handleStoryChange = ()=>{
        const el = textareaRef.current;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }


    // form submissions
    const handleSubmit =  async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", image);
        formData.append("post", new Blob([JSON.stringify({...post, topics:topics})], {type: "application/json"}));

        console.log(formData.get("post"));

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        
        axios.post(
            "http://localhost:8080/blog/add-post", formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res)=>{
            toast.success("Post published successfully");
            console.log(res.data);
            navigate("/feed")
        }).catch((error)=>{
            toast.error("Error publishing post");
            console.log(error);
        })
    }
    // handle publish button click
    const handlePublishClick = ()=>{
        if(formRef.current){
            formRef.current.requestSubmit();
        }
    }

    return (
        <div className="">
            <nav className="shadow-md">
                <div className="flex items-center justify-between max-w-4xl mx-auto py-2">
                <Link className={"bg-gradient-to-r font-bold font-montserrat from-blue-900 to-red-500 inline-block text-transparent bg-clip-text text-2xl"} to="/feed">
                    <div className="flex items-center gap-x-3">
                        <img src={logo} alt="" className="w-8" />
                        <span>Reeadsy<span className="italic font-black text-2xl">!</span></span>
                    </div>
                </Link>

                <ul className={"flex gap-x-6 items-center cursor-pointer"}>
                    <li>
                        <button onClick={handlePublishClick} className={"bg-blue-900 cursor-pointer px-4 py-1 rounded-full text-slate-200"}>
                            publish
                        </button>
                    </li>
                    <li>
                        <p>Profile</p>
                    </li>
                    <li className="cursor-pointer">
                        <DropdownMenu className={"w-[200px]"}>
                            <DropdownMenuTrigger>
                                <div className={"w-10 h-10 bg-orange-600 rounded-full cursor-pointer"}></div>
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
                                    <Link to={"/profile"}>
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                </ul>
                </div>
            </nav>

            <div className={"max-w-4xl px-4 md:px-0 mx-auto w-full mt-5 text-center font-poppins"}>
                <h1 className="text-2xl font-bold">CREATE ARTICLE</h1>
            </div>
            <form className={"max-w-4xl px-4 md:px-0 mx-auto w-full mt-5"} ref={formRef} onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setPost({...post, title:e.target.value})}  className="border-none font-bold text-4xl tracking-wider placeholder:font-medium text-food w-full px-2 py-2 text-gray-700 font-poppins outline-none" placeholder="Enter Article title" />
                <div className="flex items-center gap-x-2 my-2"  >
                   
                    <div className={"flex items-center gap-x-2"}>
                        <label className={"border inline-block border-gray-700 p-0.5 rounded-full ml-2 cursor-pointer"}>
                            <div className="flex items-center gap-x-1 px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <p className={"text-sm"}>Add Tags</p>
                            </div>
                        </label>
                    </div>
                    {
                        topics.map((topic, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-1 px-2 py-1 rounded"
                            >
                                {topic.name}
                                <button
                                    onClick={() => removeTag(index)}
                                    className="ml-1 text-blue-500 hover:text-blue-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))
                    }
                    
                    <input type="text" value={input}
                           onChange={(e) => setInput(e.target.value)}
                           onKeyDown={addTag}
                           placeholder={"Add tag"}
                           className={"border bg-slate-100 pl-4 py-1 rounded-md"}  />
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            {/*<TooltipTrigger>*/}
                            <label className={"mt-1 border border-gray-700 p-1 inline-block rounded-full ml-2 cursor-pointer "}>
                                <div className="flex gap-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                    image
                                </div>
                                <input type="file" className={"hidden"} accept={"image/*"} onChange={handleFileChange} />
                            </label>
                            {/*</TooltipTrigger>*/}
                            <TooltipContent>
                                <p>Upload Blog Image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {
                        preview && (
                            <div className={"w-full h-[16rem]"}>
                                <img className={"h-full w-full object-cover"} src={preview} alt=""/>
                            </div>
                        )
                    }
                </div>

                <textarea ref={textareaRef} onChange={(e)=>setPost({...post, content:e.target.value})} onInput={handleStoryChange} rows={"1"} className="border-none text-lg text-food w-full mt-2 px-4 py-2 overflow-hidden resize-none outline-none" placeholder="Tell your Story..." />
            </form>
        </div>
    )
}