import {
  apiCreateBlog,
  apiDeleteBlog,
  apiDeleteBlogImage,
  apiUpdateBlog,
  apiUploadBlogImage,
} from '../../apis/blog'
import * as axiosRequest from '../../helpers/axiosRequest'

describe('Api Create Blog', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const options = {
    method: 'POST',
    url: '/management/blog',
  }

  test('should fail create blog', async () => {
    axiosRequestSpy.mockRejectedValueOnce('Err')
    const result = await apiCreateBlog()
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: undefined, error: 'Err' })
  })
  test('should create blog', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'fake-data',
      error: undefined,
    })
    const result = await apiCreateBlog()
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: 'fake-data', error: undefined })
  })
})

describe('Api Update Blog', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })
  const reqData = 'dummy'
  const id = 'abc'
  const options = {
    method: 'PATCH',
    url: `/management/blog/${id}`,
    data: reqData,
  }

  test('should fail update blog', async () => {
    axiosRequestSpy.mockRejectedValueOnce('Err')
    const result = await apiUpdateBlog(id, reqData)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: undefined, error: 'Err' })
  })
  test('should update blog', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'fake-data',
      error: undefined,
    })
    const result = await apiUpdateBlog(id, reqData)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: 'fake-data', error: undefined })
  })
})

describe('Api Delete Blog', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })
  const id = 'abc'
  const options = {
    method: 'DELETE',
    url: `/management/blog/${id}`,
  }

  test('should fail delete blog', async () => {
    axiosRequestSpy.mockRejectedValueOnce('Err')
    const result = await apiDeleteBlog(id)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: undefined, error: 'Err' })
  })
  test('should delete blog', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'fake-data',
      error: undefined,
    })
    const result = await apiDeleteBlog(id)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: 'fake-data', error: undefined })
  })
})

describe('Api Upload Blog Image', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })
  const id = 'abc'
  const reqData = 'fake-data'
  const options = {
    method: 'PATCH',
    url: `/management/blog/image/${id}`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: reqData,
  }

  test('should fail update blog', async () => {
    axiosRequestSpy.mockRejectedValueOnce('Err')
    const result = await apiUploadBlogImage(id, reqData)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: undefined, error: 'Err' })
  })
  test('should update blog', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'fake-data',
      error: undefined,
    })
    const result = await apiUploadBlogImage(id, reqData)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: 'fake-data', error: undefined })
  })
})

describe('Api Delete Blog Image', () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, 'default')

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })
  const id = 'abc'
  const options = {
    method: 'DELETE',
    url: `/management/blog/image/${id}`,
  }

  test('should fail delete blog image', async () => {
    axiosRequestSpy.mockRejectedValueOnce('Err')
    const result = await apiDeleteBlogImage(id)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: undefined, error: 'Err' })
  })
  test('should delete blog image', async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: 'fake-data',
      error: undefined,
    })
    const result = await apiDeleteBlogImage(id)
    expect(axiosRequestSpy).toBeCalledWith(options)
    expect(result).toEqual({ data: 'fake-data', error: undefined })
  })
})
