import { useEffect, useState } from "react";
import { useAPI } from '../../hooks/useAPI';

function useInsertDocument() {
  const { fetchAPI, error, loading, result } = useAPI();

  useEffect(() => {
    if (error) {
      console.error(`Error inserting document: `, error.status, error.message);
    }
  }, [error]);

  const insertDocument = async (document, collectionName) => {
    await fetchAPI({
      method: "POST",
      route: `create/${collectionName}`,
      body: JSON.stringify(document),
      log: false,
      showReply: false,
    });
  };

  return {
    resultInsert: result,
    errorInsert: error,
    loadingInsert: loading,
    insertDocument
  };
}

export { useInsertDocument };