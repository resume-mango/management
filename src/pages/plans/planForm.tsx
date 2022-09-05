import { yupResolver } from '@hookform/resolvers/yup'
import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CheckBox from '../../components/form/checkBox'
import Input from '../../components/form/Input'
import TextArea from '../../components/form/textarea'
import BackArrow from '../../components/svgs/backArrow'
import DownArrowIcon from '../../components/svgs/downArrow'
import DustBinIcon from '../../components/svgs/dustbin'
import DropButton from '../../components/ui/DropButton'
import RouterPrompt from '../../components/ui/routerPrompt'
import useExitPrompt from '../../hooks/useExitPromt'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'
import { createPlanSchema } from '../../validations/plans'
import StripeImg from '../../public/logo/stripe.png'
import { apiGetPlanReferenceData } from '../../apis/plans'
import PenIcon from '../../components/svgs/pen'
import AlertMessage from '../../components/ui/alertMessage'
import { GridForm } from '../../styled/form'

interface IForm {
  name: string
  desription: string
  label: string
  type: string
  price: number
  interval: string
  payment_type: 'one_time' | 'recurring'
  interval_count: number
  highlights: Array<{ key: string; bool: boolean }>
  stripe: {
    priceId: string
    productId: string
  }
}

interface IProps {
  handleSave: (data: Record<string, any>) => any
  initialData?: Record<string, any>
  id: string
}

