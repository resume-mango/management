import axios from 'axios'
import { useQuery } from 'react-query'
import { useAuth } from '../contexts/authProvider'

const getQuery = (identifier: string, url: string, params?: string) => {
  const { user, token } = useAuth()
  const ref = user && user.ref

  const fetcher = async () => {
    const { data } = await axios.get(url, { params })
    return data
  }
  return useQuery(identifier, fetcher, { enabled: !!token && !!ref })
}

export default getQuery
