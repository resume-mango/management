import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const TickMarkIcon = ({ size, color, className }: IconProps) => {
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
          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
        />
      </svg>
    </Fragment>
  )
}

export default TickMarkIcon
