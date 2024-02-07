import dayjs from "dayjs"
import React, { Fragment } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import BackArrow from "../../components/svgs/backArrow"
import LinkIcon from "../../components/svgs/link"
import { getPaymentsById } from "../../queries/paymentQueries"
import { Badge } from "../../styled/badge"
import { Button } from "../../styled/button"
import { LoadingDots, LoadingWrapper, Spinner } from "../../styled/loader"

const SinglePayment = () => {
  const { payment_id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = getPaymentsById(
    payment_id ? payment_id : "",
    !!payment_id
  )
  return (
    <Fragment>
      {isError ? (
        <div className="align-center" style={{ height: "30vh" }}>
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
              width: "fit-content",
              padding: "0 1rem",
              marginBottom: "1rem",
            }}
            onClick={() => navigate("/payments")}
            data-test-id="go-back"
          >
            <BackArrow size="1.4rem" />
          </Button>
          <Fragment>
            <HeadWrappper>
              <div className="heading">
                <div>
                  <p style={{ margin: 0 }}>PAYMENTS</p>

                  <h2>
                    ${data.payment_details.amount || 0.0}
                    {data.payment_details.currency &&
                      data.payment_details.currency.toUpperCase()}
                  </h2>
                </div>
                <Badge
                  type={
                    data.status === "succeeded"
                      ? "success"
                      : data.status === "pending"
                      ? "primary"
                      : "ghost"
                  }
                  size={"md"}
                >
                  {data.status}
                </Badge>
              </div>
              <div></div>
            </HeadWrappper>
            <HorizontalInfo>
              <div className="info-item">
                <p className="info-item-label">Created</p>

                <p>
                  {data.date ? dayjs(data.date).format("DD MMM YYYY") : "-"}
                </p>
              </div>

              <div className="info-item">
                <p className="info-item-label">Customer</p>
                <p>
                  {data.provider_id ? (
                    <Link
                      to={`/users/${data.provider_id}/details`}
                      className="ref-link"
                    >
                      {data.email || data.provider_id} <LinkIcon />
                    </Link>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
              <div className="info-item">
                <p className="info-item-label">Purchased</p>
                <p>
                  {data.subscription_refrence_id && data.subscription_name ? (
                    <Link
                      to={`/subscriptions/${data.subscription_refrence_id}`}
                      className="ref-link capitalize"
                    >
                      {data.subscription_name} plan <LinkIcon />
                    </Link>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </HorizontalInfo>
            <h4 className="sub-heading-border">References</h4>
            <SubDetails>
              <div className="sub-item">
                <p>Invoice ID</p>
                <p className="sub-value">{data.references.invoice_id || "-"}</p>

                <p>Payment Intent ID</p>
                <p className="sub-value">
                  {data.references.payment_intent_id || "-"}
                </p>
                <p>Charge ID </p>
                <p className="sub-value">{data.references.charge_id || "-"}</p>
              </div>
              <div className="sub-item">
                <p>User ID</p>
                <p className="sub-value">{data.user_id || "-"}</p>
                <p>Customer ID</p>
                <p className="sub-value">
                  {data.references.customer_id || "-"}
                </p>
                <p>Subscription ID</p>
                <p className="sub-value">
                  {data.references.subscription_id || "-"}
                </p>
              </div>
            </SubDetails>

            <h4 className="sub-heading-border">Payment Details</h4>
            <SubDetails>
              <div className="sub-item">
                <p>Plan</p>
                <p className="sub-value">{data.payment_details.plan_name}</p>
                <p>Amount</p>
                <p className="sub-value">${data.payment_details.amount}</p>
                {data.payment_details.amount_refunded !== 0 && (
                  <Fragment>
                    <p>Refunded</p>
                    <p className="sub-value">
                      ${data.payment_details.amount_refunded || 0.0}
                    </p>
                  </Fragment>
                )}
                <p>Stripe Fee</p>
                <p className="sub-value">${data.payment_details.stripe_fee}</p>
                <p>Net</p>
                <b
                  className={`sub-value ${
                    data.payment_details.net_amount < 0 && "negative-sign"
                  }`}
                >
                  {data.payment_details.net_amount > 0
                    ? `$${data.payment_details.net_amount}`
                    : `$${Math.abs(data.payment_details.net_amount)}`}
                </b>
              </div>
              <div className="sub-item">
                <p>Payment Method</p>
                <p className="sub-value">
                  {data.payment_method.brand} {data.payment_method.last4}
                </p>
                <p>Date</p>
                <p className="sub-value">
                  {data.date
                    ? dayjs(data.date).format("DD MMM YYYY, hh:mm a")
                    : "-"}
                </p>
                <p> Address</p>
                <p className="sub-value">
                  {data.payee_address.line1 && `${data.payee_address.line1}, `}
                  {data.payee_address.line2 && `${data.payee_address.line2}, `}
                  {data.payee_address.city && `${data.payee_address.city}, `}
                  {data.payee_address.state && `${data.payee_address.state} `}
                  {data.payee_address.postal_code &&
                    `${data.payee_address.postal_code} `}
                  {data.payee_address.country &&
                    `${data.payee_address.country}`}
                </p>
              </div>
            </SubDetails>
          </Fragment>
        </Wrapper>
      ) : null}
    </Fragment>
  )
}

export default SinglePayment

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
    .negative-sign {
      position: relative;
      &::before {
        content: "- ";
        position: absolute;
        left: -10px;
      }
    }

    p,
    b {
      font-size: 0.875rem;
      color: inherit;
      word-wrap: break-word;
      word-break: break-all;
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
