import React, { Fragment } from 'react'
import styled from 'styled-components'
import CrossIcon from '../svgs/cross'

interface IProps {
  type: 'info' | 'success' | 'warning' | 'danger'
  show: boolean
  setShow?: (val: boolean) => void
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const AlertMessage: React.FC<IProps> = ({
  type,
  show,
  setShow,
  children,
  className,
  style,
}) => {
  if (show) {
    return (
      <Fragment>
        <Wrapper type={type} className={className} style={style}>
          {setShow && (
            <a onClick={() => setShow(false)}>
              <CrossIcon size="0.8rem" />
            </a>
          )}

          <div className="message-container">{children}</div>
        </Wrapper>
      </Fragment>
    )
  } else return null
}

export default AlertMessage

const Wrapper = styled.div<{ type: 'info' | 'success' | 'warning' | 'danger' }>`
  padding: 0.5rem;
  min-height: 36px;
  font-size: 0.8rem;

  border: 1px solid
    ${({ theme, type }) =>
      type === 'danger'
        ? theme.colors.danger
        : type === 'warning'
        ? theme.colors.warning
        : type === 'success'
        ? theme.colors.success
        : theme.colors.info};
  border-radius: 4px;
  position: relative;
  background-color: ${({ theme, type }) =>
    type === 'danger'
      ? theme.shades.danger
      : type === 'warning'
      ? theme.shades.warning
      : type === 'success'
      ? theme.shades.success
      : theme.shades.info};
  .message-container {
    max-width: 95%;
  }
  a {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 3px;
    margin: auto;
    &:hover svg path {
      stroke: ${({ theme, type }) =>
        type === 'danger'
          ? theme.colors.danger
          : type === 'warning'
          ? theme.colors.warning
          : type === 'success'
          ? theme.colors.success
          : theme.colors.info};
    }
  }
  p {
    margin: 0;
  }
  p,
  li,
  a,
  b {
    color: #5c5c5c;
    font-size: inherit;
  }
`
