import { useState, useRef, useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


const AddPostPage = () => {

  const [quill, setQuill] = useState()
  const titleRef = useRef()
  // const qWrapper = useRef()

  const handleSubmit = e => {
    e.preventDefault()

    const post = {
      title: titleRef.current.value,
      body: quill.root.innerHTML
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