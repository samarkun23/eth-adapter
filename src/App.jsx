import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err =>{
        console.error(err);
        setPost([])
      })
  },[])

  return (
    <>
      <div>
        HI THERE
        {post.map(p => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <div>{p.body}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
