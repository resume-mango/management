import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const BlogIcon = ({ size, color, className }: IconProps) => {
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
          d="M19 5V19H5V5H19M21 3H3V21H21V3M17 17H7V16H17V17M17 15H7V14H17V15M17 12H7V7H17V12Z"
        />
      </svg>
    </Fragment>
  )
}

export default BlogIcon
