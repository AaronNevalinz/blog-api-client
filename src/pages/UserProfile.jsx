import Navbar from '@/components/Navbar'
import React, { useContext, useEffect, useState } from 'react'
import userLogo from '../../public/user.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AppContext } from '@/context/AppContext'
import BlogCard from '@/components/BlogCard'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {
    const {token, loggedInUserPosts, user, loggedUserProfile, getUserProfile, getUserPosts} = useContext(AppContext)
    const [profile, setProfile] = useState({
        bio:"",
        displayName:""
    })
    const [preview, setPreview] = useState(null);
    const [profileImage, setProfileImage] = useState(null)
    const [bookmarks, setBookMarks] = useState([])
    const navigate = useNavigate()

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        setProfileImage(file);

        const reader = new FileReader();
        reader.onloadend = ()=>setPreview(reader.result);
        reader.readAsDataURL(file);
    }

    const handleSetProfile = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', profileImage)
        formData.append('profile', new Blob ([JSON.stringify(profile)], {type: "application/json"}))
        axios.post("http://localhost:8080/profile/set-profile", formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                toast.success("Profile updated successfully");
                console.log(res.data);
                navigate(0)
            }).catch((error)=>{
                toast.error("Error updating profile");
                console.log(error);
            })
    }
    
     const handleEditProfile = async (e) => {
       e.preventDefault();
       const formData = new FormData();
       formData.append("file", profileImage);
       formData.append(
         "profile",
         new Blob([JSON.stringify(profile)], { type: "application/json" })
       );
       axios
         .put(
           `http://localhost:8080/profile/update-profile/${user.id}`,
           formData,
           {
             headers: {
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
             },
           }
         )
         .then((res) => {
           toast.success("Profile updated successfully");
           console.log(res.data);
           navigate(0);
         })
         .catch((error) => {
           toast.error("Error updating profile");
           console.log(error);
         });
     };

    const getUserBookMarks = async ()=>{
        const res = await fetch(`http://localhost:8080/blog/bookmarks/${loggedUserProfile.userId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data);        
        
        if(data.status){
            setBookMarks(data.result)
            console.log(bookmarks);
            
        }

    }



    useEffect(()=>{
        getUserPosts()
        getUserProfile()
    }, [])
    useEffect(() => {
        if (loggedUserProfile?.userId) {
          getUserBookMarks();
        }
      }, [loggedUserProfile?.userId]);
      



  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto pt-[120px]">
        <div className="flex flex-col items-center my-8">
          {preview ? (
            <div className={"w-[6rem] h-[6rem] shadow-sm rounded-full"}>
              <img
                className={"h-full w-full object-cover rounded-full"}
                src={preview}
                alt=""
              />
            </div>
          ) : loggedUserProfile ? (
            <div className={"w-[6rem] h-[6rem] shadow-sm rounded-full"}>
              <img
                className="h-full w-full object-cover rounded-full"
                src={loggedUserProfile.imgUrl}
                alt=""
              />
            </div>
          ) : (
            <img src={userLogo} className="w-32" alt="" />
          )}
          <h1 className="text-3xl font-montserrat text-center font-bold">
            {loggedUserProfile ? loggedUserProfile.displayName : ""}
          </h1>
          <p className="text-sm underline text-blue-700 font-bold -my-1">
            <span>
              {loggedUserProfile ? <p> @{loggedUserProfile.username} </p> : ""}
            </span>
          </p>
          <p className="max-w-lg text-center">
            {loggedUserProfile ? loggedUserProfile.bio : ""}
          </p>
        </div>

        <Tabs defaultValue="stories" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-slate-300">
            <TabsTrigger value="stories" className={"cursor-pointer"}>
              Your BookMarks
            </TabsTrigger>
            <TabsTrigger value="account" className={"cursor-pointer"}>
              Your Stories
            </TabsTrigger>
            <TabsTrigger value="profile" className={"cursor-pointer"}>
              About
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className={" "}>
            {loggedInUserPosts.length > 0 ? (
              loggedInUserPosts.map((post, index) => (
                <div>
                  <BlogCard key={index} post={post} />
                </div>
              ))
            ) : (
              <div className='text-center mt-10 font-bold'>
                <p>You don't have any written stories</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="profile" className={" mt-2"}>
            <div className="">
              {loggedUserProfile ? (
                <h1 className="text-xl font-bold">Edit Profile</h1>
              ) : (
                <h1 className="text-xl font-bold">Set Profile</h1>
              )}
              <form
                className="border border-gray-300 p-8 rounded-lg  space-y-2"
               onSubmit={loggedUserProfile ? handleEditProfile : handleSetProfile}
              >
                {preview && (
                  <div className={"w-[6rem] h-[6rem] shadow-sm rounded-full"}>
                    <img
                      className={"h-full w-full object-cover rounded-full"}
                      src={preview}
                      alt=""
                    />
                  </div>
                )}
                <label
                  className={
                    "mt-1 border border-gray-700 p-1 inline-block rounded-full ml-2 cursor-pointer "
                  }
                >
                  <div className="flex gap-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                    image
                  </div>
                  <input
                    type="file"
                    className={"hidden"}
                    accept={"image/*"}
                    onChange={handleFileChange}
                  />
                </label>

                <Input
                  type={"text"}
                  onChange={(e) =>
                    setProfile({ ...profile, displayName: e.target.value })
                  }
                  className={"w-full"}
                  placeholder="Display Name"
                />
                <Textarea
                  type={"text"}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Bio"
                />
                {loggedInUserPosts ? (
                  <Button className={"cursor-pointer"}>Edit Profile</Button>
                ) : (
                  <Button className={"cursor-pointer"}>Set Profile</Button>
                )}
              </form>
            </div>
          </TabsContent>
          <TabsContent value="stories">
            {bookmarks.length > 0 ? (
              bookmarks.map((post, index) => (
                <div>
                  <BlogCard key={index} post={post} />
                </div>
              ))
            ) : (
              <div className='text-center mt-5'>
                <p>You don't have any BookMarked stories</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
