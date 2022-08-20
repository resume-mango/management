import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import Sidebar from './sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Sidebar />
      <div>
        <Content id="main-section">{children}</Content>
      </div>
    </Fragment>
  )
}

export default DashboardLayout

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 260px;
  min-height: 100vh;
  overflow-x: hidden;
`
