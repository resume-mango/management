import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotify } from '../../contexts/notify'
import useExitPrompt from '../../hooks/useExitPromt'
import { LoadingDots, Spinner } from '../../styled/loader'
import Confirmation from '../../components/ui/confirmation'
import { Button } from '../../styled/button'
import BackArrow from '../../components/svgs/backArrow'
import { InvalidFeedBack } from '../../styled/form'
import Input from '../../components/form/Input'
import TextArea from '../../components/form/textarea'
import RichTextEditor from '../../components/form/RichTextEditor'
import DustBinIcon from '../../components/svgs/dustbin'
import PlusIcon from '../../components/svgs/plus'
import DropButton from '../../components/ui/DropButton'
import Modal from '../../components/ui/modal'
import Dropzone from '../../components/ui/dropzone'
import { blogSchema } from '../../validations/blog'
import { getSingleBlog } from '../../queries/blogsQueries'

import RouterPrompt from '../../components/ui/routerPrompt'
import {
  deleteBlogImage,
  deleteSingleBlog,
  updateBlog,
  uploadBlogImage,
} from '../../helpers/blogHelper'

interface IForm {
  title: string
  short_description: string
  slug: string
  status: string
  image: string
  content: string
}

const EditBlog = () => {
  const [showStatus, setShowStatus] = useState(false)
  const [image, setImage] = useState(null)
  const [showDrop, setShowDrop] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setNotify } = useNotify()
  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)

  const defaultValues = {
    title: '',
    short_description: '',
    content: '',
    status: 'draft',
    image: '',
    slug: '',
  }

  const methods = useForm<IForm>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(blogSchema),
  })

  const handleStatus = (name: any, value: string) => {
    setValue(name, value)
    setShowStatus(false)
  }

  const {
    handleSubmit,
    setValue,
    watch,
    setFocus,
    reset,
    setError,
    getValues,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = methods

  const formData = watch()

  const {
    data: initialData,
    isLoading,
    isError,
  } = getSingleBlog(id ? id : '', true)

  const uploadImage = async (file: File, id: string) => {
    return await uploadBlogImage(
      id,
      file,
      // getValues,
      // reset,
      setImageLoading,
      setImage,
      setValue,
      setNotify,
      queryClient
    )
  }
  const deleteImage = async (id: string) => {
    return await deleteBlogImage(
      id,
      setValue,
      setImageLoading,
      setNotify,
      queryClient
    )
  }
  const saveBlog = async (data: any) => {
    return await updateBlog(
      initialData,
      data,
      reset,
      setError,
      setNotify,
      queryClient
    )
  }

  const deleteBlog = async (id: string) => {
    return await deleteSingleBlog(
      id,
      navigate,
      setIsDeleting,
      setNotify,
      queryClient
    )
  }

  // const uploadImage = async (file: File, id: string) => {
  //   setImageLoading(true)
  //   const formData = new FormData()
  //   formData.append('blog-image', file)
  //   try {
  //     const { data: resData, error } = await apiUploadBlogImage(id, formData)
  //     if (error || !resData || !resData._id) {
  //       setNotify({
  //         type: 'danger',
  //         heading: 'Err!',
  //         message: 'Failed to upload image',
  //       })
  //     } else {
  //       setValue('image', resData.image)
  //       queryClient.setQueryData(['blog', resData._id], resData)
  //       queryClient.removeQueries('blogs')
  //     }
  //   } catch (err) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to upload image',
  //     })
  //   }
  //   setImage(null)
  //   setImageLoading(false)
  // }

  // const deleteImage = async (id: string) => {
  //   setImageLoading(true)
  //   try {
  //     const { data: resData, error } = await apiDeleteBlogImage(id)
  //     if (error || !resData || !resData._id) {
  //       setNotify({
  //         type: 'danger',
  //         heading: 'Err!',
  //         message: 'Failed to delete image',
  //       })
  //     } else {
  //       setValue('image', resData.image)
  //       queryClient.setQueryData(['blog', resData._id], resData)
  //       queryClient.removeQueries('blogs')
  //     }
  //   } catch (err) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to delete image',
  //     })
  //   }
  //   setImageLoading(false)
  // }

  useEffect(() => {
    if (!image) return
    uploadImage(image, initialData._id)
    return setShowDrop(false)
  }, [image])

  useEffect(() => {
    if (!initialData) return

    const blogData = {
      title: initialData.title || '',
      short_description: initialData.short_description || '',
      content: initialData.content || '',
      status: initialData.status || 'draft',
      image: initialData.image || '',
      slug: initialData.slug || '',
    }
    return reset(blogData, {
      keepDirty: false,
    })
  }, [initialData])

  // const saveBlog = async (data: any) => {
  //   const { data: resData, error } = await apiUpdateBlog(initialData._id, data)
  //   if (error || !resData || !resData._id) {
  //     if (error === 'duplicate slug') {
  //       setError('slug', {
  //         type: 'manual',
  //         message: 'Duplicate slug - already in use',
  //       })
  //     }
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to update blog',
  //     })
  //   } else {
  //     queryClient.setQueryData(['blog', resData._id], resData)
  //     queryClient.removeQueries('blogs')

  //     reset({}, { keepValues: true })
  //   }
  // }

  // const deleteBlog = async (id: string) => {
  //   setIsDeleting(true)
  //   const { data: resData, error } = await apiDeleteBlog(id)
  //   if (error || !resData || !resData._id) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to delete blog',
  //     })
  //   } else {
  //     queryClient.removeQueries('blogs')
  //     navigate('/blogs')
  //   }
  //   setIsDeleting(false)
  // }

  useEffect(() => {
    if (isDirty || !isValid || isSubmitting) {
      setShowExitPrompt(true)
    } else {
      setShowExitPrompt(false)
    }
  }, [isDirty, isSubmitting, isValid])

  return (
    <Fragment>
      <FormProvider {...methods}>
        {isError ? (
          <div className="align-center" style={{ height: '30vh' }}>
            <h3>Failed to load editor!</h3>
          </div>
        ) : isLoading ? (
          <LoadingWrapper>
            <Spinner type="primary" size="2rem" />
            <LoadingDots color="#f08438">Loading Blog</LoadingDots>
          </LoadingWrapper>
        ) : initialData ? (
          <Fragment>
            <RouterPrompt show={showExitPrompt} setShow={setShowExitPrompt} />

            <Confirmation
              title="Delete"
              msg="Are you sure?"
              show={showDeleteModal}
            >
              <Button
                btnType="primary"
                size="lg"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                btnType="ghost"
                size="lg"
                onClick={() => initialData._id && deleteBlog(initialData._id)}
                disabled={isDeleting}
              >
                {isDeleting ? <Spinner size="1.2rem" type="white" /> : 'Delete'}
              </Button>
            </Confirmation>

            <Wrapper>
              <Button
                btnType="ghost"
                size="lg"
                style={{ width: 'fit-content', padding: '0 1rem' }}
                onClick={() => navigate('/blogs')}
                data-test-id="go-back"
              >
                <BackArrow size="1.4rem" />
              </Button>
              <GridWrapper>
                <div>
                  <div className="mb-2">
                    <Input
                      name="title"
                      label="Title"
                      disabled={isSubmitting || imageLoading}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Slug</label>
                    <InputWrapper
                      onClick={() => setFocus('slug')}
                      className={
                        isSubmitting || imageLoading ? 'disabled-input' : ''
                      }
                    >
                      <p>www.resumemango.com/blog/</p>
                      <Input
                        name="slug"
                        style={{ width: '100%' }}
                        hideError
                        disabled={isSubmitting || imageLoading}
                      />
                    </InputWrapper>
                    {errors.slug && (
                      <InvalidFeedBack className="invalid-feild">
                        {errors.slug.message}
                      </InvalidFeedBack>
                    )}
                  </div>
                  <div className="mb-2">
                    <TextArea
                      name="short_description"
                      label="Short Description"
                      style={{ minHeight: '110px' }}
                      disabled={isSubmitting || imageLoading}
                    />
                  </div>

                  <div className="mb-2">
                    <label>Content</label>
                    <RichTextEditor
                      disabled={isSubmitting || imageLoading}
                      name="content"
                      formats={[
                        'bold',
                        'italic',
                        'underline',
                        'list',
                        'bullet',
                        'header',
                      ]}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link'],
                          ['clean'],
                        ],
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: '1px solid #eee',
                    marginLeft: '1.5rem',
                    paddingLeft: '1.5rem',
                  }}
                >
                  <RHSWrapper>
                    <label>Image</label>
                    <ImageWrapper
                      onClick={() => !formData.image && setShowDrop(true)}
                      image={
                        formData.image && !imageLoading
                          ? formData.image
                          : undefined
                      }
                      className={!formData.image ? 'img-empty' : 'img-filled'}
                    >
                      {imageLoading ? (
                        <Spinner type="primary" size="1.5rem" />
                      ) : (
                        <Fragment>
                          <span
                            className="icon"
                            onClick={() => setShowDrop(true)}
                          >
                            <PlusIcon size="1rem" className="stroke-svg" />
                          </span>
                          {formData.image && (
                            <span
                              className="icon"
                              onClick={() => deleteImage(initialData._id)}
                            >
                              <DustBinIcon size="1rem" className="path-svg" />
                            </span>
                          )}
                        </Fragment>
                      )}
                    </ImageWrapper>

                    <div
                      style={{
                        borderTop: '1px solid #eee',
                        paddingTop: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <DropButton
                        vertical="bottom"
                        horizontal="right"
                        show={showStatus}
                        setShow={setShowStatus}
                        btnStyle={{
                          textTransform: 'capitalize',
                          fontSize: '0.875rem',
                          background: 'rgba(244,245,247,1)',
                          padding: '0.7rem',
                          width: '150px',
                          borderRadius: '4px',
                        }}
                      >
                        <DropButton.Button>
                          <span>Status&nbsp;:&nbsp;</span>{' '}
                          <span
                            style={{
                              color: `${
                                formData.status === 'published'
                                  ? 'rgba(32, 192, 50, 1)'
                                  : '#343434'
                              }`,
                            }}
                          >
                            {formData.status}
                          </span>
                        </DropButton.Button>
                        <DropButton.Item>
                          <a onClick={() => handleStatus('status', 'draft')}>
                            Draft
                          </a>
                        </DropButton.Item>

                        <DropButton.Item>
                          <a
                            onClick={() => handleStatus('status', 'published')}
                          >
                            Published
                          </a>
                        </DropButton.Item>
                      </DropButton>
                    </div>
                    <DetailsWrapper>
                      <p>Created By</p>
                      <p>{initialData.created_by.name || '-'}</p>
                      <p>Last Modified</p>
                      <p>
                        {dayjs(initialData.updatedAt).format(
                          'DD MMM, YYYY hh:mm a'
                        ) || '-'}
                      </p>
                      <p>Created Date</p>
                      <p>
                        {dayjs(initialData.createdAt).format(
                          'DD MMM, YYYY hh:mm a'
                        ) || '-'}
                      </p>
                    </DetailsWrapper>
                    <FlexWrapper>
                      <Button
                        btnType="primary"
                        size="lg"
                        onClick={() => handleSubmit(saveBlog)()}
                        disabled={
                          isSubmitting ||
                          !isDirty ||
                          isLoading ||
                          isDeleting ||
                          !isValid
                        }
                      >
                        {isSubmitting ? (
                          <Spinner size="1.2rem" type="white" />
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                      <Button
                        btnType="ghost"
                        size="lg"
                        disabled={isSubmitting || isLoading || isDeleting}
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete
                      </Button>
                    </FlexWrapper>
                  </RHSWrapper>
                </div>
              </GridWrapper>
            </Wrapper>
            <Modal show={showDrop} setShow={setShowDrop}>
              <Dropzone setImage={setImage} setShow={setShowDrop} />
            </Modal>
          </Fragment>
        ) : null}
      </FormProvider>
    </Fragment>
  )
}

export default EditBlog

const Wrapper = styled.div`
  padding: 2rem 1.5rem 4rem;
  min-height: 100vh;
`
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  justify-content: space-between;
  height: 100%;
  margin-top: 2rem;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 1rem;
`

const ImageWrapper = styled.div<{ image: string | undefined }>`
  background: ${({ image }) =>
    image ? `url("${image}")` : 'rgba(244, 245, 247, 1)'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  &::before {
    display: block;
    content: '';
    position: absolute;
    background-color: #000000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: ease 0.3s;
  }

  img {
    width: 100%;
    height: 100%;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3e3e3;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: ease 0.3s;
    margin: 0 0.5rem;
    user-select: none;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
  &.img-empty {
    cursor: pointer;
  }
  &.img-filled {
    .icon {
      opacity: 0;
      pointer-events: none;
    }
  }
  &.img-filled:hover {
    &::before {
      opacity: 0.3;
    }
    .icon {
      opacity: 1;
      pointer-events: auto;
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        .stroke-svg {
          path {
            stroke: #fff;
          }
        }
        .path-svg {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
  &.img-empty:hover {
    .icon {
      background-color: ${({ theme }) => theme.shades.primary[4]};
      .stroke-svg {
        path {
          stroke: ${({ theme }) => theme.colors.primary};
        }
      }
      .path-svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`

const RHSWrapper = styled.div`
  position: sticky;
  top: 20px;
`

const DetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  p {
    font-size: 0.8rem;
    margin-top: 0;
  }
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
`

const InputWrapper = styled.div`
  background-color: rgba(244, 245, 247, 1);
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-radius: 6px;
  cursor: text;
  p {
    color: rgba(135, 135, 135, 1);
    margin: 0;
  }
  input {
    padding-left: 0;
  }
`
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  p {
    margin-top: 1rem;
  }
`
