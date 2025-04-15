// import {useState, useRef, useContext} from "react";
// import {Link} from "react-router-dom";
// import {
//     DropdownMenu,
//     DropdownMenuContent, DropdownMenuItem,
//     DropdownMenuLabel, DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu.jsx";
// import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
// import {toast} from "sonner";
// import {AppContext} from "@/context/AppContext.jsx";
//
// export default function WriteBlog() {
//
//     const {token, user} = useContext(AppContext);
//
//     const [preview, setPreview] = useState(null);
//     const textareaRef = useRef(null);
//     const [input, setInput] = useState("");
//     const formRef = useRef(null);
//     const [image, setImage] = useState(null);
//     const [post, setPost] = useState({
//         title: "",
//         content: "",
//         topics: [],
//     })
//
//
//     const addTag = (e) => {
//         if(e.key === "Enter" && input.trim()) {
//             e.preventDefault();
//             if(topics.length >= 5){
//                 toast.error("You can only add up to 5 tags");
//             }
//             if(topics.length < 5 && !topics.includes(input.trim())){
//                 setTopics([...topics, {name : input.trim()}]);
//             }
//             setInput("");
//         }
//     }
//     const removeTag = (index) => {
//         setTopics(topics.filter((_, i) => i !== index));
//     }
//
//     const handleFileChange = (e)=>{
//         const file = e.target.files[0];
//         if (!file) return;
//         setImage(file);
//
//         const reader = new FileReader();
//         reader.onloadend = ()=>setPreview(reader.result);
//         reader.readAsDataURL(file);
//     }
//
//     const handleStoryChange = ()=>{
//         const el = textareaRef.current;
//         el.style.height = "auto";
//         el.style.height = `${el.scrollHeight}px`;
//     }
//
//
//     // form submissions
//     const handleSubmit =  async (e)=>{
//
//
//
//
//     }
//     // handle publish button click
//     const handlePublishClick = ()=>{
//         if(formRef.current){
//             formRef.current.requestSubmit();
//         }
//     }
//     return (
//         <div>
//             <nav className="flex items-center justify-between shadow px-36 py-1">
//                 <Link to={"/"}>
//                     <h1 className={"text-xl text-slate-800 font-bold uppercase leading-7"}>Reeadsy</h1>
//                 </Link>
//
//                 <ul className={"flex gap-x-8 items-center "}>
//                     <li>
//                         <button onClick={handlePublishClick} className={"bg-blue-900 px-4 py-1 rounded-full text-slate-200"}>
//                             publish
//                         </button>
//                     </li>
//                     <li>
//                         <Link to={"/write"} className={"flex gap-x-2"}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                             </svg>
//                             <span>Write</span>
//                         </Link>
//                     </li>
//                     <li>
//
//
//                         <DropdownMenu className={"w-[200px]"}>
//                             <DropdownMenuTrigger>
//                                 <div className={"w-10 h-10 bg-orange-600 rounded-full"}></div>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem>
//                                     <Link to={"/profile"}>
//                                         Profile
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem>
//                                     <Link to={"/profile"}>
//                                         Stories
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem>
//                                     <Link to={"/profile"}>
//                                         Settings
//                                     </Link>
//                                 </DropdownMenuItem>
//                                 <DropdownMenuItem>
//                                     <Link to={"/profile"}>
//                                         Logout
//                                     </Link>
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </li>
//                 </ul>
//             </nav>
//
//             {token}
//             <p>{user.username}</p>
//
//             <form className={"lg:px-96 sm:px-56 mt-5"} ref={formRef} onSubmit={handleSubmit}>
//                 <input type="text" onChange={(e)=>setPost({...post, title:e.target.value})}  className="border-none font-medium text-4xl tracking-wider text-food w-full px-4 py-2 outline-none" placeholder="Title" />
//                 <div className="flex items-center gap-x-2 my-2"  >
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger>
//                                 <div className={"flex items-center gap-x-2"}>
//                                     <label className={"border inline-block border-gray-700 p-0.5 rounded-full ml-4 cursor-pointer"}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                                         </svg>
//                                     </label>
//                                 </div>
//                             </TooltipTrigger>
//                             <TooltipContent>
//                                 <p>Add or change topics (up to 5) so readers know what your story is about</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                     {
//                         topics.map((topic, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-1 px-2 py-1 rounded"
//                             >
//                                 {topic.name}
//                                 <button
//                                     onClick={() => removeTag(index)}
//                                     className="ml-1 text-blue-500 hover:text-blue-700"
//                                 >
//                                     &times;
//                                 </button>
//                             </div>
//                         ))
//                     }
//                     <p className={"text-sm"}>Add Tags</p>
//                     <input type="text" value={input}
//                            onChange={(e) => setInput(e.target.value)}
//                            onKeyDown={addTag}
//                            placeholder={"Add tag"}
//                            className={"border bg-slate-100 pl-4 py-1 rounded-md"}  />
//                 </div>
//                 <div>
//                     <TooltipProvider>
//                         <Tooltip>
//                             {/*<TooltipTrigger>*/}
//                                 <label className={"mt-1 border inline-block border-gray-700 p-1 rounded-full ml-4 cursor-pointer"}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
//                                     </svg>
//                                     <input type="file" className={"hidden"} accept={"image/*"} onChange={handleFileChange} />
//                                 </label>
//                             {/*</TooltipTrigger>*/}
//                             <TooltipContent>
//                                 <p>Upload Blog Image</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                     {
//                         preview && (
//                             <div className={"w-full h-[16rem]"}>
//                                 <img className={"h-full w-full object-cover"} src={preview} alt=""/>
//                             </div>
//                         )
//                     }
//                 </div>
//
//                 <textarea ref={textareaRef} onChange={(e)=>setContent(e.target.value)} onInput={handleStoryChange} rows={"1"} className="border-none text-lg text-food w-full mt-2 px-4 py-2 overflow-hidden resize-none outline-none" placeholder="Tell your Story..." />
//             </form>
//         </div>
//     )
// }