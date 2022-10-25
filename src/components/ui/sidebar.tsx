import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logoIcon from '../../public/logo/resume-mango-logo.png'
import BlogIcon from '../svgs/blogs'
import BoxIcon from '../svgs/boxIcon'
import DashboardIcon from '../svgs/Dashboard'
import LogoutIcon from '../svgs/logoutIcon'
import CreditCardIcon from '../svgs/creditCard'
import UserIcon from '../svgs/userIcon'
import UsersIcon from '../svgs/usersIcon'
import DiamondIcon from '../svgs/diamond'
import { useAuth } from '../../contexts/authProvider'

const Sidebar = () => {
  return (
    <Fragment>
      <NavWrapper className="hide-scrollbar">
        <NavBrand>
          <LogoWrapper>
            <a href={`${process.env.BASE_HOST}`}>
              <img
                src={logoIcon}
                width="75px"
                style={{ marginRight: '0.3rem' }}
              />
              {/* <img src={logoText} width="150px" /> */}
            </a>
            <p>Management Console</p>
          </LogoWrapper>
        </NavBrand>
        <Navlinks />
      </NavWrapper>
    </Fragment>
  )
}

const Navlinks = () => {
  const { user } = useAuth()
  const handleLogout = () => {
    window.location.href = `${process.env.AUTH_HOST}/auth/logout`
  }

  return (
    <NavLinksWrapper>
      <div>
        <h6>MENU</h6>
        <ul>
          {user.role && user.role.length > 0 ? (
            <Fragment>
              {user.role.includes('admin') ? (
                <Fragment>
                  <li>
                    <NavLink to="/">
                      <DashboardIcon size="1.1rem" /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users">
                      <UsersIcon size="1.3rem" />
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/plans">
                      <BoxIcon size="1.3rem" />
                      Plans
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blogs">
                      <BlogIcon size="1.3rem" />
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/subscriptions">
                      <DiamondIcon size="1.25rem" />
                      Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/payments">
                      <CreditCardIcon size="1.25rem" />
                      Payments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/resume-review">
                      <CreditCardIcon size="1.25rem" />
                      Resume Review
                    </NavLink>
                  </li>
                </Fragment>
              ) : user.role.includes('reviewer') ? (
                <li>
                  <NavLink to="/resume-review">
                    <CreditCardIcon size="1.25rem" />
                    Resume Review
                  </NavLink>
                </li>
              ) : null}
            </Fragment>
          ) : null}
        </ul>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <h6>YOUR ACCOUNT</h6>
        <ul>
          <li>
            <a href={`${process.env.APP_HOST}/my-account`}>
              <UserIcon size="1rem" /> My account
            </a>
          </li>
          <li>
            <a onClick={() => handleLogout()}>
              <LogoutIcon size="1.1rem" /> Logout
            </a>
          </li>
        </ul>
      </div>
    </NavLinksWrapper>
  )
}

export default Sidebar
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
const NavLinksWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background: #f7f8fa;
  padding: 2.5rem 0;

  h6 {
    font-size: 12px;
    color: #b4b4b4;
    padding: 0 1.5rem;
  }
  ul {
    li {
      a {
        display: flex;
        align-items: center;
        transition: all ease-in-out 300ms;
        padding: 0.875rem 1.5rem;
        &.active {
          color: #f08438;
          background: rgba(240, 132, 56, 0.05);
          border-right: 4px solid #f08438;
          svg {
            path {
              fill: #f08438;
            }
          }
          .stroke-icon {
            path {
              stroke: #f08438;
            }
          }
        }

        svg {
          margin-right: 1.1rem;
          path {
            transition: all ease-in-out 300ms;
          }
        }
      }
      &:hover {
        a {
          color: #f08438;
        }
        svg {
          path {
            fill: #f08438;
          }
        }
        .stroke-icon {
          path {
            stroke: #f08438;
          }
        }
      }
    }
  }
  @media (max-height: 700px) {
    height: auto;
  }
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
