import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7000');
const userName = 'User' + parseInt(Math.random()*10);

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload]);
    })
  });

  const sendMessage = (e) => {
    console.log(message);
    socket.emit('message', {userName, message});
    //senfd message on socket
    setMessage('');
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Welcome to ChatApp</h1>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"
          placeholder='Type here...'
          value={message}
          onChange={(e) => {setMessage(e.target.value)}}
          required
          ></input>
          <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index) => {
        return (
          <h3 key={index}>{payload.userName}: <span>{payload.message}</span></h3>
        )
      })}
    </div>
  );
}

export default App;
