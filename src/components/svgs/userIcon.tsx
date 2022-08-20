import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const UserIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 14 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M13.4508 12.2412C13.0996 11.3992 12.5899 10.6344 11.9502 9.98932C11.3125 9.34242 10.557 8.82664 9.72551 8.47048C9.71807 8.46671 9.71062 8.46482 9.70317 8.46105C10.863 7.61307 11.617 6.23178 11.617 4.67337C11.617 2.09171 9.55052 0 7 0C4.44949 0 2.38301 2.09171 2.38301 4.67337C2.38301 6.23178 3.13699 7.61306 4.29683 8.46294C4.28938 8.46671 4.28193 8.46859 4.27449 8.47236C3.44045 8.82852 2.69205 9.3392 2.04977 9.99121C1.41067 10.6367 0.901113 11.4015 0.549245 12.2431C0.203571 13.0671 0.0171405 13.9505 4.65534e-05 14.8455C-0.000450341 14.8656 0.00303479 14.8856 0.0102967 14.9043C0.0175586 14.9231 0.0284503 14.9401 0.04233 14.9545C0.0562097 14.9689 0.0727966 14.9804 0.0911133 14.9882C0.10943 14.996 0.129106 15 0.148982 15H1.266C1.34791 15 1.41307 14.934 1.41493 14.853C1.45216 13.3982 2.02929 12.0358 3.04949 11.0031C4.10507 9.93467 5.50693 9.34673 7 9.34673C8.49308 9.34673 9.89493 9.93467 10.9505 11.0031C11.9707 12.0358 12.5478 13.3982 12.5851 14.853C12.5869 14.9359 12.6521 15 12.734 15H13.851C13.8709 15 13.8906 14.996 13.9089 14.9882C13.9272 14.9804 13.9438 14.9689 13.9577 14.9545C13.9715 14.9401 13.9824 14.9231 13.9897 14.9043C13.997 14.8856 14.0005 14.8656 14 14.8455C13.9813 13.9447 13.797 13.0685 13.4508 12.2412ZM7 7.91457C6.14548 7.91457 5.34123 7.57726 4.73619 6.96482C4.13114 6.35239 3.79789 5.53832 3.79789 4.67337C3.79789 3.80842 4.13114 2.99435 4.73619 2.38191C5.34123 1.76947 6.14548 1.43216 7 1.43216C7.85452 1.43216 8.65877 1.76947 9.26381 2.38191C9.86886 2.99435 10.2021 3.80842 10.2021 4.67337C10.2021 5.53832 9.86886 6.35239 9.26381 6.96482C8.65877 7.57726 7.85452 7.91457 7 7.91457Z'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default UserIcon
