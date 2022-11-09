import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import Confirmation from '../../components/ui/confirmation'
import DashPageHeader from '../../components/ui/dashPageHeader'
import Modal from '../../components/ui/modal'
import Search from '../../components/ui/search'
import { useAuth } from '../../contexts/authProvider'
import { useNotify } from '../../contexts/notify'
import {
  getReviewers,
  GetReviewParams,
  getReviewTickets,
} from '../../queries/chatQueries'
import { Button } from '../../styled/button'
import { StyledCheckBox } from '../../styled/form'
import { LoadingWrapper, Spinner } from '../../styled/loader'
import { PaginationWrapper } from '../../styled/pages'

const ReviewList = () => {
  dayjs.extend(relativeTime)

  const { user } = useAuth()

  const isAdmin = user && user.role && user.role.includes('admin')

  const [searchParams] = useSearchParams()
  const sort = searchParams.get('sort') as any
  const search = searchParams.get('search') as any
  const [searchValue, setSearchValue] = useState(search || '')
  const [userSearch, setUserSearch] = useState('')
  const [userData, setUserData] = useState<Array<Record<string, any>>>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const [ids, setIds] = useState<string[]>([])

  const navigate = useNavigate()
  const { setNotify } = useNotify()
  const queryClient = useQueryClient()
  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  const handleSearch = () => {
    setQuery(searchValue)
  }

  const params: GetReviewParams = {
    limit: 15,
    page,
    sort,
  }

  if (query) {
    params.id = query
  }

  const addSortToQuery = (
    type?:
      | 'urgent-tickets'
      | 'assigned-tickets'
      | 'unassigned-tickets'
      | 'open-tickets'
      | 'completed'
  ) => {
    return type
      ? navigate({
          search: createSearchParams({
            search: query,
            sort: type,
          }).toString(),
        })
      : navigate({ search: createSearchParams({ search: query }).toString() })
  }

  useEffect(() => {
    if (!query) return
    navigate({ search: createSearchParams({ search: query }).toString() })
  }, [query])

  useEffect(() => {
    if (!search) return
    setQuery(search)
  }, [search])

  useEffect(() => {
    const today = new Date()
    today.setHours(today.getHours() - 1)
  }, [])

  useEffect(() => {
    if (!selectedUser) return
    setShowModal(false)
  }, [selectedUser])

  const { data, isLoading, isError } = getReviewTickets(params)
  const {
    data: reviewerData,
    isLoading: userLoading,
    isError: userError,
  } = getReviewers(isAdmin && showModal)

  useEffect(() => {
    if (!reviewerData) return
    setUserData(reviewerData)
  }, [reviewerData])

  const handleUserSearch = () => {
    if (!reviewerData || reviewerData.length === 0) return
    if (!userSearch) return setUserData(reviewerData)
    const regex = new RegExp(userSearch, 'i')
    const filtered = userData.filter((item) => regex.test(item.email))
    return setUserData(filtered)
  }

  const handleSetId = (val: string) => {
    if (!data || !data.items || data.items.length === 0) return
    const ticketIds = []
    if (val === 'all') {
      if (ids.length === data.items.length) return setIds([])
      data.items.forEach((item: Record<string, any>) => {
        if (!item._id) return
        ticketIds.push(item._id)
      })
    } else {
      const index = ids.indexOf(val)
      if (index === -1) {
        return setIds((prev) => [...prev, val])
      } else {
        ticketIds.push(...ids)
        ticketIds.splice(index, 1)
      }
    }
    return setIds(ticketIds)
  }

  const assignTicket = useMutation(
    (reqData: any) => axios.post(`/management/resume-review/assign`, reqData),
    {
      onSuccess: (res) => {
        if (!res || !res.data) throw Error('Failed to assign')
        setSelectedUser('')
        setIds([])
        queryClient.invalidateQueries('resumeReview')
      },
      onError: () => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to assign ticket',
        })
      },
      // onSettled: () => {},
    }
  )
  const handleAssignTicket = () => {
    assignTicket.mutate({ user_id: selectedUser, ids })
  }

  return (
    <Fragment>
      <DashPageHeader title="Resume Review" border={false}></DashPageHeader>
      <Confirmation
        show={!!selectedUser}
        title="Are you sure?"
        msg="You want to assign ticket"
      >
        <Button
          size="lg"
          onClick={() => handleAssignTicket()}
          disabled={assignTicket.isLoading}
        >
          Yes
        </Button>
        <Button
          size="lg"
          onClick={() => setSelectedUser('')}
          disabled={assignTicket.isLoading}
        >
          No
        </Button>
      </Confirmation>
      <Modal show={showModal} setShow={setShowModal}>
        <ModalWrapper data-test-id="select-reviewer">
          <div className="title">
            <h3>Select Reviewer</h3>
            <span className="close-icon" onClick={() => setShowModal(false)}>
              <CrossIcon />
            </span>
          </div>
          {!userError && (
            <div className="search">
              <Search
                placeholder={'Email (eg: jhondoe@example.com)'}
                value={userSearch}
                setValue={setUserSearch}
                handleSubmit={() => handleUserSearch()}
                style={{ width: '100%' }}
              />
            </div>
          )}
          {userError ? (
            <div className="align-center" style={{ height: '90%' }}>
              <h3>Failed to load reviewers!</h3>
            </div>
          ) : userLoading ? (
            <LoadingWrapper style={{ height: '70%' }}>
              <Spinner size="2rem" type="primary" />
            </LoadingWrapper>
          ) : userData && userData.length > 0 ? (
            <Fragment>
              <div className="list-wrapper">
                <div className="list">
                  {userData.map((item: Record<string, any>, i: number) => (
                    <div
                      className="avatar-wrapper"
                      key={i}
                      onClick={() => setSelectedUser(item._id || '')}
                    >
                      <div className="avatar">
                        {item.picture && <img src={item.picture} />}
                      </div>
                      <div>
                        <b className="line-clamp-1">{item.name}</b>
                        <p className="line-clamp-2">{item.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="align-center" style={{ height: '70%' }}>
              <h3>No reviewers found!</h3>
            </div>
          )}
        </ModalWrapper>
      </Modal>

      <SearchWrapper>
        <Search
          placeholder={'Enter Review ID (eg : 634fbdc6f394c60b857d79e4)'}
          value={searchValue}
          setValue={setSearchValue}
          handleSubmit={() => handleSearch()}
          style={{ width: '60%' }}
          btnType={'secondary'}
        />
        <Button
          size="lg"
          onClick={() => setShowModal(true)}
          disabled={ids && ids.length === 0}
          data-test-id="assign-ticket"
        >
          Assign Ticket
        </Button>
      </SearchWrapper>

      {!isLoading && (
        <ToggleWrapper
          style={!isAdmin ? { maxWidth: '700px' } : {}}
          className="toggle-wrapper"
        >
          <a
            data-test-id="all-tickets"
            className={!sort ? 'active' : ''}
            onClick={() => addSortToQuery()}
          >
            <span className="label">All Tickets</span>
            <span className="count">
              {(data && data.count && data.count.total) || 0}
            </span>
          </a>
          <a
            data-test-id="urgent-tickets"
            className={sort && sort === 'urgent-tickets' ? 'active' : ''}
            onClick={() => addSortToQuery('urgent-tickets')}
          >
            <span className="label">Urgent</span>

            <span className="count">
              {(data && data.count && data.count.urgentTickets) || 0}
            </span>
          </a>
          <a
            data-test-id="open-tickets"
            className={sort && sort === 'open-tickets' ? 'active' : ''}
            onClick={() => addSortToQuery('open-tickets')}
          >
            <span className="label">Open Tickets</span>
            <span className="count">
              {(data && data.count && data.count.openTickets) || 0}
            </span>
          </a>
          {isAdmin && (
            <Fragment>
              <a
                data-test-id="assigned-tickets"
                className={sort && sort === 'assigned-tickets' ? 'active' : ''}
                onClick={() => addSortToQuery('assigned-tickets')}
              >
                <span className="label">My Tickets</span>

                <span className="count">
                  {(data && data.count && data.count.assignedTickets) || 0}
                </span>
              </a>
              <a
                data-test-id="unassigned-tickets"
                className={
                  sort && sort === 'unassigned-tickets' ? 'active' : ''
                }
                onClick={() => addSortToQuery('unassigned-tickets')}
              >
                <span className="label">Unassigned</span>

                <span className="count">
                  {(data && data.count && data.count.unassignedTickets) || 0}
                </span>
              </a>
            </Fragment>
          )}

          <a
            data-test-id="completed-tickets"
            className={sort && sort === 'completed' ? 'active' : ''}
            onClick={() => addSortToQuery('completed')}
          >
            <span className="label">Completed</span>
            <span className="count">
              {(data && data.count && data.count.completedTickets) || 0}
            </span>
          </a>
        </ToggleWrapper>
      )}
      <Wrapper data-test-id="list-wrapper">
        {isError ? (
          <div className="align-center" style={{ height: '50vh' }}>
            <h3>No review tickets found!</h3>
          </div>
        ) : isLoading ? (
          <LoadingWrapper style={{ height: '50vh' }}>
            <Spinner size="2.5rem" type="primary" />
          </LoadingWrapper>
        ) : data && data.items && data.items.length > 0 ? (
          <Fragment>
            <ListItemWrapper>
              {['urgent-tickets', 'open-tickets', 'unassigned-tickets'].indexOf(
                sort
              ) !== -1 && (
                <StyledCheckBox
                  className={'check'}
                  size={'sm'}
                  style={{ marginRight: '1rem' }}
                >
                  <input
                    type="checkbox"
                    checked={data.items.length === ids.length}
                    onChange={() => handleSetId('all')}
                  ></input>
                  <span className="checkmark"></span>
                </StyledCheckBox>
              )}
              <ListTitle className="grey">
                <p>TITLE</p>
                <p>TICKET ID</p>
                <p>STATUS</p>
                <p>REVIEWER</p>
                <p>CURRENT STATUS</p>
              </ListTitle>
            </ListItemWrapper>
            <div>
              {data.items.map((item: Record<string, any>, i: number) => (
                <ListItemWrapper key={i} data-test-id="list-item">
                  {[
                    'urgent-tickets',
                    'open-tickets',
                    'unassigned-tickets',
                  ].indexOf(sort) !== -1 && (
                    <StyledCheckBox
                      className={'check'}
                      size={'sm'}
                      style={{ marginRight: '1rem' }}
                    >
                      <input
                        type="checkbox"
                        checked={ids.indexOf(item._id) !== -1}
                        onChange={() => handleSetId(item._id)}
                      ></input>
                      <span className="checkmark"></span>
                    </StyledCheckBox>
                  )}
                  <ListItem onClick={() => navigate(`${item._id}`)}>
                    <div className="title item">
                      <p className="truncate">
                        {(item.resume && item.resume.title) ||
                          'Untitled Resume'}
                      </p>
                      <div className="title-label">
                        <span>
                          Created {dayjs(dayjs(item.createdAt)).fromNow(true)}{' '}
                          ago
                        </span>
                        {item.status === 'open' && (
                          <Fragment>
                            <span className="divider" />
                            <span>
                              {dayjs(item.createdAt)
                                .add(48, 'hour')
                                .diff(dayjs(), 'second') > 0
                                ? `Response due in 
                        ${dayjs(dayjs()).to(
                          dayjs(item.createdAt).add(48, 'hour'),
                          true
                        )}`
                                : 'Will respond shortly'}
                            </span>
                          </Fragment>
                        )}
                      </div>
                    </div>
                    <p className="grey truncate item list_id">#{item._id}</p>
                    <p className="capitalize item item-status truncate">
                      <span>{item.status || '-'}</span>
                    </p>
                    <p className="item truncate">
                      {item.assignedTo
                        ? item.assignedTo.firstName
                          ? item.assignedTo.firstName +
                              ' ' +
                              item.assignedTo.lastName || ''
                          : item.assignedTo.email
                        : 'Not assigned'}
                    </p>
                    <p
                      className="item"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {item.current_status ? (
                        item.current_status.reviewer === 'new_message' ? (
                          <Fragment>
                            <span className="truncate">New message </span>
                            <span className="circle green" />
                          </Fragment>
                        ) : item.current_status.reviewer === 'awaiting' ? (
                          <Fragment>
                            <span className="truncate">Awaiting Response</span>
                            <span className="circle yellow" />
                          </Fragment>
                        ) : item.current_status.reviewer === 'reviewed' ? (
                          <Fragment>
                            <span className="truncate"> Reviewed </span>
                            <span className="circle grey" />
                          </Fragment>
                        ) : (
                          '-'
                        )
                      ) : (
                        '-'
                      )}
                    </p>
                  </ListItem>
                </ListItemWrapper>
              ))}
              {data.count &&
                (sort
                  ? sort === 'urgent-tickets'
                    ? data.count.urgentTickets
                    : sort === 'open-tickets'
                    ? data.count.openTickets
                    : sort === 'assigned-tickets'
                    ? data.count.assignedTickets
                    : sort === 'unassigned-tickets'
                    ? data.count.unassignedTickets
                    : sort === 'completed'
                    ? data.count.completedTickets
                    : data.count.total
                  : data.count.total) > data.limit && (
                  <PaginationWrapper data-test-id="pagination">
                    <Button
                      btnType="secondary"
                      disabled={page === 0}
                      onClick={() => handlePage('prev')}
                      data-test-id="pagination-prev"
                    >
                      Previous
                    </Button>
                    <Button
                      btnType="secondary"
                      disabled={
                        page + 1 >=
                        Math.ceil(
                          (sort
                            ? sort === 'urgent-tickets'
                              ? data.count.urgentTickets
                              : sort === 'open-tickets'
                              ? data.count.openTickets
                              : sort === 'assigned-tickets'
                              ? data.count.assignedTickets
                              : sort === 'unassigned-tickets'
                              ? data.count.unassignedTickets
                              : sort === 'completed'
                              ? data.count.completedTickets
                              : data.count.total
                            : data.count.total) / data.limit
                        )
                      }
                      onClick={() => handlePage('next')}
                      data-test-id="pagination-next"
                    >
                      Next
                    </Button>
                  </PaginationWrapper>
                )}
            </div>
          </Fragment>
        ) : (
          <div className="align-center" style={{ height: '50vh' }}>
            <h3>No review tickets found!</h3>
          </div>
        )}
      </Wrapper>
    </Fragment>
  )
}

export default ReviewList

const Wrapper = styled.div`
  margin: 0.7rem;
  .grey {
    color: rgba(52, 52, 52, 0.4);
  }
`

const ListItemWrapper = styled.div`
  display: flex;
  padding: 0.7rem 1rem;
  align-items: center;
  width: 100%;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(52, 52, 52, 0.1);
  padding: 1.5rem;
  align-items: center;
  a {
    width: fit-content;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    transition: color ease-in-out 0.2s;
    user-select: none;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
    &.active {
      color: ${({ theme }) => theme.colors.primary};
      .label {
        border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      }
    }
    .count {
      display: flex;
      height: 25px;
      min-width: 25px;
      padding: 0.5rem;
      line-height: normal;
      background-color: #ffeea4;
      font-size: 0.6rem;
      color: ${({ theme }) => theme.colors.primary};
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-left: 0.7rem;
    }
  }
`

const ListTitle = styled.div`
  display: grid;
  grid-template-columns: 35% 25% 10% 15% 15%;
  border-left: 4px solid transparent;
  width: 100%;
  padding: 0 1rem;
  p {
    font-size: 0.7rem;
    margin: 0 0.5rem;
    width: 100%;
    color: inherit;
  }
`

const ListItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 35% 25% 10% 15% 15%;
  background-color: #f7f8fa;
  border-radius: 3px;
  border-left: 4px solid #f08438;
  height: 70px;
  align-items: center;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: box-shadow ease-in-out 0.2s;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &:hover {
    box-shadow: 0px 0px 5px 1px #f9bd3f;
  }
  .circle {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    display: block;
    background-color: #aaa;
    margin-left: 0.7rem;
  }
  .green {
    background-color: #1bcc38;
  }
  .yellow {
    background-color: #f9bd3f;
  }
  .item-status span {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 0.2rem 0.7rem;
    font-size: 0.8rem;
    border-radius: 3px;
    width: 75px;
    display: block;
    text-align: center;
  }
  .item {
    margin: 0 0.5rem;
  }
  .title {
    p {
      margin: 0;
    }
    .title-label {
      display: flex;
      align-items: center;
      color: rgba(52, 52, 52, 0.4);
      font-size: 0.7rem;
    }
    .divider {
      margin: 0 0.5rem;
      ::before {
        display: flex;
        content: '';
        width: 7px;
        height: 7px;
        background-color: rgba(52, 52, 52, 0.4);
        border-radius: 50%;
      }
    }
  }
`

const SearchWrapper = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e9f3;
  border-bottom: 1px solid #e2e9f3;
  display: flex;
  justify-content: space-between;
`
const ModalWrapper = styled.div`
  max-width: 700px;
  height: 75vh;
  width: 100%;
  background-color: white;
  padding: 1.5rem;

  .title {
    h3 {
      letter-spacing: 1px;
    }
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(52, 52, 52, 0.1);
    margin-bottom: 1rem;

    .close-icon {
      cursor: pointer;
      &:hover {
        svg path {
          stroke: #343434;
        }
      }
    }
  }
  .search {
    border-bottom: 1px solid rgba(52, 52, 52, 0.1);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
  .list-wrapper {
    overflow-y: auto;
    height: 50vh;
    padding-bottom: 1rem;
  }
  .list {
    display: block;
    margin-bottom: 1rem;
    .avatar-wrapper {
      cursor: pointer;
      padding: 0.7rem 0.5rem;
      border-bottom: 1px solid rgba(52, 52, 52, 0.1);
      display: flex;
      &:hover {
        background-color: #eee;
      }
      b {
        font-size: 0.875rem;
      }
      p {
        font-size: 0.8rem;
        margin: 0;
      }
    }
    .avatar {
      height: 40px;
      width: 40px;
      overflow: hidden;
      border-radius: 50%;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.5rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
`
