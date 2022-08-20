import axios from 'axios'
import { apiGetPlanReferenceData } from '../../apis/plans'

describe('Api gets plan refrence data', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const requestSpy = jest.spyOn(mockedAxios, 'request')

  const reqData = { stripePrice: 'abc', id: 'efg' }

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('Fails to get refrence data', async () => {
    requestSpy.mockRejectedValue('Failed')
    const result = await apiGetPlanReferenceData(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data: '', error: 'Failed' })
  })

  test('Gets refrence data', async () => {
    requestSpy.mockResolvedValue({ data: 'abc', error: undefined })
    const result = await apiGetPlanReferenceData(reqData)
    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data: 'abc', error: '' })
  })
})
