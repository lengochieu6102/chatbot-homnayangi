import {useEffect, useState} from "react";
import {useEffectOnce} from "./useEffectOnce";

const App = () => {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [disabled, setDisabled] = useState(true);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getMessages()
    }
  };
  const getMessages = async()=> {
    setDisabled(true)
    previousChats.push(
          {
            role: "user",
            content: value
          }
    )

    setValue("")
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: previousChats
      })
    }
    try {
      const response =  await fetch('https://foos-suggestion-chatbot.onrender.com/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)

    } catch (error){
      console.log(error)
    }
  }

  const getGreeting = async()=> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: ''
        }]
      })
    }
    setPreviousChats(prevChats => (
        [...prevChats,
          {
            role: "user",
            content: ''
          }]
    ))
    try {
      const response =  await fetch('https://foos-suggestion-chatbot.onrender.com/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error){
      console.log(error)
    }
  }


  useEffect(() => {
    if (message){
      setPreviousChats(prevChats => (
          [...prevChats,
            {
              role: message.role,
              content: message.content
            }]
      ))
    }
    setDisabled(false)
  }, [message])
  useEffectOnce(() => {
    getGreeting()
  }, [])

  return (
    <div className="App">
      <div className="main">
        <h1>Hum nay ăn gì?</h1>
        <ul className="feed">
          {previousChats?.filter(chatMessage => chatMessage.content !== '').map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyPress} disabled={disabled}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">Chat GPT April 23 Version / Made by Hieu</p>
        </div>
      </div>
    </div>
  );
}

export default App;
