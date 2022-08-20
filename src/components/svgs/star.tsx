import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}

const StarOutlineIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || ''}
      >
        <path
          fill={color || '#D9D9D9'}
          d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
        />
      </svg>
    </Fragment>
  )
}

export default StarOutlineIcon
