/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react'
import { useAPI } from '../useAPI'

function useUpdate() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()

  useEffect(() => {
    if (error) {
      console.error('Error updating document: ', error.status, error.message)
    }
  }, [error])

  const updateDocument = async (id, document, collectionName) => {
    const idJSON = {
      _id: id,
    }
    await fetchAPI({
      method: 'PUT',
      route: `update/${collectionName}`,
      body: JSON.stringify([idJSON, document]),
      log: false,
      showReply: false,
    })
  }

  return {
    resultUpdate: result,
    errorUpdate: error,
    loadingUpdate: loading,
    updateDocument,
  }
}

export { useUpdate }
