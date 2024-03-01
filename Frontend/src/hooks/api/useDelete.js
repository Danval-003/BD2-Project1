/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react'
import { useAPI } from '../useAPI'

function useDeleteDocument() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()

  useEffect(() => {
    if (error) {
      console.error('Error deleting document: ', error.status, error.message)
    }
  }, [error])

  const deleteDocument = async (id, collectionName) => {
    const toJSON = {
      _id: id,
    }

    await fetchAPI({
      method: 'DELETE',
      route: `delete/${collectionName}`,
      body: JSON.stringify(toJSON),
      log: false,
      showReply: false,
    })
  }

  return {
    resultDeleting: result,
    errorDeleting: error,
    loadingDeleting: loading,
    deleteDocument,
  }
}

export { useDeleteDocument }
