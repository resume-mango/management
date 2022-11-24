import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export interface GetReviewParams {
  id?: string
  sort?:
    | 'urgent-tickets'
    | 'assigned-tickets'
    | 'unassigned-tickets'
    | 'open-tickets'
    | 'completed'
  page: number
  limit: number
}

export interface GetChatsPatams {
  ticketId: string
  page: number
  limit: number
}

export const chatFetcher = async (params: GetChatsPatams) => {
  const { ticketId, ...rest } = params
  const { data } = await axios.get(`/management/ticket/${ticketId}`, {
    params: rest,
  })
  return data
}

export const getReviewTicketById = ({ ticket }: { ticket: string }) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/resume-review/${ticket}`)
    return data
  }
  return getQueryAdvance(
    ['reviewTicket', ticket],
    () => fetcher(),
    ticket !== 'new'
  )
}

export const getReviewTickets = (params: GetReviewParams) => {
  if (
    params.sort &&
    [
      'urgent-tickets',
      'open-tickets',
      'assigned-tickets',
      'unassigned-tickets',
      'completed',
    ].indexOf(params.sort) === -1
  ) {
    return { data: undefined, isLoading: false, isError: false }
  }
  const fetcher = async () => {
    const { data } = await axios.get(`/management/resume-review`, { params })
    return data
  }
  return getQueryAdvance(['resumeReview', params], () => fetcher())
}

export const getReviewers = (enabled?: boolean) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/reviewers`)
    return data
  }
  return getQueryAdvance('reviewers', () => fetcher(), enabled)
}

export const getUnreadChats = () => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/chat/unread`)
    return data
  }
  return getQueryAdvance('unreadChats', () => fetcher())
}
