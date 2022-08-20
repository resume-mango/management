import styled from 'styled-components'
import EmptyIcon from '../svgs/empty'

interface IProps {
  title: string
  description?: string
  handleClick?: () => void
  btnName?: string
}

const EmptyPage = ({ title, description, handleClick, btnName }: IProps) => {
  return (
    <Wrapper>
      <div className="container">
        <span className="icon">
          <EmptyIcon />
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        {handleClick && btnName && <a onClick={handleClick}>{btnName}</a>}
      </div>
    </Wrapper>
  )
}

export default EmptyPage

const Wrapper = styled.div<{ left?: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  .container {
    display: block;
    height: 100%;
    width: 250px;
    text-align: center;
    margin-bottom: 5rem;
    margin-right: 2rem;
  }
  .icon {
    display: block;
    margin-right: 2rem;
  }
  a {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    width: fit-content;
    display: inline-block;
    :after {
      display: block;
      content: '';
      border-bottom: solid 2px ${({ theme }) => theme.colors.primary};
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }
  }
  p {
    margin-top: 0;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
`
