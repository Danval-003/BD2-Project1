/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { useAPI } from '../useAPI'

function useGlobalSearch() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()
  const [dataSearch, setData] = useState()

  useEffect(() => {
    if (error) {
      console.error('Error fetching data: ', error.status, error.message)
    }
  }, [error])

  useEffect(() => {
    if (result) setData(result)
  }, [result])

  const globalSearch = async (param, collectionName) => {
    await fetchAPI({
      method: 'GET',
      route: `read/search/${collectionName}?q=${param}`,
      body: null,
      log: false,
      showReply: false,
    })
  }

  return {
    dataSearch,
    errorGlobSearch: error,
    loadingGlobSearch: loading,
    globalSearch,
  }
}

export { useGlobalSearch }
