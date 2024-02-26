import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'

function useAPI() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showResultTable, setShowResultTable] = useState(false)
  const { fetchRequest } = useFetch()

  useEffect(() => {
    if (result && showResultTable) {
      console.table(result)
    }
  }, [result])

  const fetchAPI = async ({
    route,
    method = 'GET',
    body,
    headers,
    signal,
    toJson = true,
    parseText = true,
    removeContentType = false,
    log = false,
    showReply = false,
  }) => {
    setLoading(true)
    showReply ? setShowResultTable(true) : setShowResultTable(false)
    if (log) console.log(`Fetching API to... 127.0.0.1:5555/${route}`)
    try {
      const head3rs = {
        'Content-Type': 'application/json',
        ...headers,
      }

      if (removeContentType) delete head3rs['Content-Type']

      console.log(`http://localhost:5555/${route}`)
      const reply = await fetchRequest({
        uri: `http://localhost:5555/${route}`,
        method,
        body,
        headers: head3rs,
        signal,
      })

      
      let response
      if (!parseText) response = reply
      else if (toJson) response = await reply.json()
      else response = await reply.text()

      setResult(response ?? true)

      return response
    } catch (ex) {
      console.log(ex)
      setError({
        status: ex?.status,
        message: ex?.statusMessage ?? ex?.statusText ?? 'Ocurrió un error.',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    result, error, loading, fetchAPI,
  }
}

export default useAPI
