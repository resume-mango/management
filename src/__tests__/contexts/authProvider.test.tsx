import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import axios from 'axios'
import { Fragment } from 'react'
import Cookies from 'universal-cookie'
import { AuthProvider, useAuth } from '../../contexts/authProvider'
import * as windowContext from '../../contexts/windowFocus'
import * as authHelper from '../../helpers/fetchAuthData'
// eslint-disable-next-line jest/no-mocks-import
import TestingWrapper from '../../__mocks__/TestingWrapper'

describe('Auth Provider Context', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const axiosGetSpy = jest.spyOn(mockedAxios, 'get')
  const fetchAuthDataSpy = jest.spyOn(authHelper, 'fetchAuthData')
  const useWindowFocusSpy = jest.spyOn(windowContext, 'useWindowFocus')
  const cookies = new Cookies()

  jest.setTimeout(10000)

  const Wrapper = () => {
    const { token, user, setUser, isLoading } = useAuth()
    return (
      <Fragment>
        {isLoading ? (
          'Loading'
        ) : (
          <Fragment>
            <p>Token: {token}</p>
            <p>
              User: {user.firstName}
              {user.lastName}
            </p>
            <button
              onClick={() =>
                setUser({ firstName: 'Jack', lastName: 'Reacher' })
              }
            >
              Set User
            </button>
          </Fragment>
        )}
      </Fragment>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    const mockedUsedNavigate = jest.fn()

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
    }))
    useWindowFocusSpy.mockReturnValue({ windowIsActive: true })
  })

  test('Should render loading screen', () => {
    const { getByText } = render(
      <TestingWrapper>
        <windowContext.WindowFocusContextProvider>
          <AuthProvider>
            <Wrapper />
          </AuthProvider>
        </windowContext.WindowFocusContextProvider>
      </TestingWrapper>
    )
    expect(getByText('Loading')).toBeInTheDocument()
  })

  test('Should successfully render', async () => {
    axiosGetSpy.mockResolvedValue({
      data: {
        token: 'abc',
        user: {
          role: ['admin'],
          firstName: 'jhon',
          lastName: 'doe',
        },
      },
    })
    let screen: any

    await act(async () => {
      cookies.set('rm_ia', 'true')

      screen = render(
        <TestingWrapper>
          <windowContext.WindowFocusContextProvider>
            <AuthProvider>
              <Wrapper />
            </AuthProvider>
          </windowContext.WindowFocusContextProvider>
        </TestingWrapper>
      ) as RenderResult
    })
    await waitFor(async () => {
      expect(fetchAuthDataSpy).toBeCalledTimes(1)
    })

    const token = screen.getByText(/Token:/i) as HTMLElement
    const user = screen.getByText(/User:/i) as HTMLElement

    expect(token.textContent).toEqual('Token: abc')
    expect(user.textContent).toEqual('User: jhondoe')

    const setUser = screen.getByText('Set User')
    fireEvent.click(setUser)
    expect(token.textContent).toEqual('Token: abc')
    expect(user.textContent).toEqual('User: JackReacher')
  })
})
