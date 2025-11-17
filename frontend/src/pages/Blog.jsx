import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])

  if (!data) 
    return <Loader />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-4 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <p className="text-primary text-sm font-semibold uppercase tracking-wide">
                  {Moment(data.createdAt).format('MMMM Do, YYYY')}
                </p>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mt-2">
                  {data.title}
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {data.subTitle}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <div className="flex items-center justify-center w-full px-8 py-3 text-base font-medium rounded-md text-gray-700 bg-gray-100 md:py-4 md:text-lg md:px-10">
                      <img src={assets.user_icon} className="w-5 h-5 mr-2" alt="Author" />
                      <span className='text-primary/75'>Michel Brown</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Image */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={data.image}
            alt={data.title}
          />
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="rich-text text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Comments Section */}
        <div className="border-t pt-12">
          <h3 className="text-2xl text-primary font-bold mb-8">Comments ({comments.length})</h3>
          
          <div className="space-y-6 mb-12">
            {comments.map((item, index) => (
              <div key={index} className="border-b pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} className="w-8" alt="" />
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-400 text-sm">{Moment(item.createdAt).fromNow()}</span>
                </div>
                <p className="text-gray-700 ml-11">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="text-xl text-primary font-semibold mb-4">Add Comment</h4>
            <form onSubmit={addComment} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea 
                placeholder="Your comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                required
              />
              <button 
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Post Comment
              </button>
            </form>
          </div>

          {/* Social Share */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Share this article</p>
            <div className="flex justify-center gap-4">
              <img src={assets.facebook_icon} alt="" className="w-10 cursor-pointer" />
              <img src={assets.twitter_icon} alt="" className="w-10 cursor-pointer" />
              <img src={assets.googleplus_icon} alt="" className="w-10 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog