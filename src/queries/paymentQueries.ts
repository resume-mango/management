import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export const getUserPayments = (
  userId: string,
  page: number,
  enabled?: boolean
) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/payments/user/${id}`, {
      params: { page },
    })
    return data
  }

  return getQueryAdvance(
    ['payments', { userId, page }],
    () => fetcher(userId),
    enabled
  )
}
export interface IGetPaymentQueryParams {
  q?: string
  limit?: number
  start_after?: string
  next_page?: string
}

export const getPayments = (
  page: number,
  cacheRef: 'all_list' | 'search_list',
  params: IGetPaymentQueryParams,
  enabled?: boolean
) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/payments/search`, {
      params,
    })
    return data
  }

  return getQueryAdvance(
    ['payments', { q: params.q, cacheRef, page }],
    () => fetcher(),
    enabled
  )
}

export const getPaymentsById = (id: string, enabled?: boolean) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/payments/${id}`)
    return data
  }

  return getQueryAdvance(['payment', id], () => fetcher(id), enabled)
}
