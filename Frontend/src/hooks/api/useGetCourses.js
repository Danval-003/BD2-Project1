/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react'
import { useAPI } from '../useAPI'

function useGetCourses() {
  const {
    fetchAPI, error, loading, result,
  } = useAPI()
  const [data, setData] = useState()

  useEffect(() => {
    if (error) {
      console.error('Error fetching data: ', error.status, error.message)
    }
  }, [error])

  useEffect(() => {
    if (result) setData(result)
  }, [result])

  const getCourses = async (idGrade) => {
    await fetchAPI({
      method: 'GET',
      route: `read/coursesByGrade?grade=${idGrade}`,
      body: null,
      log: false,
      showReply: false,
    })
  }

  return {
    data,
    errorGetCourses: error,
    loadingGetCourses: loading,
    getCourses,
  }
}

export { useGetCourses }
