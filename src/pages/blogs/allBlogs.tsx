import dayjs from 'dayjs'
import React, { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DustBinIcon from '../../components/svgs/dustbin'
import EditIcon from '../../components/svgs/edit'
import PlusIcon from '../../components/svgs/plus'
import Confirmation from '../../components/ui/confirmation'
import DashPageHeader from '../../components/ui/dashPageHeader'
import Search from '../../components/ui/search'
import { useNotify } from '../../contexts/notify'
import { deleteBlogFromListofBlogs } from '../../helpers/blogHelper'
import { getBlogs, GetBlogsParams } from '../../queries/blogsQueries'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import {
  TableDetailsThumbnailWrapper,
  TableList,
  TableThumbnail,
} from '../../styled/table'

const AllBlogs = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setNotify } = useNotify()

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  const params: GetBlogsParams = {
    page,
    limit: 25,
  }

  if (query) {
    params.title = query
  }

  const { data, isLoading, isError } = getBlogs(params)

  const items =
    data &&
    data.items &&
    data.items.length > 0 &&
    data.items.sort(function (a: any, b: any) {
      return (
        (b.createdAt ? (new Date(b.createdAt) as any) : 0) -
        (a.createdAt ? (new Date(a.createdAt) as any) : 0)
      )
    })

  if (items && data && data.items && data.items.length > 0) {
    data.items = items
  }
  const handleDeleteBlog = async (id: string) => {
    return await deleteBlogFromListofBlogs(
      id,
      data,
      params,
      navigate,
      setIsDeleting,
      setDeleteItemId,
      setNotify,
      queryClient
    )
  }
  // const deleteBlog = async (id: string) => {
  //   setIsDeleting(true)
  //   const { data: resData, error } = await apiDeleteBlog(id)
  //   if (error || !resData || !resData._id) {
  //     setNotify({
  //       type: 'danger',
  //       heading: 'Err!',
  //       message: 'Failed to delete',
  //     })
  //   } else {
  //     const newData = data.items.filter((item: any) => item._id !== resData._id)
  //     queryClient.setQueryData(['blogs', params], { ...data, items: newData })
  //     navigate('/blogs')
  //   }
  //   setDeleteItemId('')
  //   setIsDeleting(false)
  // }

  const handleSearch = () => {
    setQuery(searchValue)
  }

  return (
    <Fragment>
      <DashPageHeader title="Blogs">
        {data && (
          <Button
            btnType="primary"
            size="lg"
            onClick={() => navigate(`/blogs/${'new'}`)}
          >
            <PlusIcon color="#fff" size="0.8rem" /> &nbsp; Create Blog
          </Button>
        )}
      </DashPageHeader>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load Blogs!</h3>
        </div>
      ) : isLoading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Loading</LoadingDots>
        </LoadingWrapper>
      ) : data && data.items ? (
        <Fragment>
          <SearchWrapper>
            <Search
              placeholder={'Title of the blog'}
              value={searchValue}
              setValue={setSearchValue}
              handleSubmit={() => handleSearch()}
              style={{ width: '100%' }}
            />
          </SearchWrapper>
          <Confirmation
            title="Delete"
            msg="Are you sure?"
            show={deleteItemId ? true : false}
          >
            <Button
              btnType="primary"
              size="lg"
              onClick={() => setDeleteItemId('')}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              btnType="ghost"
              size="lg"
              onClick={() => deleteItemId && handleDeleteBlog(deleteItemId)}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner size="1.2rem" type="white" /> : 'Delete'}
            </Button>
          </Confirmation>
          <TableList>
            <thead>
              <tr>
                <th style={{ width: 'auto' }}></th>
                <th style={{ width: '175px' }}>Date</th>
                <th style={{ width: '175px' }}>Status</th>
                <th style={{ width: '110px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length > 0 &&
                data.items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>
                      <Link to={`/blogs/${item._id}`}>
                        <TableDetailsThumbnailWrapper>
                          <TableThumbnail>
                            {item.image && <img src={item.image} />}
                          </TableThumbnail>
                          <div>
                            <b className="line-clamp-1">
                              {item.title || 'Untitled'}
                            </b>
                            <p className="line-clamp-2">
                              {item.short_description}
                            </p>
                          </div>
                        </TableDetailsThumbnailWrapper>
                      </Link>
                    </td>
                    <td>{dayjs(item.createdAt).format('DD MMM, YYYY')}</td>
                    <td>
                      <Status type={item.status}>{item.status}</Status>
                    </td>
                    <td>
                      <ActionsWrapper>
                        <IconWrapper
                          data-test-id="edit-blog"
                          color="blue"
                          backgroundColor="#0066cc4a"
                          onClick={() => navigate(`/blogs/${item._id}`)}
                        >
                          <EditIcon />
                        </IconWrapper>
                        <IconWrapper
                          data-test-id="delete-blog"
                          color="red"
                          backgroundColor="#e6000038"
                          onClick={() => setDeleteItemId(item._id)}
                        >
                          <DustBinIcon />
                        </IconWrapper>
                      </ActionsWrapper>
                    </td>
                  </tr>
                ))}
            </tbody>
          </TableList>
          {data.items.length === 0 ? (
            <div className="align-center" style={{ height: '30vh' }}>
              <h3>No Blogs!</h3>
            </div>
          ) : (
            <PaginationWrapper>
              <Button
                btnType="secondary"
                disabled={page === 0}
                onClick={() => handlePage('prev')}
              >
                Previous
              </Button>
              <Button
                btnType="secondary"
                disabled={page + 1 >= Math.ceil(data.total / data.limit)}
                onClick={() => handlePage('next')}
              >
                Next
              </Button>
            </PaginationWrapper>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default AllBlogs

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem;
`

const Status = styled.span<{ type: string }>`
  padding: 0.2rem;
  width: 90px;
  display: flex;
  text-align: center;
  justify-content: center;
  background-color: ${({ theme, type }) =>
    type === 'published' ? theme.shades.success : '#eee'};
  color: ${({ type }) => (type === 'published' ? '#008a00' : '#343434')};
  border: 1px solid;
  border-radius: 4px;
  border-color: ${({ type }) =>
    type === 'published' ? '#008a0029' : '#ddddddc4'};
`
const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-direction: column; */
`

const IconWrapper = styled.div<{ color: string; backgroundColor: string }>`
  background-color: #eee;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease 300ms;
  &:hover {
    svg {
      path {
        fill: ${({ color }) => color};
      }
    }
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
`
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
