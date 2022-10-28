import { useState } from 'react'

const MessageForm = () => {

  const [error, setError] = useState('error message')

  return (
    <form className='message-form'>
      <div className='input-group'>
        <label htmlFor="title">Message Title</label>
        <input type="text" id='title' />
      </div>
      <div className='input-group'>
        <label htmlFor="message">Your Message</label>
        <textarea name="body" id="message" cols="30" rows="10"></textarea>
      </div>
      <div className='input-group'>
        <label htmlFor="imgUrl">Image Url</label>
        <input type="text" id='imgUrl' />
      </div>
      <p className='error-message'>{error}</p>
      <button className='btn'>Send Message</button>
    </form>
  )
}

export default MessageForm