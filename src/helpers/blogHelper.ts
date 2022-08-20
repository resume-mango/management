import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { QueryClient } from 'react-query'
import { NavigateFunction } from 'react-router-dom'
import {
  apiDeleteBlog,
  apiDeleteBlogImage,
  apiUpdateBlog,
  apiUploadBlogImage,
} from '../apis/blog'
import { GetBlogsParams } from '../queries/blogsQueries'

/**
 * Uploads single blog image
 * @param id blog _id
 * @param file image file
 * @param setImageLoading setStateFn
 * @param setImage setStateFn
 * @param setValue from useForm or useFormContext
 * @param setNotify from useNotify
 * @param queryClient from useQueryClient
 */
export const uploadBlogImage = async (
  id: string,
  file: File,
  // getValues: UseFormGetValues<any>,
  // reset: UseFormReset<any>,
  setImageLoading: (_val: any) => void,
  setImage: (_val: any) => void,
  setValue: UseFormSetValue<any>,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  setImageLoading(true)
  const formData = new FormData()
  formData.append('blog-image', file)
  try {
    const { data: resData, error } = await apiUploadBlogImage(id, formData)
    if (error || !resData || !resData._id) {
      throw new Error('Failed to upload image')
    } else {
      // const initialData = getValues()

      // const { title, short_description, content, status, image, slug } = resData

      // const isEqual =
      //   JSON.stringify(initialData) ===
      //   JSON.stringify({
      //     title,
      //     short_description,
      //     content,
      //     status,
      //     image,
      //     slug,
      //   })

      setValue('image', resData.image)
      // initialData.image = resData.image
      // queryClient.setQueryData(['blog', resData._id], resData)
      queryClient.removeQueries('blogs')

      // if (!isEqual) {
      //   console.log({ isEqual, initialData })
      //   reset(
      //     {
      //       title: initialData.title,
      //       short_description: initialData.short_description,
      //       content: initialData.content,
      //       status: initialData.status,
      //       image: initialData.image,
      //       slug: initialData.slug,
      //     },
      //     { keepDirty: true, keepValues: true }
      //   )
      // }
    }
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to upload image',
    })
  }
  setImage(null)
  setImageLoading(false)
}

/**
 * Deletes single blog image
 * @param id blog _id
 * @param setValue from useForm / useFormContext()
 * @param setImageLoading setStateFn()
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 */
export const deleteBlogImage = async (
  id: string,
  setValue: UseFormSetValue<any>,
  setImageLoading: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  setImageLoading(true)
  try {
    const { data: resData, error } = await apiDeleteBlogImage(id)
    if (error || !resData || !resData._id) {
      throw Error('Failed to delete image')
    } else {
      setValue('image', resData.image)
      queryClient.setQueryData(['blog', resData._id], resData)
      queryClient.removeQueries('blogs')
    }
  } catch (err) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete image',
    })
  }
  setImageLoading(false)
}

/**
 * Updates blog data
 * @param initialData blog data
 * @param data fill form data
 * @param reset from useForm() / useFormContext()
 * @param setError from useForm() / useFormContext()
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 */
export const updateBlog = async (
  initialData: Record<string, any>,
  data: Record<string, any>,
  reset: UseFormReset<any>,
  setError: UseFormSetError<any>,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  const { data: resData, error } = await apiUpdateBlog(initialData._id, data)
  if (error || !resData || !resData._id) {
    if (error === 'slug already in use!') {
      setError('slug', {
        type: 'manual',
        message: 'Duplicate slug - already in use',
      })
    }
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to update blog',
    })
  } else {
    queryClient.setQueryData(['blog', resData._id], resData)
    queryClient.removeQueries('blogs')

    reset({}, { keepValues: true })
  }
}

/**
 * Deletes single blog
 * @param id blog _id
 * @param data all blogs list
 * @param params querykey cache identifier
 * @param navigate form useNavigate
 * @param setIsDeleting setStateFn
 * @param setDeleteItemId setStateFn
 * @param setNotify from useNotify()
 * @param queryClient from useQueryClient()
 */
export const deleteBlogFromListofBlogs = async (
  id: string,
  data: Record<string, any>,
  params: GetBlogsParams,
  navigate: NavigateFunction,
  setIsDeleting: (val: any) => void,
  setDeleteItemId: (val: any) => void,
  setNotify: (val: any) => void,
  queryClient: QueryClient
) => {
  setIsDeleting(true)
  const { data: resData, error } = await apiDeleteBlog(id)
  if (error || !resData || !resData._id) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete',
    })
  } else {
    const newData = data.items.filter((item: any) => item._id !== resData._id)
    queryClient.setQueryData(['blogs', params], { ...data, items: newData })
    navigate('/blogs')
  }
  setDeleteItemId('')
  setIsDeleting(false)
}

/**
 * Deletes Single Blog
 * @param id blog _id
 * @param navigate from useNavigate()
 * @param setIsDeleting setStateFn
 * @param setNotify setStateFn
 * @param queryClient from useQueryClient()
 */
export const deleteSingleBlog = async (
  id: string,
  navigate: NavigateFunction,
  setIsDeleting: (_val: any) => void,
  setNotify: (_val: any) => void,
  queryClient: QueryClient
) => {
  setIsDeleting(true)
  const { data: resData, error } = await apiDeleteBlog(id)
  if (error || !resData || !resData._id) {
    setNotify({
      type: 'danger',
      heading: 'Err!',
      message: 'Failed to delete blog',
    })
  } else {
    queryClient.removeQueries('blogs')
    navigate('/blogs')
  }
  setIsDeleting(false)
}
