import { AppContext } from "@/context/AppContext"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
export default function BlogCard({post}) {
    const { token, user } = useContext(AppContext);
    const [likedPost, setLikedPosts] = useState([]);
    const [likeCount, setLikeCount] = useState(0)
    const [bookMarkedPost, setBookMarkedPost] = useState([])
    const navigate = useNavigate()

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
            const userId = user.id;
            const alreadyLiked = likedPost.includes(userId)

            if(alreadyLiked){
                setLikedPosts(prev => prev.filter(id => id !== userId))
                setLikeCount(prev => prev - 1)
                toast.success("You unliked a post")
            } else {
                setLikeCount(prev => prev + 1)
                setLikedPosts(prev => [...prev, userId])
                toast.success("You liked a post")
            }
        }    
    }
    
    const getPostBookMarks = async ()=>{
        try {
            const res = await fetch(`http://localhost:8080/blog/post/bookmarks/${post.postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
    
            if (data.status) {
                const userIds = data.result.map(bookMark => bookMark.userId)
                setBookMarkedPost(userIds);
            }
        } catch (err) {
            console.error("Failed to fetch likes", err);
        }
    }

    const handleBookMarkPost = async (e)=>{
        e.preventDefault()
        const res = await fetch(`http://localhost:8080/blog/bookmark/${post.postId}`, {
            method:"post",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()
        
        if(data.status){    
            const userId = user.id;        
            const alreadyBookMarked = bookMarkedPost.includes(userId)
            
            if(alreadyBookMarked){
                setBookMarkedPost(prev => prev.filter(id => id !== userId))
                toast.success("you un-bookmarked a post")
            } else{
                setBookMarkedPost(prev => [...prev, userId])
                toast.success("You bookmarked a post")
            }
        }
    }

    const deleteArticle = async (e)=>{
      e.preventDefault()
      const res = await fetch(`http://localhost:8080/blog/delete/${post.postId}`, {
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json()
      if(data.status){
        toast.success("Post Deleted Successfully..")
        navigate(0)
      }

    }
    
    
    
    useEffect(()=>{
      // console.log(user);
        getPostLikes()
        getPostBookMarks()
    }, [bookMarkedPost])


    return (
      <div className="md:grid grid-cols-3 gap-4 items-center border-b mt-8 border-gray-200 pb-6 md:px-0 px-4">
        <div className="col-span-2">
          <Link to={`/profile/${post.username}`}>
            <div className="flex items-center gap-x-2.5 mb-1">
              <div className={" h-6 w-6 rounded-full"}>
                <Avatar>
                  <AvatarImage
                    className={"object-cover rounded-full"}
                    src={post.userImgUrl}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <h1 className={"text-sm font-medium hover:underline"}>
                {post.username}
              </h1>
            </div>
          </Link>
          <Link to={`/article/${post.postId}`}>
            <div>
              <h1
                className={"text-2xl font-bold text-slate-800 font-montserrat"}
              >
                {post.title}
              </h1>
              <p className={"text-gray-500 my-1 font-poppins text-s"}>
                {post.content.substring(0, 100)}...
              </p>
            </div>
          </Link>
          <div
            className={"flex justify-between items-center text-gray-500 pt-1"}
          >
            <div className="flex gap-x-4 items-center text-gray-500 text-sm font-medium">
              <p className="text-black">{formatDistanceToNow(new Date(post.createdAt), {addSuffix:true})}</p>
              <p className={"flex items-start gap-x-2"}>
                <form action="" onSubmit={handleLikePost}>
                  <button className="cursor-pointer" type="submit">
                    {likedPost.includes(user.id) ? (
                      <BiSolidLike size={20} className="fill-blue-600" />
                    ) : (
                      <BiLike size={20} className="fill-black" />
                    )}
                  </button>
                </form>
                <span className="text-black">{likeCount} likes</span>
              </p>
            </div>
            <div className="cursor-pointer flex items-center  gap-x-2">
              {user.username === post.username && (
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-red-600 underline font-medium">Delete</p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <div>
                      <h1 className="text-center text-2xl text-slate-800 font-bold font-montserrat">
                        Delete story
                      </h1>
                      <p className="text-center text-slate-700 py-2">
                        Deletion is not reversible, and the story will be
                        completely deleted.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-x-5">
                      <p>Cancel</p>
                      <form action="" onSubmit={deleteArticle}>
                        <Button
                          className={
                            "bg-red-700 hover:bg-red-800 cursor-pointer"
                          }
                        >
                          Delete
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <form action="" onSubmit={handleBookMarkPost}>
                <button
                  className="cursor-pointer flex text-sm items-center text-black"
                  type="submit"
                >
                  {bookMarkedPost.includes(user.id) ? (
                    <div>
                      <MdOutlineBookmark size={25} className="fill-blue-600" />
                    </div>
                  ) : (
                    <MdOutlineBookmarkAdd size={25} className="fill-black" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <Link to={`/article/${post.postId}`} className={"h-36 col-span-1"}>
          <img
            className={"h-full w-full object-cover md:rounded-lg"}
            src={post.postImg}
            alt=""
          />
        </Link>
      </div>
    );
}