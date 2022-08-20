import axios from 'axios'

let cancelToken: any

export const apiGetPlanReferenceData = async (params: {
  stripePrice: string
  id: string
}) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Cancelling previous requests')
  }

  cancelToken = axios.CancelToken.source()

  const options = {
    method: 'GET',
    url: '/management/plans/reference',
    params,
    cancelToken: cancelToken.token,
  }
  return await axios
    .request(options as any)
    .then((res) => {
      return { data: res.data, error: '' }
    })
    .catch((err) => {
      return { data: '', error: err }
    })
}
