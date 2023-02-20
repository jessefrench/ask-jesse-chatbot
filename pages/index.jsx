import Head from "next/head"
import { useState } from 'react'

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const handleSubmit = async e => {
    e.preventDefault()
    setMessages([...messages, { prompt, user: 'human' }])
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      const data = await response.json()
      setMessages(prevMessages => (
         [...prevMessages, { prompt: data.message, user: 'ai' }]
      ))
      let chatWindow = document.getElementById('scroller')
      let xH = chatWindow.scrollHeight
      chatWindow.scrollTo(0, xH)
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="main">
      <Head>
        <title>Ask Jesse</title>
        <link rel="icon" href="/wave.png" />
      </Head>
      <div className="logo" >
        <img src="/logo.png" className="icon" />
      </div>
      <div className="message" id='scroller'>
        {messages.map((msg, id) => (
          <div key={id} className="person">
            <img src={msg.user === 'human' ? '/thinking-face.png' : '/thumbs-up.png'} alt="icon" />
            <p>
              {msg.prompt}
            </p>
          </div>))
        }
        <div id="anchor"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setPrompt(e.target.value)} name="prompt" value={prompt} placeholder="Ask me something..." />
      </form>
    </div>
  )
}