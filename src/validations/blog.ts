import * as Yup from 'yup'

const title = Yup.string().max(100).required('Required')

const short_description = Yup.string().max(600).required('Required')

const slug = Yup.string()
  .matches(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/g,
    'small alphabets(a-z), numbers(0-9) and hypen(-) are allowed'
  )
  .max(100)
  .required('Required')

const content = Yup.string()

const status = Yup.string().oneOf(['published', 'draft'])

export const blogSchema = Yup.object().shape({
  title,
  short_description,
  slug,
  content,
  status,
})
