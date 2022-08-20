import styled from 'styled-components'

export const Badge = styled.span<{
  type: 'success' | 'ghost' | 'info' | 'primary' | 'danger'
  size: 'sm' | 'md' | 'lg'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.8;
  padding: ${({ size }) =>
    size === 'lg'
      ? '0.3rem 1.2rem'
      : size === 'md'
      ? '0.2rem 1rem'
      : '0.2rem 0.7rem'};
  height: fit-content;
  background-color: ${({ type, theme }) =>
    type === 'success'
      ? 'rgb(67 196 66 / 30%)'
      : type === 'ghost'
      ? '#eee'
      : type === 'primary'
      ? theme.shades.primary[3]
      : type === 'danger'
      ? theme.shades.danger
      : theme.shades.info};
  color: ${({ theme }) => theme.shades.dark[1]};
  text-transform: capitalize;
  font-size: ${({ size }) =>
    size === 'lg' ? '1rem' : size === 'md' ? '0.875rem' : '0.75rem'};
  border-radius: 4px;

  width: fit-content;
  @media (max-width: 1300px) {
    font-size: ${({ size }) =>
      size === 'lg' ? '.875rem' : size === 'md' ? '0.8rem' : '0.7rem'};
  }
`
