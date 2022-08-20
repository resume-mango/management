import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export interface GetSubscriptionsParams {
  q?: string
  page: number
  limit: number
}

export const getSubscriptions = (
  params: GetSubscriptionsParams,
  enabled?: boolean
) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/subscriptions`, {
      params,
    })
    return data
  }

  return getQueryAdvance(
    ['subscriptions', { params }],
    () => fetcher(),
    enabled
  )
}

export const getSingleSubscription = (id: string, enabled?: boolean) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/subscriptions/${id}`)
    return data
  }

  return getQueryAdvance(['subscription', id], () => fetcher(id), enabled)
}
