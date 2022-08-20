import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export const getSinglePlan = (planId: string, enabled?: boolean) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/plan/${id}`)
    return data
  }

  return getQueryAdvance(['plan', planId], () => fetcher(planId), enabled)
}

export const getPlans = () => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/plans`)
    return data
  }
  return getQueryAdvance('plans', () => fetcher())
}
