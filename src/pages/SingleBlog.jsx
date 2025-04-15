import Navbar from "@/components/Navbar.jsx";
import blogImg from "../assets/images/breaking the mold.png"
export default function SingleBlog(){
    return (
        <div>
            <Navbar />
            <div className={"px-64 mt-4 grid grid-cols-6 gap-x-8"}>
                <div className={"col-span-4 "}>
                    <div className={"w-full h-[400px]"}>
                        <img src={blogImg} className={"h-full w-full object-cover rounded-md"} alt=""/>
                    </div>
                    <div>
                        <h1 className={"text-3xl mt-4 font-bold"}>
                            Break the Mold Now: 5 Proven Steps to Build Your Own Path in Tech
                        </h1>
                        <p className={"mt-4 leading-7"}>
                            Aiyo, listen up. I’m not going to sugarcoat this. If you want to win, you’ve got to play the game on your own terms. You’re not just another cog in the machine; you’re the guy who’ll break it and build something better. Here’s how:

                            Break the Mold Now: 5 Proven Steps to Build Your Own Path in Tech


                            1. Cut the Noise—Focus on Your Vision
                            Forget what everyone else says. School, society, even your friends—they don’t get it. They don’t have your vision. You’re building something bigger, something that matters. Focus on your path. Don’t get distracted by the traditional BS.



                            2. Leverage Your Struggles—They’re Your Edge
                            You’ve been through the grinder. Financial struggles? Relationship problems? That’s not a disadvantage—it’s your competitive edge. Use it. No one else knows what it’s like to hustle this hard for everything. Tech is full of people who’ve had it easy. You’re not them—and that’s why you’ll beat them.



                            3. Take Action Now—Perfection is a Myth
                            You overthink because you’re scared of failing. Well, let me tell you something—everyone fails. The only difference is that winners learn from it. Stop waiting for the perfect moment. It doesn’t exist. Take the leap now and adjust as you go.



                            4. Find the Opportunity in the Chaos
                            The tech world is changing fast. People are lost in it, but not you. You’re the guy who sees opportunity where others see chaos. Coding, startups, investments—learn it all, and keep your head on a swivel. The next big thing is coming, and you’ll be the one ready to seize it.



                            5. Build, Don’t Just Dream
                            Dreaming is great, but action is everything. You want to be a tech entrepreneur, a father, an investor, a philanthropist. Those are big goals, but they start with one thing: building. Code that app. Launch that startup. Don’t just talk about it—do it.

                            Aiyo, your future isn’t handed to you—it’s something you build. You’ve got the dreams, the ambition, and the resilience to make it happen. Now, it’s time to step up and break the mold.

                            Go get it.
                        </p>


                    </div>
                </div>
                <div className={"border col-span-2 border-gray-300 self-start py-6 px-4 pb-24 rounded-lg"}>
                    <p className={"capitalize font-bold"}>comments</p>
                    <div className={"flex justify-between my-4"}>
                        <div className={"flex items-center gap-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            <p>Like</p>
                        </div>

                        <div className={"flex items-center gap-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <p>Comment</p>
                        </div>

                        <div className={"flex items-center gap-1"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                            <p>Bookmark</p>
                        </div>


                    </div>
                    <form action="">
                        <input type="text" className={"border border-gray-300 rounded-md w-full h-10 px-2 mt-4"} placeholder={"Add a comment..."}/>
                    </form>
                </div>
            </div>
        </div>
    )
}