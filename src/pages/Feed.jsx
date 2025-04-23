import Navbar from "@/components/Navbar.jsx";
import BlogCard from "@/components/BlogCard.jsx";
import {useContext, useEffect} from "react";
import {AppContext} from "@/context/AppContext.jsx";
import { Skeleton } from "@/components/ui/skeleton";

export default function Feed() {
    const {posts, getUserProfile, getPosts} = useContext(AppContext);

    useEffect(()=>{
        getPosts()
        getUserProfile()
    }, [])

    return (
        <div className="">
            <Navbar/>

            <main className="max-w-2xl mx-auto pt-[63px]">
                

                <div className="pt-12">
                    {
                        posts.length > 0 ? posts.map((post, index) => (
                            <div>
                                <BlogCard key={index} post={post} />
                            </div>
                        )) : (
                            [1,2,3].map((key)=>(
                                <div key={key} className="grid grid-cols-3 gap-4 items-center border-b mt-8 border-gray-200 pb-6">
                                <div className="col-span-2">
                                    <div className="flex items-center gap-x-2 mb-1">
                                        <Skeleton className="h-5 w-5 rounded-full bg-slate-300" />
                                        <Skeleton className="h-4 w-24 bg-slate-300" />
                                    </div>
                                    <Skeleton className="h-6 w-3/4 mb-2 bg-slate-300" />
                                    <Skeleton className="h-4 w-full mb-2 bg-slate-300" />
                                    <Skeleton className="h-4 w-5/6 mb-4 bg-slate-300" />
                                    <div className="flex justify-between items-center text-gray-500 pt-1">
                                        <div className="flex gap-x-4 items-center text-sm font-medium">
                                            <Skeleton className="h-4 w-12 bg-slate-300" />
                                            <div className="flex items-center gap-x-1">
                                                <Skeleton className="h-5 w-5 bg-slate-300" />
                                                <Skeleton className="h-4 w-16 bg-slate-300" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-6 w-6 bg-slate-300" />
                                    </div>
                                </div>

                                <div className="h-32 col-span-1">
                                    <Skeleton className="h-full w-full rounded-lg bg-slate-300" />
                                </div>
                            </div>
                            ))
                        )
                    }
                </div>
            </main>
        </div>
    )
}