import { useEffect, useRef, useState } from "react";

function App() {
  const [connected, setConnected] = useState(false);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState();

  const ws = useRef()

  useEffect(() => {
    fetch('/.well-known/otoroshi/me')
      .then(res => res.json())
      .then(user => {
        login(user.name.replace(" ", "_"))
      })
  }, [])

  const login = name => {
    setName(name);

    // Create WebSocket connection.
    const socket = new WebSocket(`ws://websocket.oto.tools:8080/server/${name}`);

    // Connection opened
    socket.addEventListener("open", (event) => {
      setConnected(true)
    });

    socket.addEventListener("close", (event) => {
      setConnected(false)
    });

    // Listen for messages
    socket.addEventListener("message", addMessage);

    ws.current = socket;
  }

  const addMessage = event => {
    try {
      const raw = JSON.parse(event.data.toString())
      setMessages(messages => [...messages, raw]);
    } catch (err) { }
  }

  const send = () => {
    if (ws.current) {
      ws.current.send(message)
      setMessage("")
    }
  }

  return (
    <div className="chat">
      {connected && <>
        <div className="messages">
          {messages.map((message, idx) => {
            return <div
              className={`message ${message.name === name ? 'left' : 'right'}`}
              key={idx}>
              <span className="user">{message.name}</span>
              {message.content}
            </div>
          })}
        </div>
        <div className="submission-form">
          <input
            placeholder="Type your message here!"
            type="text"
            value={message}
            onKeyDown={e => {
              if (e.keyCode === 13)
                send()
            }}
            onChange={e => setMessage(e.target.value)} />
          <button onClick={send}>Send</button>
        </div>
      </>}
    </div>
  );
}

export default App;
