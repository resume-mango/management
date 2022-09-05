import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useNotify } from '../../contexts/notify'
import PlanForm from './planForm'
import { getSinglePlan } from '../../queries/planQueries'
import { LoadingDots, LoadingWrapper, Spinner } from '../../styled/loader'

const Plan = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { setNotify } = useNotify()

  const handleSave = (data: any): Promise<any> => {
    return mutateEditPlan
      .mutateAsync(data)
      .then((_val) => true)
      .catch((_err) => false)
  }

  const mutateEditPlan = useMutation(
    (planData) => axios.patch(`/management/plan/${id}`, planData),
    {
      onSuccess: (res: any) => {
        res && res._id && queryClient.setQueryData(['plan', res._id], res.data)
      },
      onError: ({ _response }) => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to update plan',
        })
      },
    }
  )
  if (!id)
    return (
      <div className="align-center" style={{ height: '30vh' }}>
        <h3>Failed to load editor!</h3>
      </div>
    )
  const { data, isLoading, isError } = getSinglePlan(id)

  if (isLoading)
    return (
      <LoadingWrapper>
        <Spinner type="primary" size="2rem" />
        <LoadingDots color="#f08438">Loading Plan</LoadingDots>
      </LoadingWrapper>
    )

  if (isError || !data)
    return (
      <div className="align-center" style={{ height: '30vh' }}>
        <h3>Failed to load plan!</h3>
      </div>
    )

  const initialData = {
    name: data.name || '',
    description: data.description || '',
    label: data.label || '',
    price: data.price || 0,
    interval: data.interval || 'day',
    interval_count: data.interval_count || 1,
    payment_type: data.payment_type || 'one_time',
    highlights: data.highlights || [],
    type: data.type,
    stripe: {
      priceId: (data.stripe && data.stripe.priceId) || '',
      productId: (data.stripe && data.stripe.productId) || '',
    },
  }

  if (data)
    return (
      <PlanForm initialData={initialData} handleSave={handleSave} id={id} />
    )
  else return null
}

export default Plan
