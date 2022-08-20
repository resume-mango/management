import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

interface ICheckBox {
  name: string
  type?: 'switch'
  className?: string
  customSize?: 'sm' | 'lg' | 'xl'
}
const CheckBox: React.FC<
  ICheckBox &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ name, customSize, type, className, ...props }) => {
  const { register } = useFormContext()

  switch (type) {
    case 'switch':
      return (
        <Switch className={className} size={customSize as any}>
          <input type="checkbox" {...register(name)} {...props}></input>

          <span className="slider" />
        </Switch>
      )

    default:
      return (
        <RoundCheckBox className={className} size={customSize as any}>
          <input type="checkbox" {...register(name)} {...props}></input>
          <span className="checkmark"></span>
        </RoundCheckBox>
      )
  }
}

export default CheckBox

const RoundCheckBox = styled.label<{ size: 'sm' | 'lg' | 'xl' }>`
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

const Switch = styled.label<{ size: 'sm' | 'lg' | 'xl' }>`
  position: relative;
  display: inline-block;
  width: ${({ size }) =>
    size === 'xl' ? '75px' : size === 'lg' ? '60px' : '40px'};
  height: ${({ size }) =>
    size === 'xl' ? '32px' : size === 'lg' ? '28px' : '20px'};
  margin: 0;
  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider:before {
      transform: ${({ size }) =>
        size === 'xl'
          ? 'translateX(40px)'
          : size === 'lg'
          ? 'translateX(30px)'
          : 'translateX(18px)'};
      background-color: rgba(255, 168, 20, 1);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e7e7e7;
    transition: 0.4s;
    border-radius: 34px;

    &::before {
      position: absolute;
      content: '';
      height: ${({ size }) =>
        size === 'xl' ? '28px' : size === 'lg' ? '24px' : '16px'};
      width: ${({ size }) =>
        size === 'xl' ? '28px' : size === 'lg' ? '24px' : '16px'};
      left: 3px;
      bottom: 2px;
      background-color: #b0b0b0;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`
