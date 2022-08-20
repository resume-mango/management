import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const CreditCardIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        fill="none"
      >
        <path
          fill={color || '#898989'}
          d="M20 6L20 18L4 18L4 6H20M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4M11 10H6V14H11V10Z"
        />
      </svg>
    </Fragment>
  )
}

export default CreditCardIcon
