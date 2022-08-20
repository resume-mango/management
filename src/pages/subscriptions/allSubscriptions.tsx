import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import DashPageHeader from '../../components/ui/dashPageHeader'
import Search from '../../components/ui/search'
import Select from '../../components/ui/select'
import {
  getSubscriptions,
  GetSubscriptionsParams,
} from '../../queries/subscriptionQueries'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import { TableList } from '../../styled/table'

const searchOptions = [
  { label: 'User ID', name: 'user_id' },
  { label: 'Subscription ID', name: 'subscription_id' },
]

const AllSubscriptions = () => {
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchByValue, setSearchByValue] = useState(searchOptions[0].name)
  const [query, setQuery] = useState<string | undefined>(undefined)

  const createQuery = (feild: string) => {
    switch (feild) {
      case 'user_id':
        return `user_id:"${searchValue}"`
      case 'subscription_id':
        return `subscription_id:"${searchValue}"`
      default:
        return undefined
    }
  }

  const params: GetSubscriptionsParams = { limit: 25, page }

  if (query) {
    params.q = query
  }

  const { data, isLoading, isError } = getSubscriptions(params)

  useEffect(() => {
    if (searchByValue === 'all') {
      setQuery('')
    }
    setSearchValue('')
  }, [searchByValue])

  const handleReset = () => {
    setSearchByValue(searchOptions[0].name)
    setSearchValue('')
    setQuery(undefined)
  }

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  const handleSearch = () => {
    if (searchValue.length === 0) return
    setQuery(createQuery(searchByValue))
  }

  const Empty = (
    <div className="align-center" style={{ height: '30vh' }}>
      <h3>No Subscriptions Found!</h3>
    </div>
  )

  const Loading = (
    <LoadingWrapper>
      <Spinner type="primary" size="2rem" />
      <LoadingDots color="#f08438">Loading</LoadingDots>
    </LoadingWrapper>
  )

  return (
    <Fragment>
      <DashPageHeader title="Subscriptions" border></DashPageHeader>
      <Wrapper>
        {isError ? (
          <div className="align-center" style={{ height: '30vh' }}>
            <h3>Failed to load Subscriptions!</h3>
          </div>
        ) : isLoading && page === 0 ? (
          Loading
        ) : (
          <Fragment>
            <ActionsWrapper>
              <div className="action-item">
                <Search
                  placeholder={
                    searchByValue === 'subscription_id'
                      ? 'eg: 61c78fea0355ed7123fe0700'
                      : searchByValue === 'user_id'
                      ? 'eg: 61c78fea0355ed7123fe0700'
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
            <Fragment>
              <TableList className="mb-4">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>ID</th>
                    <th style={{ width: 'auto' }}>Plan Name</th>
                    <th style={{ width: '10%' }}>Amount</th>
                    <th style={{ width: '15%' }}>Status</th>
                    <th style={{ width: '15%' }}>Created</th>
                    <th style={{ width: '15%' }}>Ended</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.items &&
                    data.items.length > 0 &&
                    data.items.map((sub: Record<string, any>, i: number) => (
                      <tr key={i}>
                        <td>
                          <Link to={`/subscriptions/${sub._id}`}>
                            <span>{sub._id}</span>
                          </Link>
                        </td>
                        <td className="capitalize">
                          <Link to={`/subscriptions/${sub._id}`}>
                            {sub.name || 'Unknown'} plan
                          </Link>
                        </td>
                        <td>
                          <Link to={`/subscriptions/${sub._id}`}>
                            ${sub.amount || '0.00'}&nbsp;
                            {sub.currency && sub.currency.toUpperCase()}
                          </Link>
                        </td>
                        <td className="capitalize">
                          <Link to={`/subscriptions/${sub._id}`}>
                            {sub.status && sub.status === 'active' ? (
                              <Badge
                                type="success"
                                size="sm"
                                style={{ minWidth: '100px' }}
                              >
                                {sub.status}
                              </Badge>
                            ) : (
                              <Badge
                                type="ghost"
                                size="sm"
                                style={{ minWidth: '100px' }}
                              >
                                {sub.status}
                              </Badge>
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/subscriptions/${sub._id}`}>
                            {sub.create_time
                              ? dayjs(sub.create_time).format('DD MMM YYYY')
                              : '-'}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/subscriptions/${sub._id}`}>
                            {sub.ended_time
                              ? dayjs(sub.ended_time).format('DD MMM YYYY')
                              : '-'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </TableList>

              {isLoading && page !== 0 && Loading}
              {data && data.items.length === 0 && Empty}
              {data && data.items.length > 0 && (
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
          </Fragment>
        )}
      </Wrapper>
    </Fragment>
  )
}

export default AllSubscriptions

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  margin-bottom: 3rem;
`

const ActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 30% 10%;
  padding: 1.5rem;
  width: 100%;
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
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
