import Navbar from "@/components/Navbar.jsx";
import BlogCard from "@/components/BlogCard.jsx";
import {useContext} from "react";
import {AppContext} from "@/context/AppContext.jsx";

export default function Blogs() {
    const {posts} = useContext(AppContext);

    return (
        <div>
            <Navbar/>
            <main className="px-56 grid grid-cols-5 gap-x-10">
                <div className={"col-span-3"}>
                    {
                        posts && posts.map((post, index) => (
                            <div>
                                <BlogCard key={index} post={post} />
                            </div>
                        ))
                    }
                </div>
                <div className={"col-span-2 border-l"}>
                    <div className={"mt-10 w-[300px] fixed overflow-y-auto top-10 right-72 h-screen max-h-screen"}>
                        <h1 className={"font-bold"}>Recommended Topics</h1>
                        <ul className="flex mt-4 gap-4 flex-wrap">
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                visual design
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                Writing tips
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                Remote work
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                gaming
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                Android Development
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                Data Science
                            </li>
                            <li className={"bg-slate-200 px-3 capitalize rounded-full py-1"}>
                                New Writers Welcome
                            </li>
                        </ul>

                        <div>
                            <h1 className={"my-5 font-bold"}>Recently Bookmarked</h1>
                            <div>
                                <div>
                                    <div className={"text-sm  flex items-center gap-x-2 font-medium text-gray-500"}>
                                        <div className={"w-5 h-5 bg-blue-900 rounded-full"}></div>
                                        <p>Opio Daniel</p>
                                    </div>
                                    <div className={"my-2"}>
                                        <h1 className={"font-bold text-lg leading-4 my-1"}>10 ChatGPT prompts to save you hours of manual work</h1>
                                        <p className={"text-slate-400 text-sm pt-1"}>Jul 30, 2023</p>
                                    </div>
                                </div>

                                <div>
                                    <div className={"text-sm  flex items-center gap-x-2 font-medium text-gray-500"}>
                                        <div className={"w-5 h-5 bg-blue-900 rounded-full"}></div>
                                        <p>Opio Daniel</p>
                                    </div>
                                    <div className={"my-2"}>
                                        <h1 className={"font-bold leading-4 my-1 text-lg"}>10 ChatGPT prompts to save you hours of manual work</h1>
                                        <p className={"text-slate-400 text-sm pt-1"}>Jul 30, 2023</p>
                                    </div>
                                </div>

                                <div>
                                    <div className={"text-sm  flex items-center gap-x-2 font-medium text-gray-500"}>
                                        <div className={"w-5 h-5 bg-blue-900 rounded-full"}></div>
                                        <p>Opio Daniel</p>
                                    </div>
                                    <div className={"my-2"}>
                                        <h1 className={"font-bold leading-4 my-1 text-lg"}>10 ChatGPT prompts to save you hours of manual work</h1>
                                        <p className={"text-slate-400 text-sm pt-1"}>Jul 30, 2023</p>
                                    </div>
                                </div>

                                <div>
                                    <div className={"text-sm  flex items-center gap-x-2 font-medium text-gray-500"}>
                                        <div className={"w-5 h-5 bg-blue-900 rounded-full"}></div>
                                        <p>Opio Daniel</p>
                                    </div>
                                    <div className={"my-2"}>
                                        <h1 className={"font-bold leading-4 my-1 text-lg"}>10 ChatGPT prompts to save you hours of manual work</h1>
                                        <p className={"text-slate-400 text-sm pt-1"}>Jul 30, 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}