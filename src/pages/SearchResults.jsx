import BlogCard from '@/components/BlogCard'
import Navbar from '@/components/Navbar'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SearchResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get("q")
  const {token} = useContext(AppContext)
  const [matchedUsers, setMatchedUsers] = useState([])
  const [matchedPosts, setMatchedPosts] = useState([])

  const searchUsers = async () => {
    const res = await fetch(`http://localhost:8080/search?searchTerm=${query}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    if(data.status){
      setMatchedUsers(data.result)
      
    }
  }
  const searchArticles = async ()=>{
    const res = await fetch(`http://localhost:8080/blog/search?searchTerm=${query}`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const data = await res.json()
    if(data.status){
      setMatchedPosts(data.result)
    }
  }
  useEffect(()=>{
      searchUsers()
      searchArticles()
  }, [query])

  return (
   <div>
           <Navbar/>
           <main className='max-w-3xl mx-auto pt-[120px]'>
            
   
           <Tabs defaultValue="stories" className="mt-4">
                <h1 className='font-montserrat text-3xl font-bold my-4 text-slate-600'>Results of <span className='text-black'>{query}</span> </h1>
               <TabsList className="grid w-full grid-cols-3 bg-slate-300">
                   <TabsTrigger value="stories" className={"cursor-pointer"}>Stories</TabsTrigger>
                   <TabsTrigger value="people" className={"cursor-pointer"} >Users</TabsTrigger>
                   <TabsTrigger value="tags" className={"cursor-pointer"}>Tags</TabsTrigger>
               </TabsList>
               <TabsContent value="stories" className={" "}>

               {
                    matchedPosts.length > 0 ? matchedPosts.map((post, index) => (
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
                    )))
                }
                   
               </TabsContent>
               <TabsContent value="people" className={" mt-2"}>
                  <div className='space-y-8'>
                  {
                    matchedUsers.map((user, index)=>(
                      <div key={index} className='grid grid-cols-8 items-center justify-between gap-x-10'>
                    <div className='w-16 h-16 rounded-full col-span-1 bg-amber-700'>
                      <img src={user.imgUrl} alt="" className='object-cover w-full h-full rounded-full'/>
                    </div>
                    <div className='col-span-5'>
                      <Link to={`/profile/${user.username}`}>
                        <h1 className='font-bold'>{user.displayName}</h1>
                        <p className='-my-1 text-sm lowercase underline text-blue-600'>@{user.username}</p>
                      </Link>
                      <p className='text-slate-500 text-sm'>
                        {user.bio}
                      </p>
                    </div>
                    <div className='col-span-2 '>
                      <Link to={`/profile/${user.username}`} className='bg-blue-900 inline-block text-slate-200 px-4 rounded-full'>
                        View Profile
                      </Link>
                    </div>
                   </div>
                    ))
                   }
                  </div>
                   
               </TabsContent>
               <TabsContent value="tags">
                   
               </TabsContent>
           </Tabs>
           </main>
       </div>
  )
}
