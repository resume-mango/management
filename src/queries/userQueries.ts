import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export interface GetUsersListParams {
  page: number
  per_page: number
  include_totals: boolean
  q?: string
  sort?: string
}

export const getSingleUser = (userId: string, enabled: boolean) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/user/${id}`)
    return data
  }

  return getQueryAdvance(['user', userId], () => fetcher(userId), enabled)
}

export const getUsers = (params: GetUsersListParams) => {
  const options = {
    method: 'GET',
    url: '/management/users',
    params,
  }
  const fetcher = async () => {
    const { data } = await axios.request(options as any)
    return data
  }
  return getQueryAdvance(['users', params], () => fetcher(), true)
}
