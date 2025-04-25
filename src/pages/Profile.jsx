import Navbar from '@/components/Navbar'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userLogo from '../../public/user.jpg'
import BlogCard from '@/components/BlogCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppContext } from '@/context/AppContext'

export default function Profile() {
    const {username} = useParams()
    const {token} = useContext(AppContext)
    const [profile, setProfile] =  useState(null)
    const [posts, setPosts] = useState([])
    const getProfile = async ()=>{
        const res = await fetch(`http://localhost:8080/profile/get-user/profile/${username}`, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data = await res.json()
        setProfile(data.result);             
    }

    const getUserPosts = async()=>{
        const res = await fetch(`http://localhost:8080/blog/posts/user/${username}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data = await res.json()
        setPosts(data.result)
    }


    useEffect(()=>{
        getProfile()
        getUserPosts()
    }, [])
  return (
      <div>
          <Navbar/>
          <main className='max-w-4xl mx-auto pt-[120px]'>
              <div className="flex flex-col items-center my-8">
                 {profile?<div className='w-24 h-24'>
                    <img src={profile.imgUrl} className='rounded-full object-cover w-full h-full' alt="" />
                 </div>:<img src={userLogo} className='w-32' alt="" />}
                          
                 
                  <h1 className='text-3xl font-montserrat text-center font-bold'>
                      {username}
                  </h1>
                  <p className='text-sm underline text-blue-700 font-bold -my-1'><span>@{username}</span></p>
                  <p className='max-w-lg text-center'>
                      {profile && profile.bio}
                  </p>
              </div>
  
          <Tabs defaultValue="stories" className="mt-4">
              <TabsList className="grid w-full grid-cols-2 bg-slate-300">
                  <TabsTrigger value="stories" className={"cursor-pointer"}>BookMarks</TabsTrigger>
                  <TabsTrigger value="account" className={"cursor-pointer"}>Stories</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className={" "}>
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
                      )))
                  }
              </TabsContent>
              <TabsContent value="stories">
                  <div className='text-center mt-8'>
                      <p>You don't have any bookmarked stories</p>
                  </div>
              </TabsContent>
          </Tabs>
          </main>
      </div>
    )
}
