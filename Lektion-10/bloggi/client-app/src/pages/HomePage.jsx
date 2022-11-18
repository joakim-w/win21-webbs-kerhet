import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Post from '../components/Post'

const HomePage = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getPosts = async () => {
      setLoading(true)
      try {
        
        const res = await fetch('https://localhost:7164/api/Posts')
        if(!res.ok) {
          throw new Error(res.status, res.statusText)
        }
        const data = await res.json()
        setPosts(data)
        setLoading(false)

      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }

    }

    getPosts()

  }, [])

  if(loading) {
    return <Loader />
  }

  return (
    <div className='mt-5'>
      <h1 className='mb-5'>Posts</h1>
      {
        posts.length > 0 ? posts.map(post => (
          <Post key={post.id} post={post} />
        ))
        : <p>No posts to show</p>
      }
    </div>
  )
}

export default HomePage