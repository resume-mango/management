import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import DashPageHeader from '../../components/ui/dashPageHeader'
import Search from '../../components/ui/search'
import Select from '../../components/ui/select'
import { getUsers, GetUsersListParams } from '../../queries/userQueries'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import {
  TableDetailsThumbnailWrapper,
  TableList,
  TableThumbnail,
} from '../../styled/table'

const searchOptions = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'User ID', name: 'app_metadata.ref' },
]

const AllUsers = () => {
  const [searchByValue, setSearchByValue] = useState<string>(
    searchOptions[0].name
  )
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [query, setQuery] = useState<string | undefined>(undefined)

  const createQuery = (feild: string) => {
    if (searchValue) {
      switch (feild) {
        case 'name':
          return `${feild}:*${searchValue}*`
        case 'email':
          return `${feild}:*${searchValue}*`
        case 'app_metadata.ref':
          return `${feild}:"${searchValue}"`
        default:
          return ''
      }
    } else return ''
  }
  const params: GetUsersListParams = {
    page,
    per_page: 25,
    include_totals: true,
    sort: 'last_login:-1',
  }

  if (query) {
    params.q = query
  }

  const { data, isLoading, isError, isRefetching } = getUsers(params)
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  useEffect(() => {
    setSearchValue('')
  }, [searchByValue])

  const handleSearch = () => {
    if (searchValue.length === 0) return
    setQuery(createQuery(searchByValue))
  }

  const handleReset = () => {
    setSearchByValue(searchOptions[0].name)
    setSearchValue('')
    setQuery(undefined)
  }

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  return (
    <Fragment>
      <DashPageHeader title="Users" border></DashPageHeader>
      <Wrapper>
        {isError ? (
          <div className="align-center" style={{ height: '30vh' }}>
            <h3>Failed to load Users!</h3>
          </div>
        ) : isLoading ? (
          <LoadingWrapper>
            <Spinner type="primary" size="2rem" />
            <LoadingDots color="#f08438">Loading</LoadingDots>
          </LoadingWrapper>
        ) : data ? (
          <Fragment>
            {isRefetching && <Loader />}
            <ActionsWrapper>
              <div className="action-item">
                <Search
                  placeholder={
                    searchByValue === 'name'
                      ? 'eg: Jhon Doe'
                      : searchByValue === 'email'
                      ? 'eg: jhondoe@example.com'
                      : 'Search'
                  }
                  value={searchValue}
                  setValue={setSearchValue}
                  handleSubmit={() => handleSearch()}
                />
              </div>
              <div className="action-item">
                <Select
                  name="Search By"
                  options={searchOptions}
                  value={searchByValue}
                  setValue={setSearchByValue}
                />
              </div>
              <div className="action-item">
                <Button
                  btnType="ghost"
                  size="lg"
                  width="100%"
                  onClick={() => handleReset()}
                >
                  <CrossIcon size="0.7rem" />
                  <span style={{ marginLeft: '0.5rem' }}>Reset</span>
                </Button>
              </div>
            </ActionsWrapper>
            <TableList>
              <thead>
                <tr>
                  <th style={{ width: 'auto' }}>Name</th>
                  <th style={{ width: '15%' }}>Provider</th>
                  <th style={{ width: '15%' }}>Logins</th>
                  <th style={{ width: '15%' }}>Last Login</th>
                  <th style={{ width: '15%' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.users &&
                  data.users.length > 0 &&
                  data.users.map((item: any, i: number) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/users/${item.user_id}/details`}>
                          <TableDetailsThumbnailWrapper>
                            <TableThumbnail size="40px" rounded={true}>
                              {item.picture && <img src={item.picture} />}
                            </TableThumbnail>
                            <div>
                              <b className="line-clamp-1">{item.name}</b>
                              <p className="line-clamp-2">{item.email}</p>
                            </div>
                          </TableDetailsThumbnailWrapper>
                        </Link>
                      </td>
                      <td>{item.identities.map((val: any) => val.provider)}</td>
                      <td>{item.logins_count}</td>
                      <td>
                        {item.last_login && dayjs(item.last_login).fromNow()}
                      </td>
                      <td>{dayjs(item.created_at).format('DD MMM YYYY')}</td>
                    </tr>
                  ))}
              </tbody>
            </TableList>
            {data && data.users && data.users.length === 0 ? (
              <div className="align-center" style={{ height: '30vh' }}>
                <h3>No Users!</h3>
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
      </Wrapper>
    </Fragment>
  )
}

export default AllUsers

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`
const Loader = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #00000017;
`

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 30% 10%;
  padding: 1.5rem;
  .action-item {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
