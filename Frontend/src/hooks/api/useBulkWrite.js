/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react'
import { useAPI } from '../useAPI'

function useBulkInsert() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()

  useEffect(() => {
    if (error) {
      console.error('Error inserting document: ', error.status, error.message)
    }
  }, [error])

  const bulkInsert = async (file, collectionName) => {
    const formData = new FormData()
    formData.append('file', file)

    await fetchAPI({
      method: 'POST',
      route: `create/bulkWrite/${collectionName}`,
      body: formData,
      removeContentType: true,
      log: false,
      showReply: false,
    })
  }

  return {
    resultBulk: result,
    errorBulk: error,
    loadingBulk: loading,
    bulkInsert,
  }
}

export { useBulkInsert }
