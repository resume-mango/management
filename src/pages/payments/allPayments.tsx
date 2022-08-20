import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import DashPageHeader from '../../components/ui/dashPageHeader'
import Search from '../../components/ui/search'
import Select from '../../components/ui/select'
import {
  getPayments,
  IGetPaymentQueryParams,
} from '../../queries/paymentQueries'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import { TableList } from '../../styled/table'

const searchOptions = [
  { label: 'User ID', name: 'user_id' },
  { label: 'Payment ID', name: 'invoice_id' },
  { label: 'Customer ID', name: 'customer' },
  { label: 'Subscription ID', name: 'subscription' },
]

const AllPayments = () => {
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchByValue, setSearchByValue] = useState(searchOptions[0].name)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [cacheRef, setCacheRef] = useState<'all_list' | 'search_list'>(
    'all_list'
  )
  const [nextPageId, setNextPageId] = useState('')
  const [startAfter, setStartAfter] = useState('')

  const navigate = useNavigate()

  const createQuery = (feild: string) => {
    switch (feild) {
      case 'user_id':
        return `user_id:"${searchValue}"`
      case 'customer':
        return `customer:"${searchValue}"`
      case 'subscription':
        return `subscription:"${searchValue}"`
      case 'invoice_id':
        return `invoice_id:"${searchValue}"`
      default:
        return undefined
    }
  }

  const params: IGetPaymentQueryParams = { limit: 25 }
  if (query) {
    params.q = query
  }

  if (startAfter) {
    params.start_after = startAfter
  }

  if (nextPageId) {
    params.next_page = nextPageId
  }

  const { data, isLoading, isError } = getPayments(page, cacheRef, params)

  useEffect(() => {
    if (!data) return
    if (data.start_after) {
      setCacheRef('all_list')
      setStartAfter(data.start_after)
    }
    if (data.next_page) {
      setCacheRef('search_list')
      setNextPageId(data.next_page)
    }
    return
  }, [data])

  useEffect(() => {
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
    if (searchValue.length === 0) setQuery('')
    else setQuery(createQuery(searchByValue))
  }

  const Empty = (
    <div className="align-center" style={{ height: '30vh' }}>
      <h3>No Payments Found!</h3>
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
      <DashPageHeader title="Payments" border></DashPageHeader>
      <Wrapper>
        {isError ? (
          <div className="align-center" style={{ height: '30vh' }}>
            <h3>Failed to load Payments!</h3>
          </div>
        ) : isLoading && page === 0 ? (
          Loading
        ) : (
          <Fragment>
            <ActionsWrapper>
              <div className="action-item">
                <Search
                  placeholder={
                    searchByValue === 'customer'
                      ? 'eg: cus_Li9Ymb5d9o2wPI'
                      : searchByValue === 'subscription'
                      ? 'eg: sub_1L0qZEIh2DuAq8sftOrbrsAm'
                      : searchByValue === 'invoice_id'
                      ? 'eg: in_1L1FTHIh2DuAq8sfNZZiFmJM'
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
              <TableList>
                <thead>
                  <tr>
                    <th style={{ width: 'auto' }}>ID</th>
                    <th style={{ width: '15%' }}>Plan</th>
                    <th style={{ width: '10%' }}>Amount</th>
                    <th style={{ width: '15%' }}>Status</th>
                    <th style={{ width: '18%' }}>Card</th>
                    <th style={{ width: '18%' }}>Date</th>
                  </tr>
                </thead>
                {data && data.items && data.items.length > 0 && (
                  <tbody>
                    {data.items.map((item: Record<string, any>, i: number) => (
                      <tr
                        key={i}
                        onClick={() => navigate(`/payments/${item.id}`)}
                      >
                        <td>{item.id || '-'}</td>
                        <td className="capitalize">{item.plan_name || '-'}</td>
                        <td>
                          ${item.amount || '0.00'}&nbsp;
                          {item.currency && item.currency}
                        </td>
                        <td className="capitalize">
                          {item.refunded ? (
                            <RefundWrapper>
                              <Badge type="ghost" size="sm">
                                Refunded
                              </Badge>
                            </RefundWrapper>
                          ) : item.amount_refunded > 0 ? (
                            <RefundWrapper>
                              <Badge type="ghost" size="sm">
                                Partial Refund
                              </Badge>
                            </RefundWrapper>
                          ) : (
                            <Badge
                              size="sm"
                              type={
                                item.status === 'succeeded'
                                  ? 'success'
                                  : item.status === 'cancelled'
                                  ? 'ghost'
                                  : item.status === 'failed'
                                  ? 'danger'
                                  : 'info'
                              }
                            >
                              {item.status}
                            </Badge>
                          )}
                        </td>
                        <td>
                          {(item.method.brand && item.method.last4 && (
                            <Card>
                              {item.method.brand && item.method.brand}

                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              {item.method.last4}
                            </Card>
                          )) ||
                            'card'}
                        </td>
                        <td>
                          {dayjs(item.date).format('DD MMM YYYY, hh:mm a')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
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
                    disabled={!data.has_more}
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

export default AllPayments

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
  .action-item {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`

const Card = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #777;
    margin-right: 2px;
    &:first-child {
      margin-left: 10px;
    }
    &:last-child {
      margin-right: 5px;
    }
  }
`
const RefundWrapper = styled.div`
  display: block;
  align-items: center;
  .redund-amt {
    display: block;
    font-size: 0.7rem;
    margin-top: 0.3rem;
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
