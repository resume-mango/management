import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Image from '../components/svgs/error.svg'
import { Button } from '../styled/button'
const AccessDenied = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="container">
        <div className="img-wrapper">
          <img src={Image} />
        </div>
        <h2>{title}</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </Wrapper>
  )
}

export default AccessDenied

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    height: fit-content;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h2 {
      margin-bottom: 2rem;
    }
  }
  .img-wrapper {
    margin: auto;
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`
