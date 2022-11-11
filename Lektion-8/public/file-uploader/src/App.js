import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const defaultImgSrc = './assets/placeholder.jpg'

  const [imageSrc, setImageSrc] = useState(defaultImgSrc);
  const [data, setData] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  const setImage = e => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    reader.onload = x => {
      setImageSrc(x.target.result)
    }

    setData(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", data)
    
    const res = await axios.post('https://localhost:7267/api/Upload', formData)
    console.log(res);
    setImageUrl(res.data);
  }

  return (
    <div className='wrapper'>
      <div className="card">
        <div className="img-container">
          <img src={imageSrc} alt="" />
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input type="file" accept='image/*' className='file-input' onChange={setImage} />
          <button className='btn'>Ladda upp</button>
        </form>
      </div>

      { imageUrl &&
        <div className='card'>
          <div className="img-container">
            <img src={imageUrl} alt="" />
          </div>
        </div>
      }
    </div>
  )
}

export default App
