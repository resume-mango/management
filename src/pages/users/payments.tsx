import dayjs from "dayjs"
import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getUserPayments } from "../../queries/paymentQueries"
import { Badge } from "../../styled/badge"
import { Button } from "../../styled/button"
import { LoadingDots, LoadingWrapper, Spinner } from "../../styled/loader"
import { TableList } from "../../styled/table"

const Payments = ({ id }: { id: string }) => {
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  const { data, isLoading, isError } = getUserPayments(id, page, !!id)

  const handlePage = (type: "next" | "prev") => {
    type === "next" && setPage((page) => page + 1)
    type === "prev" && setPage((page) => page - 1)
  }

  const Empty = (
    <div className="align-center" style={{ height: "30vh" }}>
      <h3>No Past Payments!</h3>
    </div>
  )

  if (!id) return Empty
  else
    return (
      <Fragment>
        {isError ? (
          <div className="align-center" style={{ height: "30vh" }}>
            <h3>Failed to load payments!</h3>
          </div>
        ) : isLoading ? (
          <LoadingWrapper>
            <Spinner type="primary" size="2rem" />
            <LoadingDots color="#f08438">Loading</LoadingDots>
          </LoadingWrapper>
        ) : data && !isError ? (
          <Fragment>
            {data.items && data.items.length > 0 ? (
              <Fragment>
                <TableList>
                  <thead>
                    <tr>
                      <th style={{ width: "auto" }}>ID</th>
                      <th style={{ width: "15%" }}>Plan</th>
                      <th style={{ width: "10%" }}>Amount</th>
                      <th style={{ width: "15%" }}>Status</th>
                      <th style={{ width: "18%" }}>Card</th>
                      <th style={{ width: "18%" }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item: Record<string, any>, i: number) => (
                      <tr
                        key={i}
                        className="hover"
                        onClick={() => navigate(`/payments/${item.id}`)}
                      >
                        <td>{item.id || "-"}</td>
                        <td className="capitalize">{item.plan_name || "-"}</td>
                        <td>
                          ${item.amount || "0.00"}&nbsp;
                          {item.currency && item.currency}
                        </td>
                        <td className="capitalize">
                          {item.refunded ? (
                            <RefundWrapper>
                              <Badge type="ghost" size="sm">
                                Refunded
                              </Badge>
                              <span className="redund-amt">
                                ${item.amount_refunded || "0.00"}&nbsp;refunded
                              </span>
                            </RefundWrapper>
                          ) : item.amount_refunded > 0 ? (
                            <RefundWrapper>
                              <Badge type="ghost" size="sm">
                                Partial Refund
                              </Badge>
                              <span className="redund-amt">
                                ${item.amount_refunded}&nbsp;refunded
                              </span>
                            </RefundWrapper>
                          ) : (
                            <Badge
                              size="sm"
                              type={
                                item.status === "succeeded"
                                  ? "success"
                                  : item.status === "canceled"
                                  ? "ghost"
                                  : item.status === "failed"
                                  ? "danger"
                                  : "info"
                              }
                            >
                              {item.status}
                            </Badge>
                          )}
                        </td>
                        <td>
                          <Card>
                            {item.method.brand && item.method.brand}

                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                            {item.method.last4}
                          </Card>
                        </td>
                        <td>
                          {dayjs(item.date).format("DD MMM YYYY, hh:mm a")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </TableList>
                <PaginationWrapper>
                  <Button
                    btnType="secondary"
                    disabled={page === 0}
                    onClick={() => handlePage("prev")}
                  >
                    Previous
                  </Button>
                  <Button
                    btnType="secondary"
                    disabled={!data.has_more}
                    onClick={() => handlePage("next")}
                  >
                    Next
                  </Button>
                </PaginationWrapper>
              </Fragment>
            ) : (
              Empty
            )}
          </Fragment>
        ) : null}
      </Fragment>
    )
}

export default Payments

const Card = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #777;
    margin-right: 2px;
    &:first-child {
      margin-left: 10px;
    }
    &:last-child {
      margin-right: 5px;
    }
  }
`
const RefundWrapper = styled.div`
  display: block;
  align-items: center;
  .redund-amt {
    display: block;
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }
`
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
