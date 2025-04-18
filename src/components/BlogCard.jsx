import { Link } from "react-router-dom"

export default function BlogCard({post}) {
    return (
        <div className="grid grid-cols-3 gap-4 items-center border-b mt-8 border-gray-200 pb-6">
            <div className="col-span-2">
                <Link to={`/article/${post.postId}`}>
                    <div className="flex items-center gap-x-2 mb-1">
                        <div className={"bg-orange-600 h-5 w-5 rounded-full"}></div>
                        <h1 className={"text-xs font-medium text-gray-500"}>{post.username}</h1>
                    </div>
                    <div>
                        <h1 className={"text-xl font-medium font-poppins"}>{post.title}</h1>
                        <p className={"text-gray-500 my-1 font-poppins text-sm"}>
                            {post.content.substring(0, 100)}...
                        </p>                    
                     </div>
                </Link >
                <div className={"flex justify-between items-center text-gray-500 pt-1"}>
                    <div className="flex gap-x-4 items-center text-gray-500 text-sm font-medium">
                        <p>Mar 29</p>
                        <p className={"flex items-center"}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                </span>
                            <span>
                                        {post.likeCount} likes
                                    </span>
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </div>
            </div>


            <div className={"h-32 col-span-1"}>
                <img className={"h-full w-full object-cover rounded-lg"} src={post.postImg} alt=""/>
            </div>
        </div>
    )
}