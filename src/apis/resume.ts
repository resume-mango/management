import axios from 'axios'

export const downloadResume = async (id: string, type: string) => {
  let res
  const options = {
    method: 'GET',
    url: `/resume/download/${id}/${type}`,
    responseType: 'blob',
  }
  try {
    res = await axios.request(options as any)

    return res
  } catch (err: any) {
    return (res = null)
  }
}
