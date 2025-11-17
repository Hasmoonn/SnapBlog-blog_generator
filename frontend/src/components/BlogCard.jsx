import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

  const {title, description, category, image, _id} = blog;
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='relative w-full rounded-lg overflow-hidden shadow group hover:scale-[1.02] hover:shadow-primary/25 duration-300 cursor-pointer hover:border hover:border-primary/50 transition-transform'>
      <img src={image} alt="" className='aspect-video object-cover' />
      <span className='absolute top-2 left-2 px-3 py-1 inline-block bg-primary/40 rounded-full text-black text-xs'>{category}</span>

      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900 group-hover:text-primary duration-300 transition-all'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{'__html': description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard