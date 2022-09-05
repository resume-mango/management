import * as Yup from 'yup'

const name = Yup.string()
  .max(127, 'max 127 characters allowed!')
  .required('Required')
const description = Yup.string()
  .max(127, 'max 127 characters allowed!')
  .required('Required')
const label = Yup.string()
  .max(127, 'max 127 characters allowed!')
  .required('Required')
const type = Yup.string().oneOf(['starter', 'pro', 'ceo']).required()
const price = Yup.number()
  .typeError('Invalid Number')
  .min(0, 'Min 0 value allowed')
  .required('Required')
const highlights = Yup.array().of(
  Yup.object().shape({
    key: Yup.string()
      .max(256, 'Max 256 characters allowed!')
      .required('Required'),
    bool: Yup.boolean().required('Required'),
  })
)

export const createPlanSchema = Yup.object().shape({
  name,
  description,
  label,
  type,
  price,
  highlights,
})
