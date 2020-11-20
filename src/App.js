import { useState } from 'react'
import axios from 'axios'

const formatOpt = [{
  title: '1080p',
  code: 137
},{
  title: '720p',
  code: 136
},{
  title: 'mp3',
  code: 140
}]

function App() {
  const [ format, setFormat ] = useState('');
  const [ url, setUrl ] = useState('');

  const onChange = (event) => {
    setFormat(event.target.value)
  }
  const onUrlChnage = (event) => {
    setUrl(event.target.value)
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const inputs = {
      format, url
    }

    axios.post('http://localhost:5000/api/download', inputs)
      .then(res => {
        console.log(res.data);

      })

    setUrl('')
    setFormat('')
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <select name="format" onChange={onChange}>
            <option>화질선택</option>
          {formatOpt.map(opt => (
            <option value={opt.code}>{opt.title}</option>
          ))}
        </select>
        <input type="text" name="url" value={url} onChange={onUrlChnage} />
        <button>다운로드</button>
      </form>
    </>
  );
}

export default App;
