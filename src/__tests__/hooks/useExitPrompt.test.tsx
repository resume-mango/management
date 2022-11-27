import { act, fireEvent, render } from '@testing-library/react'
import { Fragment, ReactNode, useEffect } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import useExitPrompt from '../../hooks/useExitPromt'
const TestingWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <>{children}</>
    </BrowserRouter>
  )
}

describe('Exit prompt hook', () => {
  const Wrapper = () => {
    const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)
    const navigate = useNavigate()

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/abc')
      }, 3000)
      return () => clearTimeout(timer)
    }, [])
    return (
      <Fragment>
        <p>showExitPrompt: {showExitPrompt ? 'true' : 'false'}</p>
        <button onClick={() => setShowExitPrompt(true)}>
          setShowExitPrompt
        </button>
      </Fragment>
    )
  }

  jest.setTimeout(30000)

  test('should promt', async () => {
    let screen: any

    await act(async () => {
      screen = render(
        <TestingWrapper>
          <Wrapper />
        </TestingWrapper>
      )
    })
    const exit = screen.getByText(/showExitPrompt:/i)
    const setExit = screen.getByText('setShowExitPrompt')
    expect(exit.textContent).toBe('showExitPrompt: false')

    fireEvent.click(setExit)

    expect(exit.textContent).toBe('showExitPrompt: true')

    expect(1).toBe(1)
  })
})
