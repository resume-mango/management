import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const LinkIcon = ({ size, color, className }: IconProps) => {
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
          d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
        />
      </svg>
    </Fragment>
  )
}

export default LinkIcon
