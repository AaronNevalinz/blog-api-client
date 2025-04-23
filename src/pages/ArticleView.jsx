import Navbar from "@/components/Navbar.jsx";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiHandsClapping } from "react-icons/pi";
import { FaBookmark, FaRegComment } from "react-icons/fa";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ArticleView(){
    const {id} = useParams()
    const [article, setArticle] = useState({});
    const [postComments, setPostComments] = useState([])
    const [refetch, setRefetch] = useState(0);
    const {user, token} = useContext(AppContext)
    const [comment, setComment] = useState({
        comment:""
    });

    const getPost = async ()=>{
        const res = await fetch(`http://localhost:8080/blog/post/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`, 
                
            }
        })

        const data = await res.json()

        if(res.ok){
            setArticle(data.result);           

        } else{
            console.log("Lil summm happened");
            
        }
    }

    const getPostComments = async ()=>{
        try{
            const res = await fetch(`http://localhost:8080/blog/post/comments/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await res.json();

            if(data.status){
                setPostComments(data.comments);
            }

        }catch(err){
            console.log("Error, ", err);  
        }
    }

    const handleCommentSubmit = async (e)=>{
        e.preventDefault()

        await fetch(`http://localhost:8080/blog/add-comment/${id}`, {
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(comment)

        }).then((res) => {
            const data = res.json()
            if(data.status){
                setPostComments(prev => [data.comment, ...prev])
                setComment({comment:""})
                toast.success("Comment added successfully")
            }
        }).catch((e) => {
            toast.error(e.message);
           }).finally(() => {
            setRefetch((prev) => prev + 1)
           })
    
    }


    useEffect(()=>{
        getPost()
        getPostComments()
    }, [refetch])

    useEffect(()=>{
        
    }, [postComments])
    
    return (
        <div className="">
            <Navbar />
            <div className={"max-w-2xl mx-auto pt-[110px]"}>
                <div className={"col-span-4 "}>
                    <h1 className={"text-3xl my-4 font-bold font-montserrat text-slate-800"}>
                        {article && (article.title)}
                    </h1>
                    <div className={"w-full h-[300px]"}>
                        {
                            article 
                            ? 
                            <img src={article.imgUrl} className={"h-full w-full object-cover"} alt="post image"/> :
                            <Skeleton className={"w-full h-[300px]"}/>
                        }
                    </div>
                    <Separator className={"my-4 bg-gray-300"}/>
                       <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-sm font-bold font-montserrat">Aaron Nevalinz</h1>
                                    <p className="text-xs font-black">Full Stack developer | Tech Enthusiast | Developer Advocate</p>
                                </div>
                            </div>
                            <div className="flex gap-x-4 text-sm items-center">
                                <span className="flex items-center gap-x-1">
                                    <PiHandsClapping size={26} className="cursor-pointer"/>
                                    <span className="cursor-pointer">{article ? article.likesCount:""} Like(s)</span>
                                </span>
                                <span >
                                    <Sheet>
                                        <SheetTrigger className="flex items-center gap-x-1 cursor-pointer">
                                            <FaRegComment size={24} />
                                            <span>{article ? article.commentsCount:""} comments</span>
                                        </SheetTrigger>
                                        <SheetContent>
                                           <SheetHeader>Responses</SheetHeader>
                                             <SheetDescription className={"px-4 h-full overflow-y-auto"}>
                                               <div>
                                                    <div className="flex items-center gap-x-2">
                                                        <Avatar>
                                                            <AvatarImage src="https://github.com/shadcn.png" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <h1 className="text-sm font-bold font-montserrat">{user && user.username}</h1>
                                                        </div>
                                                    </div>

                                                    <form action="" onSubmit={handleCommentSubmit} className="my-8">
                                                        <Textarea placeholder="What are your thoughts" onChange={(e) => setComment({ comment:e.target.value})} />
                                                        <Button className="mt-2 cursor-pointer">Comment</Button>
                                                    </form>

                                                    <div className="flex flex-col gap-y-4 ">
                                                        {
                                                            postComments.map((postComment, index)=>(
                                                                <div key={index}>
                                                            <div className="flex items-center gap-x-2">
                                                                <Avatar>
                                                                    <AvatarImage src={postComment.imgUrl} />
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h1 className="text-xs font-bold font-poppins">{postComment?postComment.username:""}</h1>
                                                                    <p className="text-xs">3 hours ago</p>
                                                                </div>
                                                            </div>
                                                            <p className="p-2">
                                                                {postComment.comment}
                                                            </p>
                                                        </div>
                                                            ))
                                                        }                                                      
                                                        
                                                    </div>
                                               </div>
                                            </SheetDescription>
                                        </SheetContent>
                                    </Sheet>
                                    
                                </span>
                            </div>
                            <span>
                                <FaBookmark size={26} className="cursor-pointer"/>
                            </span>
                       </div>
                    <Separator className={"my-4 bg-gray-300"}/>
                    <div className="p-4">
                        
                        <p className={"mt-4 leading-8 text-lg"}>
                            {article && article.content}
                        </p>


                    </div>
                </div>
                
            </div>
        </div>
    )
}