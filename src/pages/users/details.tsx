import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useNotify } from '../../contexts/notify'
import { handleDeleteSuccess } from '../../helpers/userHelper'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'

const Details = ({
  user,
  localUser,
  roles,
}: {
  user: Record<string, any>
  localUser: Record<string, any>
  roles: Array<Record<string, any>>
}) => {
  const queryClient = useQueryClient()
  const { setNotify } = useNotify()
  const activeSub = (localUser && localUser.current_subscription) || null
  const navigate = useNavigate()
  dayjs.extend(relativeTime)

  const delMutation = useMutation(
    (id: string) => axios.delete(`/management/user/${id}`),
    {
      onSuccess: (res: any) => {
        handleDeleteSuccess(user.user_id, res, queryClient, navigate)
      },
      onError: () => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to delete user',
        })
      },
    }
  )

  const deleteUser = (id: string) => {
    delMutation
      .mutateAsync(id)
      .then((_val) => true)
      .catch((_err) => false)
  }

  return (
    <Fragment>
      <Wrapper>
        <HeadingWrapper>
          <h3>Provider Details</h3>
        </HeadingWrapper>
        <Container>
          <InfoItem>
            <p className="label">Name</p>
            <p className="value">{user.name}</p>
          </InfoItem>
          <InfoItem>
            <p className="label">Email</p>
            <p className="value">{user.email}</p>
            {user.email_verified && <p className="label">(Email verified)</p>}
          </InfoItem>
          <InfoItem>
            <p className="label">Auth Provider ID</p>
            <p className="value">{user.user_id || '-'}</p>
          </InfoItem>
          <InfoItem>
            <p className="label">Stripe Customer ID</p>
            <p className="value">
              {(localUser && localUser.stripe && localUser.stripe.customerId) ||
                '-'}
            </p>
          </InfoItem>
          <InfoItem>
            <p className="label">Roles</p>
            <p className="value">
              <span className="capitalize">
                {roles && roles.length > 0
                  ? roles.map((role, i) => (
                      <Fragment key={i}>
                        {role.name}
                        {roles.length > 0 &&
                          i >= 0 &&
                          i < roles.length - 1 &&
                          ', '}
                      </Fragment>
                    ))
                  : 'Free'}
              </span>
            </p>
          </InfoItem>
          <InfoItem>
            <p className="label">Primary Identity user</p>
            <p className="value">
              {user.identities.length > 0
                ? user.identities.map((identity: string) =>
                    identity === 'google-oauth2' ? 'Google' : 'Auth0'
                  )
                : 'unknown'}
            </p>
          </InfoItem>
          <InfoItem>
            <p className="label">Last Login</p>
            <p className="value">
              {dayjs(user.last_login).format('DD MMMM YYYY, hh:mm:ss A')}
            </p>
          </InfoItem>
          <InfoItem>
            <p className="label">Signed Up</p>
            <p className="value">
              {dayjs(user.created_at).format('DD MMMM YYYY, hh:mm:ss A')}
            </p>
          </InfoItem>
        </Container>
        {activeSub && (
          <Fragment>
            <HeadingWrapper>
              <h3>Active Subscription Details</h3>
            </HeadingWrapper>
            <Container>
              <InfoItem>
                <p className="label"> Reference ID</p>
                <p className="value">{activeSub._id || '-'}</p>
              </InfoItem>
              <InfoItem>
                <p className="label">Stripe Subscription ID</p>
                <p className="value">
                  {(activeSub.reference &&
                    activeSub.reference.subscription_id) ||
                    '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Stripe Price ID</p>
                <p className="value">
                  {(activeSub.reference && activeSub.reference.price_id) || '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Plan Name</p>
                <p className="value capitalize">{activeSub.name || '-'}</p>
              </InfoItem>
              <InfoItem>
                <p className="label">Amount</p>
                <p className="value capitalize">
                  {(activeSub.amount &&
                    `$${activeSub.amount} ${
                      activeSub.currency && activeSub.currency.toUpperCase()
                    }`) ||
                    '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Status</p>
                <p className="value">
                  {activeSub.status && activeSub.status === 'active' ? (
                    <Badge
                      type="success"
                      size="sm"
                      style={{ minWidth: '100px' }}
                    >
                      {activeSub.status}
                    </Badge>
                  ) : (
                    <Badge type="ghost" size="sm" style={{ minWidth: '100px' }}>
                      {activeSub.status}
                    </Badge>
                  )}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Created Date</p>
                <p className="value">
                  {(activeSub.create_time &&
                    dayjs(activeSub.create_time).format(
                      'DD MMM YYYY, hh:mm a'
                    )) ||
                    '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Next Billing Date</p>
                <p className="value">
                  {(activeSub.current_period_end &&
                    dayjs(activeSub.current_period_end).format(
                      'DD MMM YYYY, hh:mm a'
                    )) ||
                    '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">Current Period </p>
                <p className="value">
                  {(activeSub.current_period_start &&
                    dayjs(activeSub.current_period_start).format(
                      'DD MMM YYYY'
                    )) ||
                    '-'}
                  &nbsp;to&nbsp;
                  {(activeSub.current_period_end &&
                    dayjs(activeSub.current_period_end).format(
                      'DD MMM YYYY'
                    )) ||
                    '-'}
                </p>
              </InfoItem>
              <InfoItem>
                <p className="label">End Date</p>
                <p className="value">
                  {(activeSub.ended_time &&
                    dayjs(activeSub.ended_time).format('DD MMM YYYY')) ||
                    '-'}
                </p>
              </InfoItem>
            </Container>
          </Fragment>
        )}
        <Button
          btnType="danger"
          size="xl"
          onClick={() => deleteUser(localUser._id)}
          disabled={delMutation.isLoading}
        >
          {delMutation.isLoading ? (
            <Spinner type="white" size="1.4rem" />
          ) : (
            <Fragment>Permanently Delete User</Fragment>
          )}
        </Button>
      </Wrapper>
    </Fragment>
  )
}

export default Details

const Wrapper = styled.div`
  padding: 2rem;
`
const Container = styled.div`
  display: grid;
  max-width: 900px;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 6px;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  margin-bottom: 4rem;
`

const InfoItem = styled.div`
  p {
    line-height: 1.7;
    margin: 0;
    &.label {
      font-size: 0.875rem;
      color: #999;
    }
    &.value {
      font-size: 01rem;
    }
  }
`
const HeadingWrapper = styled.div`
  display: block;
  align-items: center;
  padding: 1rem 0;
  .highlight {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`
