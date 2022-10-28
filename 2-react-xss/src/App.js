import { useState } from 'react'
import MessageForm from './components/MessageForm'
import Messages from './components/Messages'

const App = () => {

  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'title1',
      body: 'lkas dlkasd laksd laskd asldk alskd aslkd',
      imgUrl: 'https://images.unsplash.com/photo-1666679643373-f2e184deefce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
    }
  ])

  return (
    <div className="container">
      <MessageForm />
      <Messages />
    </div>
  )
}

export default App