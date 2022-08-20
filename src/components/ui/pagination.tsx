import React from 'react'
import styled from 'styled-components'
import { usePagination, DOTS } from '../../hooks/usePagination'
import DownArrowIcon from '../svgs/downArrow'
interface IPaginate {
  className?: string
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
  rangeSize?: number
  onPageChange: (_val: number) => void
}

const Pagination = ({
  className = '',
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
  rangeSize,
}: IPaginate) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    rangeSize,
  })

  if (!paginationRange || currentPage < 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = (paginationRange[paginationRange.length - 1] as number) - 1
  return (
    <PaginationContainer className={className}>
      {/* Left navigation arrow */}
      <li
        className={`pagination-item ${currentPage === 0 ? 'disabled' : ''}`}
        onClick={onPrevious}
      >
        <div className="arrow left">
          <DownArrowIcon size="0.8rem" />
        </div>
      </li>
      {paginationRange.map((pageNumber: any, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>
        }

        // Render our Page Pills
        return (
          <li
            key={i}
            className={`pagination-item ${
              pageNumber - 1 === currentPage ? 'selected' : ''
            }`}
            onClick={() => onPageChange(pageNumber - 1)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? 'disabled' : ''
        }`}
        onClick={onNext}
      >
        <div className="arrow right">
          <DownArrowIcon size="0.8rem" />
        </div>
      </li>
    </PaginationContainer>
  )
}

export default Pagination

const PaginationContainer = styled.ul`
  display: flex;
  user-select: none;
  padding: 0.5rem 0.5rem;
  align-items: center;
  width: fit-content;
  justify-content: center;
  border: 1px solid #eeeeee93;
  margin: 0 1.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 15px 0px #0000000f;

  .pagination-item {
    padding: 0 12px;
    height: 40px;
    text-align: center;
    margin: auto 4px;
    color: #343434;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: 1rem;
    min-width: 40px;

    &.dots:hover {
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: ${({ theme }) => theme.shades.primary[4]};
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      .arrow svg path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }

    &.selected {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }

    .arrow {
      display: flex;
      align-items: center;
      svg path {
        stroke-width: 2;
      }

      &.left {
        transform: rotate(90deg);
      }

      &.right {
        transform: rotate(270deg);
      }
    }

    &.disabled {
      pointer-events: none;

      .arrow svg path {
        stroke: #ccc;
      }

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
`
