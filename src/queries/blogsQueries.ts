import axios from 'axios'
import getQueryAdvance from '../hooks/getQueryAdvance'

export interface GetBlogsParams {
  title?: string
  page: number
  limit: number
}

export const getSingleBlog = (blogId: string, enabled?: boolean) => {
  const fetcher = async (id: string) => {
    const { data } = await axios.get(`/management/blog/${id}`)
    return data
  }

  return getQueryAdvance(['blog', blogId], () => fetcher(blogId), enabled)
}

export const getBlogs = (params: GetBlogsParams) => {
  const fetcher = async () => {
    const { data } = await axios.get(`/management/blogs`, { params })
    return data
  }
  return getQueryAdvance(['blogs', params], () => fetcher())
}
