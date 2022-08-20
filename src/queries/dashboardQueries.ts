import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export const getDashboardData = (enabled?: boolean) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/data`)
    return data
  }

  return getQueryAdvance('dashboard', () => fetcher(), enabled)
}
