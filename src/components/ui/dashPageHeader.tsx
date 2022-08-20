import React, { Fragment, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

interface ILayout {
  name?: string
  title: string | ReactElement<any, any>
  children?: ReactNode
  border?: boolean
}

const DashPageHeader: React.FC<ILayout> = ({
  name,
  title,
  children,
  border = true,
}) => {
  return (
    <Fragment>
      <Header border={border || false}>
        <div>
          {name && <p>{name}</p>}
          {title && <h1>{title}</h1>}
        </div>

        <div>{children}</div>
      </Header>
    </Fragment>
  )
}

export default DashPageHeader

const Header = styled.header<{ border: boolean }>`
  width: 100%;
  max-height: 125px;
  min-height: 125px;
  height: 100%;
  display: flex;
  border-bottom: ${({ border }) => border && '1px solid #e2e9f3'};
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  h1 {
    margin-bottom: 0;
    span {
      font-weight: normal;
    }
  }
  div:last-child {
    display: flex;
    button {
      margin: 0 1rem;
    }
  }
`
