import Head from "next/head"
import { useState, useCallback, useRef } from 'react'

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const chatWindowRef = useRef(null)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setMessages([...messages, { prompt, user: 'human' }])
    document.getElementById('home').hidden = 'true'
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
      let xH = chatWindowRef.current.scrollHeight
      chatWindowRef.current.scrollTo(0, xH) 
    }
    catch(error) {
      console.log(error)
    }
  }, [messages, prompt])

  return (
    <div className="main">
      <Head>
        <title>Ask Jesse</title>
        <link rel="icon" href="/wave.png" />
      </Head>
      <div id="home">
        <div className="logoContainer" >
          <img src="/logo.png" className="logo" />
        </div>
        <div className="welcomeInfo">
          <div>
            <h2>🔆</h2>
            <h3>Examples</h3>
            <p>"Explain quantum computing in simple terms."</p>
            <p>"Got any creative ideas for a 10 year old's birthday?"</p>
            <p>"How do I make an HTTP request in JavaScript?"</p>
          </div>
          <div>
            <h2>⚡</h2>
            <h3>Capabilities</h3>
            <p>Remembers what the user said earlier in the conversation.</p>
            <p>Allows the user to provide follow-up corrections.</p>
            <p>Trained to decline inappropriate requests.</p>
          </div>
          <div>
            <h2>⚠️</h2>
            <h3>Limitations</h3>
            <p>May occasionally generate incorrect information.</p>
            <p>May occasionally produce harmful instructions or biased content.</p>
            <p>Limited knowledge of the world and events after 2021.</p>
          </div>
        </div>
      </div>
      <div className="messages" id='scroller' ref={chatWindowRef}>
        {messages.map((msg, id) => (
          <div key={id} className='person' id={msg.user === 'human' ? 'user' : 'bot'}>
            <img src={msg.user === 'human' ? '/thinking-face.png' : '/thumbs-up.png'} alt="icon" />
            <div className={msg.user === 'human' ? 'userBubble' : 'botBubble'}>
              <p>{msg.prompt}</p>
            </div>
          </div>))
        }
        <div id="anchor"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input onChange={(e) => setPrompt(e.target.value)} name="prompt" value={prompt} placeholder="Ask me something..." />
          <button type="submit">⬆</button>
        </div>
      </form>
    </div>
  )
}
