import Navbar from "@/components/Navbar.jsx";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBookmark, FaRegComment } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";

export default function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const { user, token, loggedUserProfile } = useContext(AppContext);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [likedPost, setLikedPosts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [bookMarkedPost, setBookMarkedPost] = useState([]);

  const getPostLikes = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blog/post/likes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.status) {
        const userIds = data.result.map((like) => like.userId);
        setLikedPosts(userIds);
      }
      setLikeCount(data.result.length);
    } catch (err) {
      console.error("Failed to fetch likes", err);
    }
  };

  const handleLikePost = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/blog/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.status) {
      const userId = user.id;
      const alreadyLiked = likedPost.includes(userId);

      if (alreadyLiked) {
        setLikedPosts((prev) => prev.filter((id) => id !== userId));
        setLikeCount((prev) => prev - 1);
        toast.success("You unliked a post");
      } else {
        setLikeCount((prev) => prev + 1);
        setLikedPosts((prev) => [...prev, userId]);
        toast.success("You liked a post");
      }
    }
  };
  const getPostBookMarks = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/blog/post/bookmarks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      if (data.status) {
        const userIds = data.result.map((bookMark) => bookMark.userId);
        setBookMarkedPost(userIds);
      }
    } catch (err) {
      console.error("Failed to fetch likes", err);
    }
  };

  const handleBookMarkPost = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/blog/bookmark/${id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.status) {
      const userId = user.id;
      const alreadyBookMarked = bookMarkedPost.includes(userId);

      if (alreadyBookMarked) {
        setBookMarkedPost((prev) => prev.filter((id) => id !== userId));
        toast.success("you unbookmarked a post");
      } else {
        setBookMarkedPost((prev) => [...prev, userId]);
        toast.success("You bookmarked a post");
      }
    }
  };

  const getPost = async () => {
    const res = await fetch(`http://localhost:8080/blog/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setArticle(data.result);
    } else {
      console.log("Lil summm happened");
    }
  };

  const getPostComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/blog/post/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (data.status) {
        setPostComments(data.comments);
      }
    } catch (err) {
      console.log("Error, ", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/blog/add-comment/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => {
        const data = res.json();
        if (data.status) {
          setPostComments((prev) => [data.comment, ...prev]);
          setComment({ comment: "" });
          toast.success("Comment added successfully");
        }
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setRefetch((prev) => prev + 1);
      });
  };

  useEffect(() => {
    getPostLikes();
    getPost();
    getPostComments();
    getPostBookMarks();
  }, [refetch, bookMarkedPost]);

  useEffect(() => {}, [postComments]);

  return (
    <div className="">
      <Navbar />
      <div className={"max-w-4xl px-6 lg:px-0 mx-auto pt-[120px]"}>
        <div className={"mt-4"}>
          <Link
            to={"/feed"}
            className="text-blue-600 underline font-medium text-sm flex gap-x-2 items-center hover:text-blue-800"
          >
            <FaLongArrowAltLeft />
            Go back to all posts
          </Link>
          <h1
            className={"text-3xl my-4 font-bold font-montserrat text-slate-800"}
          >
            {article && article.title}
          </h1>
          <div className={"w-full h-[300px]"}>
            {article ? (
              <img
                src={article.imgUrl}
                className={"h-full w-full object-cover"}
                alt="post image"
              />
            ) : (
              <Skeleton className={"w-full h-[300px]"} />
            )}
          </div>
          <Separator className={"my-4 bg-gray-300"} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Avatar>
                <AvatarImage src={article.userImgUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-sm font-bold font-montserrat">
                  {article.displayName}
                </h1>
              </div>
            </div>
            <div className="flex gap-x-4 text-sm items-center">
              <span className="flex items-center gap-x-1">
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
              </span>
              <span>
                <Sheet>
                  <SheetTrigger className="flex items-center gap-x-1 cursor-pointer">
                    <FaRegComment size={24} />
                    <span>{article ? article.commentsCount : ""} comments</span>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>Responses</SheetHeader>
                    <SheetDescription className={"px-4 h-full overflow-y-auto"}>
                      <div>
                        <div className="flex items-center gap-x-2">
                          <Avatar>
                            <AvatarImage
                              src={
                                loggedUserProfile && loggedUserProfile.imgUrl
                              }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h1 className="text-sm font-bold font-montserrat flex flex-col">
                              <span>{loggedUserProfile.displayName}</span>
                              <span className="text-blue-500 text-xs font-normal -mt-1">
                                @{user && user.username}
                              </span>
                            </h1>
                          </div>
                        </div>

                        <form
                          action=""
                          onSubmit={handleCommentSubmit}
                          className="my-8"
                        >
                          <Textarea
                            placeholder="What are your thoughts"
                            onChange={(e) =>
                              setComment({ comment: e.target.value })
                            }
                          />
                          <Button className="mt-2 cursor-pointer">
                            Comment
                          </Button>
                        </form>

                        <div className="flex flex-col gap-y-4 ">
                          {postComments.map((postComment, index) => (
                            <div key={index}>
                              <div className="flex items-center gap-x-2">
                                <Avatar>
                                  <AvatarImage src={postComment.imgUrl} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h1 className="text-xs font-bold font-poppins">
                                    {postComment ? postComment.username : ""}
                                  </h1>
                                  <p className="text-xs">3 hours ago</p>
                                </div>
                              </div>
                              <p className="p-2">{postComment.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetContent>
                </Sheet>
              </span>
              <span>
                <form action="" onSubmit={handleBookMarkPost}>
                  <button
                    className="cursor-pointer flex text-sm items-center text-black"
                    type="submit"
                  >
                    {bookMarkedPost.includes(user.id) ? (
                      <div>
                        <MdOutlineBookmark
                          size={25}
                          className="fill-blue-600"
                        />
                      </div>
                    ) : (
                      <MdOutlineBookmarkAdd size={25} className="fill-black" />
                    )}
                  </button>
                </form>
              </span>
            </div>
          </div>
          <Separator className={"my-4 bg-gray-300"} />
          <div className="p-4">
            <p className={"mt-4 leading-8 text-lg"}>
              {article && article.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
