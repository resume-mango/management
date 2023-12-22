import dayjs from "dayjs"
import React, { Fragment, useState } from "react"
import styled from "styled-components"
import DownArrowIcon from "../../components/svgs/downArrow"
import WarningIcon from "../../components/svgs/warning"
import { useNotify } from "../../contexts/notify"
import { handleResumeDownload } from "../../helpers/resumeHelper"
import logoIcon from "../../public/logo/logo-icon.svg"
import {
  LoadingDots,
  SK_Heading,
  SK_Text,
  SK_Wrapper,
} from "../../styled/loader"

const ReviewAccordian = ({
  data,
  handleShowResume,
}: {
  data: Record<string, any>
  handleShowResume: (_show: boolean) => void
}) => {
  const [show, setShow] = useState({
    ticket: true,
    customer: true,
    resume: true,
  })

  const [downloading, setDonwloading] = useState(false)

  const { setNotify } = useNotify()

  const downloadResume = async () => {
    if (!data || !data.resume || !data.resume._id) return
    setDonwloading(true)
    await handleResumeDownload(
      data.resume.title || "resume" + data.resume._id,
      data.resume._id,
      "pdf",
      setNotify
    )
    return setDonwloading(false)
  }

  return (
    <AccordianWrapper>
      <div>
        <Accordian show={show.ticket}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, ticket: !show.ticket })}
          >
            <p className="acc_heading">Ticket Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Ticket ID</p>
              <p>{data._id || "-"}</p>
            </div>
            <div className="item">
              <p className="item-label">Status</p>
              <p className="capitalize">{data.status || "-"}</p>
            </div>
          </div>
        </Accordian>
        <Accordian show={show.customer}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, customer: !show.customer })}
          >
            <p className="acc_heading">Customer Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Customer </p>
              <p>
                {(data.user &&
                  data.user.firstName &&
                  (data.user.firstName + " " + data.user.lastName || "")) ||
                  "-"}
              </p>
            </div>
          </div>
        </Accordian>
      </div>
      <div>
        <Accordian show={show.resume}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, resume: !show.resume })}
          >
            <p className="acc_heading">Resume Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Name</p>
              <p>{(data.resume && data.resume.title) || "-"}</p>
            </div>
            <div className="item">
              <p className="item-label">Date Created</p>
              <p>
                {(data.createdAt &&
                  dayjs(data.createdAt).format("DD/MM/YYYY")) ||
                  "-"}
              </p>
            </div>
            <div className="item">
              <p className="item-label">Resume Link</p>
              {downloading ? (
                <LoadingDots color={"rgba(240, 132, 56, 1)"}>
                  Downloading
                </LoadingDots>
              ) : (
                <Fragment>
                  {(data && data.resume && (
                    <Fragment>
                      <p>
                        <a
                          data-test-id="toggle-resume"
                          onClick={() => handleShowResume(true)}
                        >
                          View Resume
                        </a>
                      </p>
                      <p>
                        <a
                          data-test-id="toggle-resume"
                          onClick={() => downloadResume()}
                        >
                          Donwload Resume
                        </a>
                      </p>
                    </Fragment>
                  )) ||
                    "-"}
                </Fragment>
              )}
            </div>
          </div>
        </Accordian>
      </div>
    </AccordianWrapper>
  )
}

const ReviewSidebar = ({
  data,
  isLoading,
  isError,
  handleShowResume,
}: {
  data: Record<string, any>
  isLoading: boolean
  isError: boolean
  handleShowResume: (_show: boolean) => void
}) => {
  return (
    <Fragment>
      <NavWrapper className="hide-scrollbar">
        <NavBrand>
          <LogoWrapper>
            <a href={`${process.env.BASE_HOST}`}>
              <img
                src={logoIcon}
                width="75px"
                style={{ marginRight: "0.3rem" }}
              />
            </a>
            <p>Management Console</p>
          </LogoWrapper>
        </NavBrand>
        <NavLinksWrapper data-test-id="resume-links">
          {isError ? (
            <div className="align-center">
              <WarningIcon size="2rem" />
              <p style={{ marginLeft: "0.5rem" }}>
                Failed to load ticket details!
              </p>
            </div>
          ) : isLoading ? (
            <div style={{ padding: "2.5rem", height: "100%" }}>
              <AccordianWrapper>
                <SK_Wrapper>
                  <SK_Heading className="mb-1" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                  <SK_Text style={{ marginBottom: "1rem" }} />
                  <SK_Heading className="mb-1" />
                  <SK_Text style={{ marginBottom: "5rem" }} />
                </SK_Wrapper>
                <SK_Wrapper>
                  <SK_Heading className="mb-1" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                </SK_Wrapper>
              </AccordianWrapper>
            </div>
          ) : (
            <ReviewAccordian data={data} handleShowResume={handleShowResume} />
          )}
        </NavLinksWrapper>
      </NavWrapper>
    </Fragment>
  )
}

export default ReviewSidebar
const AccordianWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`
const Accordian = styled.div<{ show: boolean }>`
  .item-wrapper,
  .head-wrapper {
    padding: 0 2.5rem;
  }
  .head-wrapper {
    background: rgba(240, 132, 56, 0.05);
    height: 40px;
    color: ${({ theme }) => theme.colors.primary};
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 3px solid ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    cursor: pointer;
    svg {
      transition: all ease-in-out 0.5s;
      transform: ${({ show }) =>
        show ? "rotateZ(360deg)" : "rotateZ(180deg)"};
      path {
        stroke: ${({ theme }) => theme.colors.primary};
        stroke-width: 2;
      }
    }
    p {
      font-size: 0.875rem;
      margin: 0;
      padding: 0;
    }
  }
  .item-wrapper {
    transition: all ease-in-out 0.5s;
    height: 100%;
    max-height: ${({ show }) => (show ? "1000px" : "0px")};
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};

    overflow: hidden;
    p {
      margin: 0.3rem 0;
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
    .item {
      margin-bottom: 1rem;
    }
    .item-label {
      font-size: 0.75rem;
      color: rgba(52, 52, 52, 0.5);
    }
  }
`

const NavWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform ease-in-out 500ms;
  max-width: 260px;
  overflow: auto;
  position: fixed;
  z-index: 2;
`

const LogoWrapper = styled.div`
  text-align: center;
  a {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
  }
`
const NavBrand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 125px;
  min-height: 125px;
  height: 100%;
  width: 100%;
  max-width: 260px;
  background: #0f102a;

  p {
    color: #bababa;
    margin-top: 0;
    font-size: 1rem;
    font-weight: bold;
  }
`
const NavLinksWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 100%;
  flex: 1;
  background: #f7f8fa;
  padding: 2.5rem 0;
`
