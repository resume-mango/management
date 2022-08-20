import axiosRequest from '../helpers/axiosRequest'

export const apiCreateBlog = async () => {
  let data
  let error: string

  try {
    const options = {
      method: 'POST',
      url: '/management/blog',
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err) {
    return { data: undefined, error: err }
  }
}

export const apiUpdateBlog = async (id: string, reqData: any) => {
  let data
  let error: string

  try {
    const options = {
      method: 'PATCH',
      url: `/management/blog/${id}`,
      data: reqData,
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err) {
    return { data: undefined, error: err }
  }
}

export const apiDeleteBlog = async (id: string) => {
  let data
  let error: string

  try {
    const options = {
      method: 'DELETE',
      url: `/management/blog/${id}`,
    }
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err) {
    return { data: undefined, error: err }
  }
}

export const apiUploadBlogImage = async (id: string, reqData: any) => {
  let data
  let error: string

  const options = {
    method: 'PATCH',
    url: `/management/blog/image/${id}`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: reqData,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err) {
    return { data: undefined, error: err }
  }
}

export const apiDeleteBlogImage = async (id: string) => {
  let data
  let error: string

  const options = {
    method: 'DELETE',
    url: `/management/blog/image/${id}`,
  }

  try {
    const res = await axiosRequest(options)
    data = res.data as any
    error = res.error
    return { data, error }
  } catch (err) {
    return { data: undefined, error: err }
  }
}
