import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getPosts')
            const data = await res.json()
            setPosts(data.posts)
        }
        fetchPosts()
    }, [])
  return (
    <div>
        <div className='flex flex-col gap-6 p-28 px-4 max-w-6xl mx-auto ' dir='rtl'>
            <h1 className="text-3xl font-bold lg:text-6xl">مرجع ارتودوکس شرقی</h1>
            <p className='text-gray-500 text-xs sm:text-sm'>دسترسی به مقالات و آموزه های ارتودوکس مشرقی و آشنایی بیشتر با خداوند ما عیسی مسیح</p>
            <Link to='/search' className='text-xs sm:text-sm text-red-500 font-bold hover:underline'>نمایش کلیه مقالات</Link>
        </div>
        <div className="p-3 bg-amber-100 dark:bg-slate-700">
           <CallToAction /> 
        </div>

        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
            {
                posts && posts.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <h2 text-2xl font-semibold text-center>مقالات اخیر</h2>
                        <div className="flex flex-wrap gap-4">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>

                        </Link>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Home