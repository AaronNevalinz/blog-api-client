import { AppContext } from "@/context/AppContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { toast } from "sonner";
export default function BlogCard({post}) {
    const {token, loggedUserProfile} = useContext(AppContext)
    const [likedPost, setLikedPosts] = useState([]);
    const [likeCount, setLikeCount] = useState(0)


    const getPostLikes = async () => {
        try {
            const res = await fetch(`http://localhost:8080/blog/post/likes/${post.postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
    
            if (data.status) {
                const userIds = data.result.map(like => like.userId)
                setLikedPosts(userIds);
            }
            setLikeCount(data.result.length)
        } catch (err) {
            console.error("Failed to fetch likes", err);
        }
    }

    const handleLikePost = async (e)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:8080/blog/like/${post.postId}`, {
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        if(data.status){
            const userId = loggedUserProfile.userId;
            const alreadyLiked = likedPost.includes(userId)

            if(alreadyLiked){
                setLikedPosts(prev => prev.filter(id => id !== userId))
                setLikeCount(prev => prev -1)
                toast.success("You unliked a post")
            } else {
                setLikeCount(prev => prev + 1)
                setLikedPosts(prev => [...prev, userId])
                toast.success("You liked a post")
            }
        }    
    }
    
    useEffect(()=>{
        getPostLikes()
    }, [])


    return (
        <div className="grid grid-cols-3 gap-4 items-center border-b mt-8 border-gray-200 pb-6">
            <div className="col-span-2">
                
                    <Link to={`/profile/${post.username}`}>
                        <div className="flex items-center gap-x-2.5 mb-1">
                            <div className={" h-6 w-6 rounded-full"}>
                                <Avatar>
                                    <AvatarImage className={"object-cover rounded-full"} src={post.userImgUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <h1 className={"text-sm font-medium hover:underline"}>{post.username}</h1>
                        </div>
                    </Link>
                    <Link to={`/article/${post.postId}`}>
                        <div>
                            <h1 className={"text-xl font-medium font-poppins"}>{post.title}</h1>
                            <p className={"text-gray-500 my-1 font-poppins text-sm"}>
                                {post.content.substring(0, 100)}...
                            </p>                    
                        </div>
                    </Link >
                <div className={"flex justify-between items-center text-gray-500 pt-1"}>
                    <div className="flex gap-x-4 items-center text-gray-500 text-sm font-medium">
                        <p className="text-black">Mar 29</p>
                        <p className={"flex items-start gap-x-2"}>
                            <form action="" onSubmit={handleLikePost}>
                                <button className="cursor-pointer" type="submit">
                                   {likedPost.includes(loggedUserProfile.userId)  ? <BiSolidLike size={20} className="fill-blue-600"/>  :  <BiLike size={20} className="fill-black"/>}
                                </button>
                            </form>
                            <span className="text-black">
                                {likeCount} likes
                            </span>
                        </p>
                    </div>
                    <div className="cursor-pointer">
                        <MdOutlineBookmarkAdd size={25} className="fill-black"/>
                        <MdOutlineBookmark size={25} className="fill-black" />
                    </div>
                </div>
            </div>

        

            <Link to={`/article/${post.postId}`} className={"h-32 col-span-1"}>
                <img className={"h-full w-full object-cover rounded-lg"} src={post.postImg} alt=""/>
            </Link>
        </div>
    )
}