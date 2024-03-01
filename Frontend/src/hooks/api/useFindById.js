import { useEffect, useState } from "react";
import { useAPI } from '../../hooks/useAPI';

function useFindById() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [data, setData] = useState();

  useEffect(() => {
    if (error) {
      console.error(`Error fetching document: `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setData(result);
  }, [result])


  const findByID = async (id, collectionName) => {
    const toJSON = {
      "_id": id
    }

    await fetchAPI({
      method: "POST",
      route: `read/${collectionName}`,
      body: JSON.stringify(toJSON),
      log: false,
      showReply: false,
    });
  };

  return {
    data,
    errorFindID: error,
    loadingFindID: loading,
    findByID
  };
}

export { useFindById };