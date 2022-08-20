import React from 'react'
import { useFormContext } from 'react-hook-form'
import { InvalidFeedBack } from '../../styled/form'

interface ITextarea {
  name: string
  label: string
  style?: React.CSSProperties
  className?: string
}

const TextArea: React.FC<
  ITextarea &
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
> = ({ name, label, style, className, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const initialStyle = { maxWidth: '100%', maxHeight: '50vh' }

  return (
    <div className={className ? className : ''}>
      <label htmlFor={name}>{label}</label>
      <textarea
        style={{ ...initialStyle, ...style }}
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <InvalidFeedBack>{errors[name].message}</InvalidFeedBack>
      )}
    </div>
  )
}

export default TextArea
