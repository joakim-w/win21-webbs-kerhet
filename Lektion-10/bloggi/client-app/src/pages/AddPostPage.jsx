import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


const AddPostPage = () => {

  const [error, setError] = useState(false)
  const [quill, setQuill] = useState()
  const titleRef = useRef()
  const navigate = useNavigate()
  // const qWrapper = useRef()

  const handleSubmit = async e => {
    e.preventDefault()

    const post = {
      title: titleRef.current.value,
      body: quill.root.innerHTML
    }

    try {

      const token = localStorage.getItem('accessToken')

      const res = await fetch('https://localhost:7164/api/Posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })

      if(!res.ok) {
        throw new Error(res.status, res.statusText)
      }

      // titleRef.current.value = ''
      // quill.root.innerHTML = ''
      setError(false)
      navigate('/')

    } catch (err) {
      console.log(err.message)
      setError(true)
    }

    console.log(post)
  }

  const qWrapper = useCallback(wrapper => {
    if(wrapper == null) return

    const TOOLBAR_OPTIONS = [
      ['bold', 'italic', 'underline'],
      ['image'],
      [{ header: [1,2,3,4,5,6, false]}],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'] 
    ]

    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, {theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS}})
    setQuill(q)
  }, [])

  return (
    <div className='mt-5'>
      <h1>Add a new post</h1>
      {
        error && <div className="alert alert-danger" role="alert">
        Somehting went wrong when creating the post
      </div>
      }
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" id='title' ref={titleRef} className='form-control' />
        </div>

        <div id='q-wrapper' ref={qWrapper} className='mb-3'></div>

        <button className='btn btn-primary'>Send</button>
      </form>
    </div>
  )
}

export default AddPostPage