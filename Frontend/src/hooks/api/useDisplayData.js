import { useEffect, useState } from "react";
import { useAPI } from "../useAPI";

function useDisplayData() {
  const { fetchAPI, error, loading, result } = useAPI();
  const [data, setData] = useState();

  useEffect(() => {
    if (error) {
      console.error(`Error fetching data: `, error.status, error.message);
    }
  }, [error]);

  useEffect(() => {
    if (result) setData(result);
    console.log('DATA')
    console.log(data)
  }, [result])

  const displayDataSet = async (collectionName) => {
    await fetchAPI({
      method: "POST",
      route: `read/${collectionName}`,
      body: null,
      log: false,
      showReply: false,
    });
  };

  return {
    data,
    errorDisplay: error,
    loadingDisplay: loading,
    displayDataSet
  };
}

export { useDisplayData };