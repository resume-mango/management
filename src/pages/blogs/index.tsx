import React, { Fragment, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { apiCreateBlog } from '../../apis/blog'
import { LoadingDots, Spinner } from '../../styled/loader'
import AllBlogs from './allBlogs'
import EditBlog from './editBlog'

const Blogs = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path={'/:id'} element={<SingleBlog />} />
      </Routes>
    </Fragment>
  )
}

const SingleBlog = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleCreate = async () => {
    setLoading(true)
    try {
      const { data, error } = await apiCreateBlog()
      if (error || !data || !data._id) {
        console.log(error)
      } else {
        const blogsData: any = queryClient.getQueryData('blogs')
        if (blogsData) {
          blogsData.unshift(data)
          queryClient.setQueryData('blogs', blogsData)
        }
        queryClient.setQueryData(['blog', data._id], data)
        navigate(`/blogs/${data._id}`, { replace: true })
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (id === 'new') {
      handleCreate()
    }
    return
  }, [id])

  return (
    <Fragment>
      {id === 'new' || loading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Creating New Blog</LoadingDots>
        </LoadingWrapper>
      ) : (
        <EditBlog />
      )}
    </Fragment>
  )
}

export default Blogs

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