const PlanForm: React.FC<IProps> = ({ handleSave, initialData, id }) => {
  const [showInterval, setShowInterval] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const [refData, setRefData] = useState<Record<string, any>>({})
  const [refError, setRefError] = useState<Record<string, any>>({})
  const [refWarnings, setRefWarnings] = useState<Record<string, any>>([])
  const [fetchingRef, setFetchingRef] = useState(false)
  const [editRef, setEditRef] = useState(false)

  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)
  const navigate = useNavigate()

  const methods = useForm<IForm>({
    mode: 'onBlur',
    defaultValues: initialData,
    resolver: yupResolver(createPlanSchema),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = methods

  const planType = watch('type')
  const interval = watch('interval')
  const interval_count = watch('interval_count')
  const paymentType = watch('payment_type')
  const amount = Number(watch('price') as any)
  const name = watch('name')
  const stripe = watch('stripe')

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'highlights', // unique name for your Field Array
  })

  const handleForm = async (data: Record<string, any>) => {
    const updated = await handleSave(data)
    if (updated) reset({}, { keepValues: true })
    return updated
  }

  const handleInterval = (val: string) => {
    if (val !== interval) {
      setValue('interval', val, { shouldDirty: true, shouldValidate: true })
    }
    setShowInterval(false)
  }
  const handlePaymentType = (val: 'one_time' | 'recurring') => {
    if (val !== paymentType) {
      setValue('payment_type', val, { shouldDirty: true, shouldValidate: true })
    }
    setShowPayment(false)
  }

  useEffect(() => {
    if (isDirty || !isValid || isSubmitting) {
      setShowExitPrompt(true)
    } else {
      setShowExitPrompt(false)
    }
  }, [isDirty, isSubmitting, isValid])

  useEffect(() => {
    const warnings: Record<string, any> = []

    if (Object.keys(refData).length <= 0) return
    const { price } = refData

    if (price) {
      if (!price.active) warnings.push(`Stripe price is Inactive`)

      const stripeAmt = Number(price.unit_amount) / 100
      if (stripeAmt !== Number(amount)) {
        warnings.push(
          `Stripe amount (${stripeAmt}) doesn't matches current plan amount (${amount})`
        )
      }

      if (price.recurring) {
        if (price.recurring.interval !== interval) {
          warnings.push(
            `Stripe interval (${price.recurring.interval}) doesn't matches current plan interval (${interval})`
          )
        }
        if (Number(price.recurring.interval_count) !== Number(interval_count)) {
          warnings.push(
            `Stripe interval count should be (${interval_count}) but recieved (${price.recurring.interval_count})`
          )
        }
      } else {
        warnings.push(
          'Invalid subscription price, change price to recurring on stripe dashboard'
        )
      }
    }

    setRefWarnings(warnings)
  }, [refData, amount, interval, interval_count, paymentType])

  const handleRefData = async () => {
    if (stripe.priceId) {
      setFetchingRef(true)

      const { data, error } = await apiGetPlanReferenceData({
        stripePrice: stripe.priceId,
        id,
      })
      if (error) {
        setRefData({})
        if (error.response && error.response.data.error) {
          setRefError({
            message: error.response.data.error.message || '',
            data: error.response.data.error.data || '',
          })
        } else {
          setRefError({ message: 'Something went wrong' })
        }
      }
      if (data) {
        setRefError({})
        setRefData(data)
      }
    }
    setFetchingRef(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRefData()
    }, 1000)

    return () => clearTimeout(timer)
  }, [stripe.priceId])

  const handleShowError = (val: boolean) => {
    if (!val) setRefError({})
    return
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <RouterPrompt show={showExitPrompt} setShow={setShowExitPrompt} />
        <Wrapper>
          <Button
            data-test-id="go-back"
            btnType="ghost"
            size="lg"
            style={{ width: 'fit-content', padding: '0 1rem' }}
            onClick={() => navigate('/plans')}
            className="mb-3"
          >
            <BackArrow size="1.4rem" />
          </Button>
          <h2 className="mb-3 capitalize">{name ? name : 'Untitled Plan'}</h2>
          <form onSubmit={handleSubmit(handleForm)}>
            <GridForm columns="auto 30%">
              <Input label="Plan Name" name="name" className="mb-2" />
              <Input
                label="Plan Type"
                name="type"
                className="mb-2"
                disabled={true}
              />
            </GridForm>
            <Input label="Plan Label" name="label" className="mb-2" />
            <TextArea
              style={{ resize: 'none', minHeight: '150px' }}
              className="mb-2"
              label="Plan Description"
              name="description"
            />
            {planType !== 'free' && (
              <div data-test-id="stripe-refrence">
                <AlertMessage
                  className="mb-1"
                  type="warning"
                  show={refWarnings.length > 0}
                >
                  <b>Stripe Warnings:</b>
                  <ul>
                    {refWarnings.map((item: Record<string, any>, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AlertMessage>
                <Container>
                  <div className="grid-item">
                    <div className="img-wrapper">
                      <img src={StripeImg} width={'75px'} />
                    </div>
                    <label>Stripe Price Id</label>

                    <div
                      className={`ref-input mb-2 ${
                        fetchingRef || !editRef ? 'disabled' : ''
                      }`}
                    >
                      <Input
                        name="stripe.priceId"
                        placeholder="e.g price_1KwnEUSDGyc6R8oHmSQeOKov"
                        disabled={fetchingRef || !editRef}
                        onBlur={() => setEditRef(false)}
                        className="input-wrapper"
                      />
                      {fetchingRef ? (
                        <span className="ref-input-action">
                          <Spinner type="primary" size="1.4rem" />
                        </span>
                      ) : !editRef ? (
                        <a
                          className="ref-input-action"
                          onClick={() => setEditRef(true)}
                        >
                          <PenIcon size="1.3rem" />
                        </a>
                      ) : null}
                    </div>
                    {refData && refData.price && refData.product && (
                      <Fragment>
                        <b>Product</b>
                        <hr />
                        <DataWrapper>
                          <p>Product Name</p>
                          <p>{refData.product.name || '-'}</p>
                          <p>Description</p>
                          <p>{refData.product.description || '-'}</p>
                        </DataWrapper>
                        <b>Price</b>
                        <hr />
                        <DataWrapper>
                          <p>Status</p>
                          <p>
                            {refData.price.active
                              ? 'ACTIVE'
                              : 'INACTIVE' || '-'}
                          </p>

                          <p>Price</p>
                          <p>
                            {(refData.price.unit_amount / 100).toFixed(2)}
                            &nbsp;
                            {refData.price.currency.toUpperCase()}
                          </p>
                          <p>Billing Interval</p>
                          {refData.price.recurring ? (
                            <p>
                              Every&nbsp;
                              {refData.price.recurring.interval_count}
                              &nbsp;
                              {refData.price.recurring.interval}
                            </p>
                          ) : (
                            <p>One Time</p>
                          )}
                        </DataWrapper>
                      </Fragment>
                    )}
                  </div>
                </Container>
                <AlertMessage
                  className="mb-2"
                  type="danger"
                  show={Object.keys(refError).length > 0}
                  setShow={handleShowError}
                >
                  {Object.keys(refError).length > 0 && (
                    <Fragment>
                      {refError.data ? (
                        <Fragment>
                          {refError.data.length > 0 && (
                            <div className="mb-1">
                              <b>
                                Stripe price id already used on below
                                product(s):
                              </b>
                              {refError.data.map(
                                (item: Record<string, any>, i: number) => (
                                  <p key={i}>
                                    {i + 1}.&nbsp;{item.name}
                                  </p>
                                )
                              )}
                            </div>
                          )}
                        </Fragment>
                      ) : refError.message ? (
                        <p>{refError.message}</p>
                      ) : (
                        'Something went wrong, please try again later'
                      )}
                    </Fragment>
                  )}
                </AlertMessage>
              </div>
            )}
            <div className="mb-2">
              <label>Highlights</label>
              {fields.map((field, i) => (
                <HighlightWrapper key={field.id}>
                  <div className="highlight-btn ">
                    <CheckBox name={`highlights.${i}.bool`} customSize="xl" />
                  </div>
                  <div className="highlight-item ">
                    <Input name={`highlights.${i}.key`} />
                  </div>
                  <div className="highlight-btn ">
                    <span className="icon" onClick={() => remove(i)}>
                      <DustBinIcon size="1.2rem" />
                    </span>
                  </div>
                </HighlightWrapper>
              ))}
            </div>
            <Button
              size="sm"
              btnType="secondary"
              className="mb-2"
              onClick={() => append({ key: '', bool: false })}
            >
              Add Highlight
            </Button>
            {planType !== 'free' && (
              <SingleWrapper>
                <div className="mb-2">
                  <label>Payment Type</label>
                  <GhostDropButton
                    vertical="bottom"
                    horizontal="left"
                    show={showPayment}
                    setShow={setShowPayment}
                  >
                    <GhostDropButton.Button>
                      <p>
                        {paymentType === 'one_time' ? 'One Time' : paymentType}
                      </p>
                      <DownArrowIcon />
                    </GhostDropButton.Button>
                    <GhostDropButton.Item>
                      <a onClick={() => handlePaymentType('one_time')}>
                        One Time
                      </a>
                    </GhostDropButton.Item>
                    <GhostDropButton.Item>
                      <a onClick={() => handlePaymentType('recurring')}>
                        Recurring
                      </a>
                    </GhostDropButton.Item>
                  </GhostDropButton>
                </div>
                <Fragment>
                  <div className="mb-2">
                    <label>Payment Interval</label>
                    <GhostDropButton
                      vertical="bottom"
                      horizontal="left"
                      show={showInterval}
                      setShow={setShowInterval}
                    >
                      <GhostDropButton.Button>
                        <p>{interval}</p>
                        <DownArrowIcon />
                      </GhostDropButton.Button>
                      <GhostDropButton.Item>
                        <a onClick={() => handleInterval('day')}>Day</a>
                      </GhostDropButton.Item>
                      <GhostDropButton.Item>
                        <a onClick={() => handleInterval('week')}>Week</a>
                      </GhostDropButton.Item>
                      <GhostDropButton.Item>
                        <a onClick={() => handleInterval('month')}>Month</a>
                      </GhostDropButton.Item>
                      <GhostDropButton.Item>
                        <a onClick={() => handleInterval('year')}>Year</a>
                      </GhostDropButton.Item>
                    </GhostDropButton>
                  </div>

                  <div className="mb-2">
                    <Input
                      label="Interval Count"
                      type="number"
                      placeholder="1"
                      required
                      name="interval_count"
                      min="1"
                      step="1"
                    />
                  </div>
                </Fragment>

                <div className="mb-2">
                  <Input
                    label="Price (USD)"
                    type="number"
                    placeholder="0.00"
                    required
                    name="price"
                    min="0"
                    step="0.01"
                    pattern="^\d+(?:\.\d{1,2})?$"
                  />
                </div>
              </SingleWrapper>
            )}
            <AlertMessage
              type="warning"
              className="mb-1"
              show={refWarnings.length > 0}
            >
              <p>Clear all stripe warnings in order to save plan!</p>
            </AlertMessage>
            <Button
              btnType="primary"
              size="lg"
              type="submit"
              disabled={
                isSubmitting ||
                !isDirty ||
                !isValid ||
                Object.keys(refError).length > 0 ||
                fetchingRef ||
                refWarnings.length > 0
              }
            >
              {isSubmitting ? (
                <Spinner size="1.2rem" type="white" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </Wrapper>
      </FormProvider>
    </Fragment>
  )
}

export default PlanForm

const Wrapper = styled.div`
  padding: 1.5rem;
`
const GhostDropButton = styled(DropButton)<{ disabled?: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(217,217,217,1)' : 'rgba(244, 245, 247, 1)'};
  width: 100%;
  border-radius: 4px;
  padding: 0.6rem;
  p {
    font-size: 1rem;
    margin: 0;
    text-transform: capitalize;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const HighlightWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  margin: 0.5rem 0 1.5rem;
  width: 100%;
  align-items: center;
  .highlight-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
  .highlight-item {
    margin-left: 1rem;
  }
  .icon:hover {
    cursor: pointer;
    user-select: none;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

const SingleWrapper = styled.div`
  max-width: 300px;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  margin-bottom: 2rem;
  .img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .grid-item {
    padding: 1.5rem;
    border: 1px solid #e7e7e7;
    position: relative;
  }
  .ref-input {
    border-radius: 4px;
    display: flex;
    background-color: rgba(244, 245, 247, 1);
    &.disabled {
      background: ${({ theme }) => theme.colors.grey};
      a.ref-input-action {
        svg path {
          fill: ${({ theme }) => theme.colors.primary};
        }
        &:hover svg path {
          fill: #fff;
        }
      }
    }
    .input-wrapper {
      width: 100%;
    }
    a.ref-input-action {
      &:hover svg path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
    .ref-input-action {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(75px, 150px) auto;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`
