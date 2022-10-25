import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

/**
 * Gets single resume template
 * @param template resume template object _id
 * @param enabled should quey be enabled?
 * @returns UseQueryResult
 */
export const getResumeTemplate = (template: string, enabled?: boolean) => {
  const fetcher = async (name: string) => {
    const { data } = await axios.get(`/templates/resume/${name}`)
    return data
  }

  return getQueryAdvance(
    ['resumeTemplates', template],
    () => fetcher(template),
    enabled
  )
}
