import * as blogApis from '../../apis/blog'
import {
  deleteBlogFromListofBlogs,
  deleteBlogImage,
  deleteSingleBlog,
  updateBlog,
  uploadBlogImage,
} from '../../helpers/blogHelper'

describe('Upload single blog image', () => {
  const apiUploadBlogImageSpy = jest.spyOn(blogApis, 'apiUploadBlogImage')
  const blob = new Blob(['abc'])
  const file = new File([blob], 'values.json', {
    type: 'application/JSON',
  })

  const id = 'abc'
  const setImageLoading = jest.fn()
  const setImage = jest.fn()
  const setValue = jest.fn()
  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
  } as any

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail to upload', async () => {
    apiUploadBlogImageSpy.mockResolvedValue({
      data: undefined,
      error: undefined,
    } as any)
    await uploadBlogImage(
      id,
      file,
      setImageLoading,
      setImage,
      setValue,
      setNotify,
      queryClient
    )
    expect(apiUploadBlogImageSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to upload image',
    })
  })
  test('should  upload', async () => {
    apiUploadBlogImageSpy.mockResolvedValue({
      data: {
        image: 'abc',
        _id: 'efg',
      },
      error: undefined,
    } as any)
    await uploadBlogImage(
      id,
      file,
      setImageLoading,
      setImage,
      setValue,
      setNotify,
      queryClient
    )
    expect(apiUploadBlogImageSpy).toBeCalledTimes(1)
    expect(queryClient.removeQueries).toBeCalledTimes(1)
    expect(setValue).toBeCalledTimes(1)
  })
})

describe('Delete single blog image', () => {
  const apiDeleteBlogImageSpy = jest.spyOn(blogApis, 'apiDeleteBlogImage')

  const id = 'abc'
  const setImageLoading = jest.fn()
  const setValue = jest.fn()
  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
  } as any

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail to delete', async () => {
    apiDeleteBlogImageSpy.mockResolvedValue({
      data: undefined,
      error: undefined,
    } as any)
    await deleteBlogImage(id, setValue, setImageLoading, setNotify, queryClient)
    expect(apiDeleteBlogImageSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete image',
    })
  })

  test('should delete', async () => {
    apiDeleteBlogImageSpy.mockResolvedValue({
      data: { _id: 'anc', image: 'hijk' },
      error: undefined,
    } as any)
    await deleteBlogImage(id, setValue, setImageLoading, setNotify, queryClient)
    expect(apiDeleteBlogImageSpy).toBeCalledTimes(1)
    expect(queryClient.removeQueries).toBeCalledTimes(1)
    expect(queryClient.setQueryData).toBeCalledTimes(1)
    expect(setValue).toBeCalledTimes(1)
  })
})

describe('Update single blog', () => {
  const apiUpdateBlogSpy = jest.spyOn(blogApis, 'apiUpdateBlog')

  const initialData = {
    _id: 'anc',
  }
  const data = { title: 'abc' }
  const reset = jest.fn()
  const setError = jest.fn()

  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
  } as any

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail to update', async () => {
    apiUpdateBlogSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    await updateBlog(initialData, data, reset, setError, setNotify, queryClient)
    expect(apiUpdateBlogSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to update blog',
    })
  })
  test('should fail due to duplicate slug', async () => {
    apiUpdateBlogSpy.mockResolvedValue({
      data: undefined,
      error: 'slug already in use!',
    })

    await updateBlog(initialData, data, reset, setError, setNotify, queryClient)
    expect(apiUpdateBlogSpy).toBeCalledTimes(1)
    expect(setError).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to update blog',
    })
  })

  test('should update', async () => {
    apiUpdateBlogSpy.mockResolvedValue({
      data: { _id: 'abc' },
      error: undefined,
    } as any)
    await updateBlog(initialData, data, reset, setError, setNotify, queryClient)
    expect(apiUpdateBlogSpy).toBeCalledTimes(1)
    expect(queryClient.removeQueries).toBeCalledTimes(1)
    expect(queryClient.setQueryData).toBeCalledTimes(1)
    expect(reset).toBeCalledTimes(1)
  })
})

describe('Delete single blog for list', () => {
  const apiDeleteBlogSpy = jest.spyOn(blogApis, 'apiDeleteBlog')

  const id = 'abc'
  const data = {
    items: [{ _id: 'abc' }],
  }
  const params = 'fake-params' as any
  const navigate = jest.fn()
  const setIsDeleting = jest.fn()
  const setDeleteItemId = jest.fn()

  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
  } as any

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail to delete', async () => {
    apiDeleteBlogSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    await deleteBlogFromListofBlogs(
      id,
      data,
      params,
      navigate,
      setIsDeleting,
      setDeleteItemId,
      setNotify,
      queryClient
    )
    expect(apiDeleteBlogSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete',
    })
  })
  test('should delete', async () => {
    apiDeleteBlogSpy.mockResolvedValue({
      data: { _id: 'abc' },
      error: undefined,
    } as any)
    await deleteBlogFromListofBlogs(
      id,
      data,
      params,
      navigate,
      setIsDeleting,
      setDeleteItemId,
      setNotify,
      queryClient
    )
    expect(apiDeleteBlogSpy).toBeCalledTimes(1)
    expect(queryClient.setQueryData).toBeCalledTimes(1)
    expect(navigate).toBeCalledTimes(1)
  })
})

describe('Delete single blog', () => {
  const apiDeleteBlogSpy = jest.spyOn(blogApis, 'apiDeleteBlog')

  const id = 'abc'
  const navigate = jest.fn()
  const setIsDeleting = jest.fn()

  const setNotify = jest.fn()
  const queryClient = {
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
  } as any

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should fail to delete', async () => {
    apiDeleteBlogSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    await deleteSingleBlog(id, navigate, setIsDeleting, setNotify, queryClient)
    expect(apiDeleteBlogSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete blog',
    })
  })
  test('should fail to delete', async () => {
    apiDeleteBlogSpy.mockResolvedValue({ data: undefined, error: 'Err' })
    await deleteSingleBlog(id, navigate, setIsDeleting, setNotify, queryClient)
    expect(apiDeleteBlogSpy).toBeCalledTimes(1)
    expect(setNotify).toBeCalledWith({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete blog',
    })
  })
  test('should  delete', async () => {
    apiDeleteBlogSpy.mockResolvedValue({
      data: { _id: 'abc' },
      error: undefined,
    } as any)
    await deleteSingleBlog(id, navigate, setIsDeleting, setNotify, queryClient)
    expect(apiDeleteBlogSpy).toBeCalledTimes(1)
    expect(queryClient.removeQueries).toBeCalledTimes(1)
    expect(navigate).toBeCalledTimes(1)
  })
})
