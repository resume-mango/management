import styled from 'styled-components'

export const GridForm = styled.div<{ columns?: string; SMcolumns?: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns ? columns : 'repeat(2, 1fr)'};
  grid-gap: 1.5rem;
  margin: 1.5rem 0;
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: ${({ columns }) =>
      columns ? columns : 'repeat(1, 1fr)'};
  }
`
export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;
`
export const FormButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const InvalidFeedBack = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.danger};
`

export const StyledCheckBox = styled.label<{ size: 'sm' | 'lg' | 'xl' }>`
  display: inline-block;
  position: relative;
  margin-bottom: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  width: ${({ size }) =>
    size === 'xl' ? '32px' : size === 'lg' ? '25px' : '18px'};
  height: ${({ size }) =>
    size === 'xl' ? '32px' : size === 'lg' ? '25px' : '18px'};
  margin: 0;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkmark {
      background-color: ${({ theme }) => theme.colors.primary};
      &:after {
        display: flex;
      }
    }
  }
  .checkmark {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ size }) =>
      size === 'xl' ? '32px' : size === 'lg' ? '25px' : '18px'};
    width: ${({ size }) =>
      size === 'xl' ? '32px' : size === 'lg' ? '25px' : '18px'};
    background-color: #eee;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0.2rem;
    &:after {
      display: none;
      content: '';
      width: ${({ size }) =>
        size === 'xl' ? '9px' : size === 'lg' ? '7px' : '5px'};
      height: ${({ size }) =>
        size === 'xl' ? '16px' : size === 'lg' ? '13px' : '10px'};
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  &:hover {
    .checkmark {
      background-color: ${({ theme }) => theme.shades.primary[4]};
      &:after {
        display: flex;
      }
    }
  }
`
