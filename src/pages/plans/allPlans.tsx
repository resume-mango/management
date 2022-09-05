import dayjs from 'dayjs'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DashPageHeader from '../../components/ui/dashPageHeader'
import EmptyPage from '../../components/ui/emptyPage'
import { getPlans } from '../../queries/planQueries'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'

const AllPlans = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError } = getPlans()

  return (
    <Fragment>
      <DashPageHeader title="Plans"></DashPageHeader>

      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load Plans!</h3>
        </div>
      ) : isLoading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Loading</LoadingDots>
        </LoadingWrapper>
      ) : data ? (
        <Fragment>
          {data.length > 0 ? (
            <Fragment>
              {data.map((item: Record<string, any>, i: number) => (
                <PlanWrapper
                  key={i}
                  onClick={() => navigate(`/plans/${item._id}`)}
                >
                  <div className="plan-grid ">
                    <div className="plan-item">
                      <h4 className="capitalize">{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="plan-item">
                      <div>
                        <b className="heading">Stripe</b>
                        <ListWrapper>
                          <b> Product Id</b>
                          <p className="truncate">
                            {(item.stripe && item.stripe.productId) || '-'}
                          </p>
                          <b> Price Id</b>
                          <p className="truncate">
                            {(item.stripe && item.stripe.priceId) || '-'}
                          </p>
                        </ListWrapper>
                      </div>
                    </div>
                    <div className="plan-item">
                      <div>
                        <ListWrapper>
                          <b>Type</b>
                          <p className="capitalize">{item.type}</p>
                          <b>Billing Interval</b>
                          {item.payment_type === 'one_time' ? (
                            <p>One Time</p>
                          ) : (
                            <p>
                              Every {item.interval_count} {item.interval}
                            </p>
                          )}

                          <b>Price</b>
                          <p>{item.price.toFixed(2)} CAD</p>
                        </ListWrapper>
                        <hr />
                        <ListWrapper>
                          <b>Created</b>
                          <p>{dayjs(item.createdAt).format('DD MMM YYYY')}</p>
                          <b>Updated</b>
                          <p>{dayjs(item.updatedAt).format('DD MMM YYYY')}</p>
                        </ListWrapper>
                      </div>
                    </div>
                  </div>
                </PlanWrapper>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              <EmptyPage
                title={'No Plans'}
                description={
                  'You have not created any plan yet. Create your first plan now.'
                }
              />
            </Fragment>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default AllPlans

const PlanWrapper = styled.div`
  margin: 1.5rem;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  transition: ease 300ms;
  cursor: pointer;
  &:hover {
    background-color: rgba(240, 132, 56, 0.1);
  }
  .plan-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #e7e7e7;
    padding: 0.5rem 1rem;
  }
  .plan-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    b {
      color: #777;
    }
    h4 {
      margin-bottom: 0.3rem;
    }
    p,
    b {
      line-height: 1.9;
      font-size: 0.875rem;
      margin: 0;
    }

    .plan-item {
      padding: 1rem;
      &:not(:last-child) {
        border-right: 1px solid #e7e7e7;
      }

      b.heading {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 900;
        text-transform: uppercase;
      }
    }
  }
`
const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(75px, 120px) auto;
`
