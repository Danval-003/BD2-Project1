/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { useAPI } from '../useAPI'

function useDisplayData() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()
  const [displayData, setData] = useState()

  useEffect(() => {
    if (error) {
      console.error('Error fetching data: ', error.status, error.message)
    }
  }, [error])

  useEffect(() => {
    if (result) setData(result)
  }, [result])

  const displayDataSet = async (collectionName) => {
    await fetchAPI({
      method: 'POST',
      route: `read/${collectionName}`,
      body: null,
      log: false,
      showReply: false,
    })
  }

  return {
    displayData,
    errorDisplay: error,
    loadingDisplay: loading,
    displayDataSet,
  }
}

export { useDisplayData }
