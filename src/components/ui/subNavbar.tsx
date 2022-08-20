import React, { ReactNode } from 'react'
import styled from 'styled-components'

const SubNavBar = ({
  children,
  border = true,
  style,
}: {
  children: ReactNode
  border?: boolean
  style?: any
}) => {
  return (
    <SubNav className={border ? 'border' : ''} style={style}>
      {children}
    </SubNav>
  )
}

const SubNavLink = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>
}
SubNavBar.Link = SubNavLink

export default SubNavBar

const SubNav = styled.ul`
  display: flex;
  padding: 0 0.875rem;
  user-select: none;
  &.border {
    border-bottom: 1px solid #e2e9f3;
  }
  li {
    display: flex;
    float: left;
    padding: 0;
    &:not(:last-child) a {
      margin-right: 1rem;
    }
    a {
      color: #878787;
      padding: 1.5rem 1rem 0.5rem;
      transition: color ease-in-out 300ms;
      &:hover {
        color: #f08438;
      }
      &.active {
        font-weight: 700;
        color: #f08438;
        border-bottom: 2px solid #f08438;
      }
    }
  }
  @media (max-width: 480px) {
    justify-content: space-between;
    li {
      a {
        margin: 0 0.5rem;
        padding: 0.5rem 0;
        font-size: 0.8rem;
      }
    }
  }
`
