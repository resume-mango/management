import dayjs from 'dayjs'
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getSubscriptions } from '../../queries/subscriptionQueries'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import { TableList } from '../../styled/table'

const UserSubscriptions = ({ id }: { id: string }) => {
  const [page, setPage] = useState(0)

  const navigate = useNavigate()
  const params = {
    q: `user_id:"${id}"`,
    page,
    limit: 20,
  }

  const { data, isLoading, isError } = getSubscriptions(params, !!id)

  const Empty = (
    <div className="align-center" style={{ height: '30vh' }}>
      <h3>No memberships!</h3>
    </div>
  )

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  if (!id) return Empty
  else
    return (
      <Fragment>
        {isError ? (
          <div className="align-center" style={{ height: '30vh' }}>
            <h3>Failed to load memberships!</h3>
          </div>
        ) : isLoading ? (
          <LoadingWrapper>
            <Spinner type="primary" size="2rem" />
            <LoadingDots color="#f08438">Loading</LoadingDots>
          </LoadingWrapper>
        ) : data ? (
          <Fragment>
            {data.items.length === 0 ? (
              Empty
            ) : (
              <Fragment>
                <TableList className="mb-4" borderTop={false}>
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
                    {data.items &&
                      data.items.length > 0 &&
                      data.items.map((sub: Record<string, any>, i: number) => (
                        <tr
                          className="hover"
                          key={i}
                          onClick={() => navigate(`/subscriptions/${sub._id}`)}
                        >
                          <td>{sub._id}</td>
                          <td className="capitalize">
                            {sub.name || 'Unknown'} plan
                          </td>
                          <td>
                            ${sub.amount || '0.00'}&nbsp;
                            {sub.currency && sub.currency.toUpperCase()}
                          </td>
                          <td className="capitalize">
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
                          </td>
                          <td>
                            {sub.create_time
                              ? dayjs(sub.create_time).format('DD MMM YYYY')
                              : '-'}
                          </td>
                          <td>
                            {sub.ended_time
                              ? dayjs(sub.ended_time).format('DD MMM YYYY')
                              : '-'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </TableList>

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
              </Fragment>
            )}
          </Fragment>
        ) : null}
      </Fragment>
    )
}

export default UserSubscriptions

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
