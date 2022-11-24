import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BulbIcon from '../../components/svgs/bulbIcon'
import CreditCardIcon from '../../components/svgs/creditCard'
import TickMarkIcon from '../../components/svgs/tickMark'
import UsersIcon from '../../components/svgs/usersIcon'
import DashPageHeader from '../../components/ui/dashPageHeader'
import { useAuth } from '../../contexts/authProvider'
import { getDashboardData } from '../../queries/dashboardQueries'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'

const Dashboard = () => {
  const { user } = useAuth()
  const date = new Date()
  const hours = date.getHours()
  const { data, isLoading, isError } = getDashboardData()
  dayjs.extend(relativeTime)

  const navigate = useNavigate()

  const payment = data && data.paymentData
  const resumeReviewCount = data && data.resumeReviewCount

  return (
    <Fragment>
      <DashPageHeader
        name={
          hours < 12
            ? 'Good Morning'
            : hours < 18
            ? 'Good Afternoon'
            : 'Good Evening'
        }
        title={`${user.firstName && user.firstName} ${
          user.lastName && user.lastName
        }`}
      ></DashPageHeader>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load Dashboard!</h3>
        </div>
      ) : isLoading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Loading</LoadingDots>
        </LoadingWrapper>
      ) : data ? (
        <Wrapper>
          <Container>
            <div>
              <InfoCardWrapper data-test-id="info-card">
                <div className="info-card">
                  <div className="info-head">
                    <div className="heading">
                      <UsersIcon size="2.5rem" color="#343434" />
                      <p>Users</p>
                    </div>
                  </div>
                  <div className="info-body">
                    <div className="item">
                      <p className="label">Total</p>
                      <p className="value">{data.totalUsers}</p>
                    </div>
                    <div className="item">
                      <p className="label">
                        Active
                        <span style={{ fontSize: '0.7rem', color: '#888' }}>
                          &nbsp;(30 Days)
                        </span>
                      </p>
                      <p className="value">{data.activeUsers}</p>
                    </div>
                    <div className="item">
                      <p className="label">Pro Users</p>
                      <p className="value">{data.proUsers}</p>
                    </div>
                    <div className="item">
                      <p className="label">CEO Users</p>
                      <p className="value">{data.ceoUsers}</p>
                    </div>
                  </div>
                </div>
              </InfoCardWrapper>

              {/* Resume Review */}

              <InfoCardWrapper data-test-id="info-card">
                <div className="info-card">
                  <div className="info-head">
                    <div className="heading">
                      <BulbIcon
                        size="2.2rem"
                        color="#343434"
                        className="bulb-icon"
                      />
                      <p>Resume Review</p>
                    </div>
                  </div>
                  <div className="info-body">
                    <div className="item">
                      <p className="label">Total</p>
                      <p className="value">
                        {(resumeReviewCount && `${resumeReviewCount.total}`) ||
                          '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Last 24hrs</p>
                      <p className="value">
                        {(resumeReviewCount && `${resumeReviewCount.last24}`) ||
                          '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Outstanding</p>
                      <p className="value">
                        {(resumeReviewCount &&
                          `${resumeReviewCount.outstanding}`) ||
                          '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Urgent</p>
                      <p className="value">
                        {(resumeReviewCount && `${resumeReviewCount.urgent}`) ||
                          '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </InfoCardWrapper>

              <InfoCardWrapper data-test-id="info-card">
                <div className="info-card">
                  <div className="info-head">
                    <div className="heading">
                      <CreditCardIcon size="2.5rem" color="#343434" />
                      <p>Payments</p>
                    </div>
                    <div className="duration">
                      <p>Last 30 days</p>
                    </div>
                  </div>
                  <div className="info-body">
                    <div className="item">
                      <p className="label">Total</p>
                      <p className="value">
                        {(payment && `$${payment.total}`) || '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Refunds</p>
                      <p className="value">
                        {(payment && `$${payment.refund}`) || '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Stripe Fees</p>
                      <p className="value">
                        {(payment && `$${payment.fee}`) || '-'}
                      </p>
                    </div>
                    <div className="item">
                      <p className="label">Net Revenue</p>
                      <p className="value">
                        {(payment && `$${payment.net}`) || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </InfoCardWrapper>

              <SubContainer
                data-test-id="info-payments"
                style={{
                  marginRight: '1.5rem',
                  marginTop: '2.2rem',
                  height: '425px',
                }}
              >
                <div>
                  <h4>Recent Payments</h4>
                  {data.payments && data.payments.length > 0 ? (
                    data.payments.map(
                      (item: Record<string, any>, i: number) => (
                        <PaymentWrapper
                          key={i}
                          onClick={() => navigate(`/payments/${item.id}`)}
                        >
                          <div className="details-wrapper">
                            <PaymentIconWrapper>
                              <TickMarkIcon />
                            </PaymentIconWrapper>
                            <div>
                              <p>
                                {(item.email && item.email) ||
                                  (item.customer && item.customer) ||
                                  '-'}
                              </p>
                              <p className="label">{item.id}</p>
                            </div>
                          </div>
                          <div>
                            <p>${item.amount}</p>
                          </div>
                          <div>
                            <p>
                              {(item.date && dayjs(item.date).fromNow()) || '-'}
                            </p>
                          </div>
                        </PaymentWrapper>
                      )
                    )
                  ) : (
                    <h3 className="align-center">No payments</h3>
                  )}
                </div>
                <Footer>
                  <Link className="link" to="/payments">
                    View All Payments
                  </Link>
                </Footer>
              </SubContainer>
            </div>
            <RHSWrapper>
              <SubContainer
                style={{ height: '400px' }}
                data-test-id="info-signups"
              >
                <div>
                  <h4>Recent Signups</h4>
                  {data.users &&
                    data.users.length > 0 &&
                    data.users.map((item: Record<string, any>, i: number) => (
                      <UserWrapper
                        key={i}
                        onClick={() =>
                          navigate(`/users/${item.user_id}/details`)
                        }
                      >
                        <ImageWrapper>
                          <img src={item.picture} />
                        </ImageWrapper>
                        <div className="details-info">
                          <p className="line-clamp-1">{item.name}</p>
                          <p className="label line-clamp-1">{item.email}</p>
                        </div>
                      </UserWrapper>
                    ))}
                </div>
                <Footer>
                  <Link className="link" to="/users">
                    View All Users
                  </Link>
                </Footer>
              </SubContainer>
              <SubContainer
                style={{ height: '525px' }}
                data-test-id="info-blogs"
              >
                <div>
                  <h4>Recent Blogs</h4>
                  {data.blogs &&
                    data.blogs.length > 0 &&
                    data.blogs.map((item: Record<string, any>, i: number) => (
                      <BlogItem
                        key={i}
                        onClick={() => navigate(`/blogs/${item._id}`)}
                      >
                        <ImageWrapper>
                          <img src={item.image} />
                        </ImageWrapper>
                        <div>
                          <p className="line-clamp-1">{item.title} </p>
                          <p className="description line-clamp-1">
                            {item.short_description}
                          </p>
                        </div>
                      </BlogItem>
                    ))}
                </div>
                <Footer>
                  <Link className="link" to="/blogs">
                    View All Blogs
                  </Link>
                </Footer>
              </SubContainer>
            </RHSWrapper>
          </Container>
        </Wrapper>
      ) : null}
    </Fragment>
  )
}

export default Dashboard

const Wrapper = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  height: 100%;
  flex: 1;
`

const RHSWrapper = styled.div`
  height: 100%;
`
const BlogItem = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  padding: 0.7rem 1rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: rgba(255, 219, 193, 0.2);
  }
  p {
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0;
  }

  .description {
    font-weight: 500;
    color: #888;
  }
`

const SubContainer = styled.div`
  /* border-radius: 1rem;
  box-shadow: #e7e9ee7d 4px 6px 10px 2px;
  border: 1px solid #e7e9eea6;
  background-color: #f7f8fa; */

  border: 1px solid #e2e9f3;
  box-shadow: 4px 4px 24px rgba(0, 51, 129, 0.07);
  border-radius: 7px;

  padding: 1rem 0;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  h4 {
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #f0853840;
  }
`

const InfoCardWrapper = styled.div`
  display: block;
  width: 100%;
  max-height: 200px;
  height: fit-content;
  .info-card {
    /* border: 1px solid #e7e9eea6;
    border-radius: 1rem;
    background-color: #f7f8fa;
    box-shadow: #e7e9ee7d 4px 6px 10px 2px; */

    border: 1px solid #e2e9f3;
    box-shadow: 4px 4px 24px rgba(0, 51, 129, 0.07);
    border-radius: 7px;

    display: block;
    height: 100%;
    width: auto;
    margin-right: 1.5rem;
    padding: 1rem;
    margin-bottom: 2.6rem;

    p {
      margin: 0;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .label {
      color: ${({ theme }) => theme.colors.primary};
    }
    .value {
      font-weight: 900;
      font-size: 1rem;
    }
    .duration {
      p {
        font-size: 0.75rem;
        color: #888;
      }
    }
    .info-head {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #f0853840;
      .heading {
        display: flex;
        align-items: center;
        p {
          margin-left: 1rem;
          font-size: 1.2rem;
          margin-bottom: 0;
        }
      }
      .balance {
        color: #343434;
        margin-right: 1rem;
        font-weight: 900;
      }
    }
    .bulb-icon {
      path {
        stroke: black;
        stroke-width: 0.5;
      }
    }
    .info-body {
      display: grid;
      grid-template-columns: repeat(4, 25%);

      .item {
        &:not(:last-child) {
          border-right: 1px solid #f0853840;
          margin-right: 1.5rem;
        }
      }
    }
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-top: 1px solid #f0853840;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem 0;
`
const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: rgba(255, 219, 193, 0.2);
  }
  p {
    display: flex;
    font-size: 0.8rem;
    margin: 0;
    font-weight: 600;
  }
  .label {
    color: #888;
  }
  ${ImageWrapper} {
    margin-right: 0.7rem;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .details-info {
    display: flex;
    flex-direction: column;
  }
`
const PaymentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.shades.success};
  svg path {
    fill: ${({ theme }) => theme.colors.success};
  }
`
const PaymentWrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  align-items: center;
  &:hover {
    background-color: rgba(255, 219, 193, 0.2);
  }
  p {
    font-size: 0.8rem;
    margin: 0;
    font-weight: 600;
  }
  .label {
    color: #888;
  }
  .details-wrapper {
    display: flex;
    align-items: center;
    ${ImageWrapper} {
      margin-right: 0.7rem;
      border-radius: 50%;
    }
  }
`
