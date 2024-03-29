import { useState } from 'react'

const useApi2 = () => {
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(false)
  const handleRequest = async (method, path, body = '') => {
    setLoading(true)
    // fetch
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (method !== 'GET') {
      options.body = JSON.stringify(body)
    }

    // console.log('method', method)
    const fetchResponse = await fetch(`http://localhost:5555/${path}`, options)

    const JSONresponse = await fetchResponse.json()

    setResponse(JSONresponse)
    setLoading(false)
    return JSONresponse
  }

  return [response, loading, handleRequest]
}

export default useApi2
