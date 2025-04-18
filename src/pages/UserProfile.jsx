import Navbar from '@/components/Navbar'
import React, { useContext, useEffect } from 'react'
import userLogo from '../../public/user.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AppContext } from '@/context/AppContext'
import BlogCard from '@/components/BlogCard'
import { Textarea } from '@/components/ui/textarea'

export default function UserProfile() {
    const {user, loggedInUserPosts, getUserPosts} = useContext(AppContext)
    useEffect(()=>{
        getUserPosts()
    }, [])
  return (
    <div>
        <Navbar/>
        <main className='max-w-3xl mx-auto pt-[120px]'>
            <div className="flex flex-col items-center">
                <img src={userLogo} className='w-32' alt="" />
                <h1 className='text-3xl font-montserrat text-center font-bold'>{user ? user.username : <p>Aaron Dinin, PhD</p>}</h1>
                <p className='max-w-lg text-center'>
                    I teach entrepreneurship at Duke. Software Engineer. PhD in English. I write about the mistakes entrepreneurs make since I’ve made plenty. More @ aarondinin.com
                </p>
            </div>

        <Tabs defaultValue="account" className="mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-300">
                <TabsTrigger value="stories" className={"cursor-pointer"}>Your Stories</TabsTrigger>
                <TabsTrigger value="account" className={"cursor-pointer"}>Your Bookmarks</TabsTrigger>
                <TabsTrigger value="password" className={"cursor-pointer"}>About</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className={" "}>
                {
                    loggedInUserPosts.length > 0 ? loggedInUserPosts.map((post, index) => (
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
            <TabsContent value="password" className={" mt-2"}>
                <div className=''>
                    <h1 className='text-xl font-bold'>Edit Profile</h1>
                    <form className='border border-gray-300 p-8 rounded-lg  space-y-2'>
                        <div className='w-16 h-16  bg-green-600 rounded-full'></div>
                        <Input type={"text"} className={"w-full"} placeholder="Display Name"/>
                        <Textarea type={"text"} placeholder="Bio"/>
                        <Button>Update Profile</Button>
                    </form>
                </div>
                <div className='my-5 space-y-4'>
                    <div>
                        <h1 className='font-bold text-xl'>Change Password</h1>
                    </div>
                    <div className='border border-gray-300 rounded-lg p-8'>
                        <div>
                            <h1 className='font-bold text-sm'>Password</h1>
                            <p className='text-slate-400 text-sm'>Change your password here. After saving, you'll be logged out.</p>
                        </div>
                        <form action="" className='mt-2 space-y-2'>
                            <Input id="current" type="password" placeholder="Current Password"/>
                            <Input id="new" type="password" placeholder="New Password"/>
                            <Button>Update password</Button>
                        </form>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="stories">
                <div className='text-center mt-8'>
                    <p>Work and get some stories homie</p>
                </div>
            </TabsContent>
        </Tabs>
        </main>
    </div>
  )
}
