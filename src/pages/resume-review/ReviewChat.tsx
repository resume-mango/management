import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import DashPageHeader from '../../components/ui/dashPageHeader'
import MessageBox from './MessageBox'
import { chatFetcher, getReviewTicketById } from '../../queries/chatQueries'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import ReactHtmlParser from 'react-html-parser'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'
import { Button } from '../../styled/button'
import ReviewSidebar from './reviewSidebar'
import axios from 'axios'
import { useNotify } from '../../contexts/notify'
import WarningIcon from '../../components/svgs/warning'
import ViewResume from './viewResume'
import AttachmentDownload from './AttachmentDownload'
import ReactDOMServer from 'react-dom/server'
import { Emoji } from 'emoji-picker-react'
import Confirmation from '../../components/ui/confirmation'
import Modal from '../../components/ui/modal'

const ReviewChat = () => {
  const [searchParams] = useSearchParams()
  const [show, setShow] = useState(false)
  const { ticket } = useParams<{ ticket: string }>()
  const resumeId = searchParams.get('ref')
  const preview = searchParams.get('preview')
  const [showPreview, setShowPreview] = useState(preview || false)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const { setNotify } = useNotify()
  const queryClient = useQueryClient()
  const {
    data: ticketData,
    isLoading: ticketLoading,
    isError: isTicketError,
  } = getReviewTicketById({ ticket } as any)

  const ticketStatus = (ticketData && ticketData.status === 'open') || false

  const {
    isLoading,
    isError,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['chats', ticket],
    ({ pageParam = 0 }) =>
      chatFetcher({ ticketId: ticket as string, page: pageParam, limit: 5 }),
    {
      getNextPageParam: (lastPage: any, pages) => {
        const hasNext =
          lastPage.page + 1 < Math.ceil(lastPage.total / lastPage.limit)
        if (hasNext) return pages.length
        return undefined
      },
      enabled: ticket !== 'new' && !preview,
      refetchOnWindowFocus: ticket !== 'new' && !preview && ticketStatus,
      refetchInterval:
        ticket !== 'new' && !preview && ticketStatus ? 1000 * 60 : 0,
    }
  )

  const firstPageLength =
    data &&
    data.pages &&
    data.pages[0] &&
    data.pages[0].items &&
    data.pages[0].items.length

  const pagesLength = data?.pages.length

  useEffect(() => {
    const messageSection = document.getElementById('message-section')
    if (!messageSection) return
    const lastPage =
      data && data.pages.length > 1 && data.pages[data.pages.length - 1]
    if (!lastPage) return
    const lastItem =
      lastPage.items &&
      lastPage.items.length > 0 &&
      lastPage.items[lastPage.items.length - 1]
    if (!lastItem || !lastItem._id) return
    const element = document.getElementById(lastItem._id)
    if (!element) return
    messageSection.scrollTop = element?.offsetTop
  }, [pagesLength])

  useEffect(() => {
    return scrollToBottom('first-page-length')
  }, [firstPageLength])

  useEffect(() => {
    if (isLoading) return
    const wrapper = document.getElementById('main-section')
    const header = document.querySelector('header')
    const messageBox = document.getElementById('message-box')
    const messageSection = document.getElementById('message-section')

    if (!wrapper || !header || !messageBox || !messageSection) return
    wrapper.style.maxHeight = '100vh'
    messageSection.style.overflowY = 'scroll'
    messageSection.style.height = `${
      wrapper.clientHeight - header.clientHeight - messageBox.clientHeight
    }px`
    messageSection.focus()
    scrollToBottom()

    const timer = setTimeout(() => {
      messageSection.style.opacity = '1'
      messageBox.style.opacity = '1'
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [isLoading, preview, ticketStatus])

  useEffect(() => {
    if (!ticketData) return
    !ticketData.resume && setShowAlert(true)
  }, [ticketData])

  const scrollToBottom = (val?: 'first-page-length' | undefined) => {
    if (
      (data && data.pages.length === 1) ||
      (val === 'first-page-length' &&
        data &&
        firstPageLength > data.pages[0].limit)
    ) {
      const messageSection = document.getElementById('message-section')
      if (!messageSection) return
      messageSection.scrollTop = messageSection.scrollHeight
    }
    return
  }

  const closeTicket = useMutation(
    (reqData: any) =>
      axios.post(`/management/resume-review/close/${reqData.ticket}`),
    {
      onSuccess: () => {
        queryClient.setQueryData(['reviewTicket', ticket], (queryData: any) => {
          return { ...queryData, status: 'closed' }
        })
        setShow(false)
        navigate('/resume-review')
      },
      onError: () => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to close ticket',
        })
      },
      // onSettled: () => {},
    }
  )

  const handleTickeClose = () => {
    return closeTicket.mutate({ ticket })
  }

  const parseMessage = (val: string) => {
    const dummy = document.createElement('div')
    dummy.innerHTML = val
    const element =
      dummy.children.length === 1 && (dummy.children[0] as HTMLElement)
    let size = 20
    if (element && element.children.length > 0) {
      if (
        element.children.length === 1 &&
        Array.from(element.childNodes).filter((child) => child.nodeType === 3)
          .length === 0
      ) {
        size = 40
      }
    }
    const emojis = dummy.querySelectorAll('span.composer-emoji') as any
    if (emojis && emojis.length > 0) {
      emojis.forEach((item: HTMLElement) => {
        item.className = 'emoji-icon'
        return (item.innerHTML = ReactDOMServer.renderToString(
          <Emoji unified={item.title} size={size} />
        ))
      })
    }

    return dummy.innerHTML
  }

  const handeShowResume = (show: boolean) => {
    !show ? navigate({ search: '' }) : navigate({ search: '?preview=true' })
    return setShowPreview(show)
  }

  return (
    <Fragment>
      <ReviewSidebar
        data={ticketData}
        isLoading={ticketLoading}
        isError={isTicketError}
        handleShowResume={handeShowResume}
      />
      <div>
        <Content id="main-section">
          {ticketData && ticketData.resume && showPreview ? (
            <ViewResume
              resumeData={ticketData.resume}
              handleShow={handeShowResume}
            />
          ) : (
            <Fragment>
              <Modal show={showAlert}>
                <TCModal>
                  <WarningIcon size="6rem" color="rgba(240, 132, 56, 1)" />
                  <h2 style={{ marginTop: '1rem' }}>Err!</h2>
                  <p>
                    Failed to find resume, looks like user might have deleted
                    the resume...
                  </p>
                  <div className="align-center">
                    {ticketData && ticketData.status !== 'closed' && (
                      <Button
                        size="lg"
                        btnType="secondary"
                        onClick={() => setShow(true)}
                        style={{ marginRight: '1rem' }}
                      >
                        Close Ticket
                      </Button>
                    )}
                    <Button
                      size="lg"
                      btnType="primary"
                      onClick={() => setShowAlert(false)}
                    >
                      Okay
                    </Button>
                  </div>
                </TCModal>
              </Modal>
              <DashPageHeader title="Customer Support Chat">
                <Button
                  size="lg"
                  btnType="secondary"
                  onClick={() => navigate('/resume-review')}
                >
                  Back to Portal
                </Button>
                {ticketData && ticketData.status === 'open' && (
                  <Button size="lg" onClick={() => setShow(true)}>
                    Close Ticket
                  </Button>
                )}
              </DashPageHeader>

              {isError ? (
                <div
                  className="align-center"
                  style={{ height: '90%', flex: 1 }}
                >
                  <h3>Failed to load chat!</h3>
                </div>
              ) : isLoading ? (
                <LoadingWrapper style={{ height: '90%' }}>
                  <Spinner size="2rem" type="primary" />
                </LoadingWrapper>
              ) : (
                <Fragment>
                  <Confirmation
                    show={show}
                    title="Are you sure?"
                    msg="You want to close ticket"
                  >
                    <Button
                      size="lg"
                      onClick={() => handleTickeClose()}
                      disabled={closeTicket.isLoading}
                    >
                      Yes
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => setShow(false)}
                      disabled={closeTicket.isLoading}
                    >
                      No
                    </Button>
                  </Confirmation>
                  <MessageSection id="message-section" style={{ opacity: 0 }}>
                    <ChatSection>
                      {hasNextPage && (
                        <div className="load-more">
                          <a onClick={() => fetchNextPage()}>
                            {!isFetchingNextPage ? (
                              'Load older messages'
                            ) : (
                              <LoadingDots color="rgba(240, 132, 56, 1)">
                                Loading Messages
                              </LoadingDots>
                            )}
                          </a>
                        </div>
                      )}

                      {data &&
                        data.pages &&
                        data?.pages
                          .map(data?.pages.pop, [...data.pages])
                          .map((group, i) => (
                            <Fragment key={i}>
                              {group &&
                                group.items &&
                                group.items.length > 0 &&
                                group.items
                                  .map(group.items.pop, [...group.items])
                                  .map(
                                    (item: Record<string, any>, i: number) => (
                                      <ChatWrapper
                                        type={
                                          item.senderType &&
                                          item.senderType === 'reviewer'
                                            ? 'sender'
                                            : 'reciever'
                                        }
                                        key={i}
                                        id={item._id}
                                      >
                                        <div className="message">
                                          <p className="label">
                                            {item.senderType &&
                                            item.senderType === 'reviewer'
                                              ? 'You'
                                              : 'Customer'}
                                          </p>
                                          <div className="bubble">
                                            {item.message && (
                                              <div>
                                                {ReactHtmlParser(
                                                  parseMessage(item.message)
                                                )}
                                              </div>
                                            )}
                                            {item.attachments &&
                                              item.attachments.length > 0 &&
                                              item.attachments.map(
                                                (
                                                  attachment: Record<
                                                    string,
                                                    any
                                                  >,
                                                  i: number
                                                ) => (
                                                  <Fragment key={i}>
                                                    <AttachmentDownload
                                                      attachment={attachment}
                                                      chat_id={item._id}
                                                      senderType={
                                                        item.senderType
                                                      }
                                                    />
                                                  </Fragment>
                                                )
                                              )}
                                          </div>
                                        </div>
                                      </ChatWrapper>
                                    )
                                  )}
                            </Fragment>
                          ))}
                    </ChatSection>
                  </MessageSection>
                  {!ticketData || ticketStatus ? (
                    <MessageBox
                      isFetchingMessage={isFetching && !isFetchingNextPage}
                      ticket={ticket as string}
                      resumeId={resumeId as string}
                      style={{ opacity: 0 }}
                    />
                  ) : (
                    <AlertBox id="message-box">
                      <span>
                        <WarningIcon size="1.3rem" />
                      </span>
                      <p>Ticket has been closed!</p>
                    </AlertBox>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </Content>
      </div>
    </Fragment>
  )
}

export default ReviewChat

const AlertBox = styled.div`
  margin-top: 2rem;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  span {
    height: fit-content;
    margin-right: 0.5rem;
    margin-top: 0.3rem;
  }
  p {
    text-align: center;
    margin: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 260px;
  min-height: 100vh;
  overflow-x: hidden;
`

const MessageSection = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  width: 100%;
`
const ChatSection = styled.div`
  margin-top: auto;
  padding: 1.5rem 1.5rem 0;
  height: fit-content;
  width: 100%;
  .load-more {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(52, 52, 52, 0.2);
    transition: color ease-in-out 0.2s;
    a {
      padding: 0.7rem;
      text-transform: capitalize;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const ChatWrapper = styled.div<{ type: 'sender' | 'reciever' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ type }) =>
    type === 'sender' ? 'flex-end' : 'flex-start'};
  .message {
    max-width: 50%;
    width: fit-content;
  }

  .label {
    text-align: ${({ type }) => (type === 'sender' ? 'end' : 'start')};
    margin-bottom: 0.2rem;
  }
  .bubble {
    background-color: #0f102a;
    background-color: ${({ type }) =>
      type === 'sender' ? '#F08438' : '#0f102a'};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: white;
    font-size: 0.8rem;
    p {
      margin: 0;
    }
    .emoji-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: fit-content;
      line-height: 1;
      position: relative;
      top: 4px;
    }
  }
`

const TCModal = styled.div`
  width: 450px;
  height: fit-content;
  background-color: #fff;
  border-radius: 6px;
  padding: 3rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  p {
    margin-left: 0.5rem;
    font-size: 1rem;
    max-width: 80%;
    margin-bottom: 2rem;
    a {
      font-size: inherit;
      text-decoration: underline;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
