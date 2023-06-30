import {useEffect, useState} from "react";
import {useEffectOnce} from "./useEffectOnce";
import MessagePayload from "./components/MessagePayload";

const greeting = [
  {
    "role": "assistant",
    "content": "Xin chào khách hàng thân mến,\n\nTôi là chuyên gia đề xuất ẩm thực của bạn và rất hân hạnh được phục vụ bạn. Tôi hy vọng tôi có thể giúp bạn tìm kiếm các món ăn ngon và phù hợp với khẩu vị của bạn. Hãy cùng bắt đầu cuộc trò chuyện để tìm ra những món ăn tuyệt vời nhất cho bạn nhé!"
  }
]
const App = () => {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState(greeting)
  const [disabled, setDisabled] = useState(true);
  console.log(previousChats)

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
      const response =  await fetch('https://foodyapp.onrender.com/chatbot/api/chat/', options)
      // const response =  await fetch('http://127.0.0.1:8000/chatbot/api/chat/', options)
      const data = await response.json()
      setMessage(data)

    } catch (error){
      console.log(error)
    }
  }

  // const getGreeting = async()=> {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'token b1b6cfee49f5b44506a1c186412d22edf97fe6ca',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       messages: [{
  //         role: 'user',
  //         content: ''
  //       }]
  //     })
  //   }
  //   setPreviousChats(prevChats => (
  //       [...prevChats,
  //         {
  //           role: "user",
  //           content: ''
  //         }]
  //   ))
  //   try {
  //     const response =  await fetch('http://127.0.0.1:8000/chatbot/api/completion/', options)
  //     const data = await response.json()
  //     setMessage(data.choices[0].message)
  //   } catch (error){
  //     console.log(error)
  //   }
  // }


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
    document.title = 'Hum nay ăn gì';
    // getGreeting()
  }, [])

  return (
    <div className="App">
      <div className="main">
        <h1>Hum nay ăn gì?</h1>
        <ul className="feed">
          {previousChats?.filter(chatMessage => chatMessage.content !== '').map((chatMessage, index) => 
          <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <div className="message">
              {
                typeof chatMessage.content == "string" ? <p className="message_text">{chatMessage.content}</p> : 
                <>
                  <p className="message_text">Dưới đây là một số món ăn mà tôi tìm thấy:</p>
                  <MessagePayload payload={chatMessage.content.payload}/>
                </>
              }
            </div>    
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
