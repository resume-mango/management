import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import DownArrowIcon from '../svgs/downArrow'
import TickMarkIcon from '../svgs/tickMark'

interface IProps {
  options: Array<{ label: string; name: string }>
  value: string
  setValue: (_val: string) => void
  name: string
}

const Select: React.FC<IProps> = ({ options, value, setValue, name }) => {
  const [show, setShow] = useState(false)

  const { isOutside, ref } = detectOutsideClick()

  useEffect(() => {
    if (!isOutside) return
    setShow(false)
  }, [isOutside])

  const handleSelect = (item: string) => {
    setValue(item)
    setShow(false)
  }

  return (
    <Fragment>
      <Wrapper ref={ref} data-test-id="sort-by">
        <SortWrapper onClick={() => setShow(!show)}>
          <div>
            <span className="line-clamp-1">Search By&nbsp;&nbsp;</span>
            <span
              className="line-clamp-1"
              style={{ color: '#343434', textTransform: 'capitalize' }}
            >
              {options.find((item) => item.name === value)?.label}
            </span>
          </div>
          <div>
            <DownArrowIcon />
          </div>
        </SortWrapper>
        <ListWrapper show={show}>
          {options.map((item, i) => (
            <li key={i} onClick={() => handleSelect(item.name)}>
              {item.label}
              {item.name === value && (
                <span>
                  <TickMarkIcon />
                </span>
              )}
            </li>
          ))}
        </ListWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default Select

const Wrapper = styled.div`
  position: relative;
`

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  height: 40px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 4px;
  font-size: 0.9rem;
  color: #777;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
  }
`
const ListWrapper = styled.ul<{ show: boolean }>`
  display: flex;
  position: absolute;
  z-index: 1;
  top: calc(100% + 10px);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  flex-direction: column;
  transition: all ease 0.1s;
  height: auto;
  padding: ${({ show }) => (show ? '0.5rem 0' : '0')};
  max-height: ${({ show }) => (show ? '500px' : '0px')};
  overflow: ${({ show }) => (show ? 'auto' : 'hidden')};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'all' : 'none')};
  user-select: none;
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.3rem 1rem;
    transition: background-color ease 0.3s;
    text-transform: capitalize;
    font-size: 0.8rem;
    &:hover {
      background-color: #eee;
    }
    span {
      display: inline-flex;
      margin-left: 0.7rem;
    }
  }
`
