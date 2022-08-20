import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const DiamondIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={color || '#898989'}
          d="M18,2H6L2,8L12,22L22,8L18,2M4.43,8L7.07,4H16.93L19.57,8L12,18.56L4.43,8Z"
        />
      </svg>
    </Fragment>
  )
}

export default DiamondIcon
