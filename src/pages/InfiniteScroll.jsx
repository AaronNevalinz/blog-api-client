import BlogCard from '@/components/BlogCard';
import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import { AppContext } from '@/context/AppContext';
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'

export default function InfiniteScroll() {
  const {token} = useContext(AppContext)
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observer = useRef();

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:8080/blog/summaries?page=${page}&size=5`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (data.status) {
        setPosts(prev => [...prev, ...data.result]);
        setHasNext(data.hasNext);
        
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const lastPostRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNext) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNext]
  );

  useEffect(() => {
    if(hasNext)fetchPosts(); // Initial load
  }, [page]);
  return (
  <div className="">
              <Navbar/>
  
              <main className="max-w-4xl mx-auto pt-[63px]">
                  
  
                  <div className="pt-12">
      {
            posts.length > 0 ? posts.map((post, index) =>{
                const isLast = index === posts.length - 1;
                return (
                    <div key={index} ref={isLast?lastPostRef:null} >
                        <BlogCard post={post} />
                    </div>
                )
            } ) : (
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
        {!hasNext && <p className='text-center my-4'>No more posts</p>}
      </div>
    </main>
</div>
  )
}
