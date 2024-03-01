/* eslint-disable import/prefer-default-export */
function useFetch() {
  const fetchRequest = async ({
    uri,
    method = 'GET',
    body,
    headers,
    signal,
  }) => {
    const response = await fetch(uri, {
      method,
      body,
      headers,
      signal,
    })

    if (!response.ok) throw response

    return response
  }

  return { fetchRequest }
}

export { useFetch }
