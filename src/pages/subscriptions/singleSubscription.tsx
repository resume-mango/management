import dayjs from 'dayjs'
import React, { Fragment } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import BackArrow from '../../components/svgs/backArrow'
import LinkIcon from '../../components/svgs/link'
import { convertISOToUnixDate } from '../../helpers/date'
import { getSingleSubscription } from '../../queries/subscriptionQueries'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'

const SingleSubscription = () => {
  const { sub_id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = getSingleSubscription(
    sub_id ? sub_id : '',
    !!sub_id
  )

  const UnixExpireDate =
    (data && data.cancel_at && convertISOToUnixDate(data.cancel_at)) || null

  const showNextBilling =
    (UnixExpireDate &&
      UnixExpireDate > convertISOToUnixDate(data.current_period_end)) ||
    !UnixExpireDate

  return (
    <Fragment>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load subscription!</h3>
        </div>
      ) : isLoading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Loading</LoadingDots>
        </LoadingWrapper>
      ) : data ? (
        <Wrapper>
          <Button
            btnType="ghost"
            size="lg"
            style={{
              width: 'fit-content',
              padding: '0 1rem',
              marginBottom: '1rem',
            }}
            onClick={() => navigate('/subscriptions')}
          >
            <BackArrow size="1.4rem" />
          </Button>
          {data._id && (
            <Fragment>
              <HeadWrappper>
                <div className="heading">
                  <div>
                    <p style={{ margin: 0 }}>SUBSCRIPTION</p>

                    <h2>{data.name || 'Unknown'} Plan</h2>
                  </div>
                  <Badge
                    type={
                      data.status === 'active'
                        ? 'success'
                        : data.status === 'pending'
                        ? 'primary'
                        : 'ghost'
                    }
                    size={'md'}
                  >
                    {data.status}
                  </Badge>
                </div>
                <div>
                  {/* {['pending', 'active'].indexOf(data.status) !== -1 && (
                    <Button
                      btnType="secondary"
                      size="sm"
                      disabled={cancelSub.isLoading}
                      onClick={() => cancelSub.mutate()}
                    >
                      {cancelSub.isLoading ? (
             <Fragment>
               Cancelling
               <Spinner size="1rem" style={{ marginLeft: '1rem' }} />
             </Fragment>
           ) : (
                      Cancel Subscription
                      )}
                    </Button>
                  )} */}
                </div>
              </HeadWrappper>
              <HorizontalInfo>
                <div className="info-item">
                  <p className="info-item-label">Started</p>

                  <p>
                    {data.create_time
                      ? dayjs(data.create_time).format('DD MMM YYYY')
                      : '-'}
                  </p>
                </div>
                <div className="info-item">
                  {data.ended_time ? (
                    <Fragment>
                      <p className="info-item-label">Ended Time</p>

                      <p>{dayjs(data.ended_time).format('DD MMM YYYY')}</p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {showNextBilling && (
                        <div className="info-item">
                          <p className="info-item-label">Next Billing Time</p>
                          <p>
                            {data.current_period_end
                              ? dayjs(data.current_period_end).format(
                                  'DD MMM YYYY'
                                )
                              : '-'}
                          </p>
                        </div>
                      )}

                      {data.cancel_at && (
                        <div className="info-item">
                          <p className="info-item-label">Expires On</p>
                          <p>
                            {data.cancel_at
                              ? dayjs(data.cancel_at).format('DD MMM YYYY')
                              : '-'}
                          </p>
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
                <div className="info-item">
                  <p className="info-item-label">Customer</p>
                  <p>
                    {data.user && data.user.email && data.user.provider_id ? (
                      <Link
                        to={`/users/${data.user.provider_id}/details`}
                        className="ref-link"
                      >
                        {data.user.email} <LinkIcon />
                      </Link>
                    ) : (
                      '-'
                    )}
                  </p>
                </div>
              </HorizontalInfo>
              <SubHeading>
                <h4>References</h4>
              </SubHeading>
              <SubDetails>
                <div className="sub-item">
                  <p>ID</p>
                  <p className="sub-value">{data._id}</p>

                  <p>Stripe Price ID</p>
                  <p className="sub-value">
                    {(data.reference && data.reference.price_id) || '-'}
                  </p>
                  <p>Stripe Subscription ID</p>
                  <p className="sub-value">
                    {(data.reference && data.reference.subscription_id) || '-'}
                  </p>
                </div>
                <div className="sub-item">
                  <p>User ID</p>
                  <p className="sub-value">
                    {(data.user && data.user._id) || '-'}
                  </p>
                  <p>Stripe Customer ID</p>
                  <p className="sub-value">
                    {(data.reference && data.reference.customer_id) || '-'}
                  </p>
                </div>
              </SubDetails>
              <SubHeading>
                <h4>Subscription Details</h4>
              </SubHeading>
              <SubDetails>
                <div className="sub-item">
                  <p>Plan Name</p>
                  <p className="sub-value">{data.name} Plan</p>
                  <p>Amount</p>
                  <p className="sub-value">
                    ${data.amount ? data.amount : '0.00'}&nbsp;
                    {data.currency && data.currency.toUpperCase()}
                  </p>
                  <p>Current Period</p>
                  <p className="sub-value">
                    {data.current_period_start
                      ? dayjs(data.current_period_start).format('DD MMM YYYY')
                      : '-'}
                    &nbsp;&nbsp;to&nbsp;&nbsp;
                    {data.current_period_end
                      ? dayjs(data.current_period_end).format('DD MMM YYYY')
                      : '-'}
                  </p>
                </div>

                <div className="sub-item">
                  <p>Payment Method</p>
                  <p className="sub-value">
                    {data.payment_method &&
                    data.payment_method.brand &&
                    data.payment_method.last4 ? (
                      <PaymentCardWrapper>
                        {data.payment_method.brand}
                        <Fragment>
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          {data.payment_method.last4}
                        </Fragment>
                      </PaymentCardWrapper>
                    ) : (
                      'card'
                    )}
                  </p>
                  <p>Created</p>
                  <p className="sub-value">
                    {data.create_time
                      ? dayjs(data.create_time).format('DD MMM YYYY, hh:mm a')
                      : '-'}
                  </p>
                  <p>Ended</p>
                  <p className="sub-value">
                    {data.ended_time
                      ? dayjs(data.ended_time).format('DD MMM YYYY, hh:mm a')
                      : '-'}
                  </p>
                </div>
              </SubDetails>
              {data.upcoming_invoice && (
                <Fragment>
                  <SubHeading>
                    <div>
                      <h4>Upcoming Invoice</h4>
                      <p>
                        This is a preview of the invoice that will be billed
                        on&nbsp;
                        {data.current_period_end
                          ? dayjs(data.current_period_end).format('DD MMM YYYY')
                          : 'end of the period'}
                        . It may change if the subscription is updated.
                      </p>
                    </div>
                  </SubHeading>
                  <InvoiceTable>
                    <thead>
                      <tr>
                        <th style={{ width: 'auto' }}>Description</th>
                        <th style={{ width: '120px' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.upcoming_invoice.data.map(
                        (item: Record<string, any>, i: number) => (
                          <tr key={i}>
                            <td>{item.description}</td>
                            <td
                              className={`amount ${
                                item.amount < 0 && 'negative'
                              }`}
                            >
                              <span className="currency-symbol">$</span>
                              {Math.abs(item.amount)}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </InvoiceTable>
                  <InvoiceFooter>
                    <div className="container">
                      <p className="semibold">Subtotal</p>
                      <p
                        className={`semibold amount ${
                          data.upcoming_invoice.total < 0 && 'negative'
                        }`}
                      >
                        <span className="currency-symbol">$</span>
                        {data.upcoming_invoice.total || '0.00'}
                      </p>

                      <p className="semibold">Total </p>
                      <p
                        className={`semibold amount ${
                          data.upcoming_invoice.total < 0 && 'negative'
                        }`}
                      >
                        <span className="currency-symbol">$</span>
                        {data.upcoming_invoice.total || '0.00'}
                      </p>
                      {data.upcoming_invoice.amount_paid > 0 && (
                        <Fragment>
                          <p className="semibold">Amount Paid</p>

                          <p
                            className={`semibold amount ${
                              data.upcoming_invoice.amount_paid < 0 &&
                              'negative'
                            }`}
                          >
                            <span className="currency-symbol">$</span>
                            {data.upcoming_invoice.amount_paid || '0.00'}
                          </p>
                        </Fragment>
                      )}
                      <p className="semibold">Amount Due</p>
                      <p
                        className={`semibold amount ${
                          data.upcoming_invoice.amount_due < 0 && 'negative'
                        }`}
                      >
                        <span className="currency-symbol">$</span>
                        {data.upcoming_invoice.amount_due || '0.00'}
                      </p>
                    </div>
                  </InvoiceFooter>
                </Fragment>
              )}
              {data.latest_invoice && (
                <Fragment>
                  <SubHeading>
                    <div>
                      <h4>Latest Invoice</h4>
                    </div>
                  </SubHeading>
                  <InvoiceTable>
                    <thead>
                      <tr>
                        <th style={{ width: 'auto' }}>ID</th>
                        <th style={{ width: '15%' }}>Status</th>
                        <th style={{ width: '15%' }}>Amount</th>
                        <th style={{ width: '15%' }}>Created</th>
                        <th style={{ width: '15%' }}></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{data.latest_invoice.id || '-'}</td>
                        <td>
                          <Badge
                            type={
                              data.latest_invoice.status === 'paid'
                                ? 'success'
                                : 'ghost'
                            }
                            size="sm"
                          >
                            {data.latest_invoice.status || 'unknown'}
                          </Badge>
                        </td>
                        <td>${data.latest_invoice.total || '0.00'}</td>
                        <td>
                          {(data.latest_invoice.created &&
                            dayjs(data.latest_invoice.created).format(
                              'DD MMM YYYY'
                            )) ||
                            '-'}
                        </td>
                        <td>
                          {data.latest_invoice.hosted_invoice_url && (
                            <a
                              className="link"
                              href={data.latest_invoice.hosted_invoice_url}
                            >
                              View Invoice
                            </a>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </InvoiceTable>
                </Fragment>
              )}
            </Fragment>
          )}
        </Wrapper>
      ) : null}
    </Fragment>
  )
}

export default SingleSubscription

const Wrapper = styled.div`
  padding: 1.5rem;
  .sub-heading-wrapper {
    h4 {
      margin-bottom: 0;
    }
    p {
      margin-bottom: 1rem;
    }
  }
  .sub-heading-border {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 1rem;
  }
`

const SubHeading = styled.div`
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h4,
  p {
    margin: 0 0 0.5rem;
  }
  a {
    margin-right: 2rem;
  }
`
const InvoiceFooter = styled.div`
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 3rem;
  padding-bottom: 0.5rem;
  .container {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: auto 100px;
    max-width: 300px;
    margin-left: auto;
    p {
      margin: 0 0 0.5rem;
    }
    .amount {
      font-size: 0.8rem;
    }
    .currency-symbol {
      margin-right: 2px;
    }
  }
`

const InvoiceTable = styled.table`
  margin-bottom: 1rem;
  thead {
    tr {
      border-top: unset;
    }
  }
  td,
  th {
    font-size: 0.875rem;
  }
  th {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  th,
  td {
    text-align: start;
    padding: 0.7rem 1.25rem;
  }
  .amount {
    font-weight: 600;
    color: #888;
    letter-spacing: 1.5px;
  }
  .negative:before {
    content: '-';
  }
  ${Badge} {
    min-width: 75px;
  }
`

const HorizontalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 3rem;
  p {
    margin: 0;
    line-height: 1.7;
  }
  .info-item-label {
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  .info-item {
    &:not(:last-child) {
      margin-right: 1.5rem;
      padding-right: 1.5rem;
      border-right: 1px solid #e7e7e7;
    }
  }
`
const SubDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  max-width: 1000px;
  margin-bottom: 4rem;
  .sub-item {
    display: grid;
    grid-template-columns: minmax(75px, 170px) auto;
    height: fit-content;
    align-items: flex-start;
    padding-right: 2rem;

    .sub-value {
      color: #878787;
    }
    p {
      line-height: 2.5;
      margin: 0;
    }
  }
`
const HeadWrappper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  .heading {
    p {
      display: block;
      padding-bottom: 0.7rem;
      font-weight: bold;
      color: #878787;
    }
    display: flex;
    align-items: flex-end;
    padding-top: 1rem;

    h2 {
      margin-right: 1rem;
      margin-bottom: 0;
      text-transform: capitalize;
    }
    margin-bottom: 1rem;
  }
  button {
    margin-right: 2rem;
  }
`

const PaymentCardWrapper = styled.span`
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
