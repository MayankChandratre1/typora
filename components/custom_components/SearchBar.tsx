"use client"
import React from 'react'
import { Input } from '../ui/input'

import { getBlogByName } from '@/lib/actions/blogActions'

import { BlogWithRelations } from '@/lib/types/blogTypes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const SearchBar = () => {
  const [search, setSearch] = React.useState('')
  const [results, setResults] = React.useState<BlogWithRelations[]>([])
  const [loading, setLoading] = React.useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  React.useEffect(() => {
    const fetchResults = async () => {
      const res = await getBlogByName(search)
      if(res.success && res.blogs){
        setResults(res.blogs)
        setLoading(false)
      }else{
        setResults([])
        setLoading(false)
      }
    }
    const timeout = setTimeout(() => {
      setLoading(true)
      if(search.length > 2){
        fetchResults()
      }else{
        setResults([])
        setLoading(false)
      }
      if(search.length === 0){
        setResults([])
        setLoading(false)
      }
    }, 500)
    return () => clearTimeout(timeout)
  },[search])
  return (
    <div className='w-full relative'>
        <div>
        <Input type="text" placeholder="Search..." value={search} onChange={handleChange} />
        </div>
        <div className='absolute w-full bg-white z-50 mt-2 rounded-xl shadow-md'>
          {
            loading && <div className='dark:bg-black p-2 text-center'>Searching...</div>
          }  
          {
            results.length === 0 && !loading && search.length > 0 && <div className='dark:bg-black p-2 text-center'>No results found</div>
          }
          
            {
                results.map((blog, index) => {
                    return (
                        <div key={index} className='p-2 dark:bg-black cursor-pointer'>
                            <SearchBlogCard blog={blog} />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

const SearchBlogCard = ({blog}:{blog:BlogWithRelations}) => {
  const router = useRouter()  
  return (
        <div className='flex gap-1' onClick={()=>{
            router.push(`/blog/${blog.id}`)
        }}>
          {
            blog.thumbnail_url ? (
              <div>
            <Image src={blog.thumbnail_url} alt="profile" width={100} height={100} className='rounded-md w-32 h-full object-cover' />
          </div>
            ):null
          }
          <div className='flex-1'>
             <h5>{blog.title}</h5>
             <p className='text-xs text-gray-400'>{blog.publishedAt.toDateString()}</p>
             <div>
              {
                blog.tags.map((tag, index) => {
                  return (
                    <span key={index} className='text-xs text-gray-400 rounded-md px-1'>{tag.name}</span>
                  )
                })
              }
             </div>
          </div>
           
        </div>
    )
}

export default SearchBar