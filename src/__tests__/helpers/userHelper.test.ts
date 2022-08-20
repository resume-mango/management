import { handleDeleteSuccess } from '../../helpers/userHelper'

describe('User Helper', () => {
  describe('Handle Delete user mutation on success', () => {
    const user_id = 'abc'

    const queryClient = {
      getQueriesData: jest.fn(),
      setQueryData: jest.fn(),
      removeQueries: jest.fn(),
    }
    const res = {
      data: {
        id: 'abc',
      },
    }
    const navigate = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should fail due to no res.data param', () => {
      handleDeleteSuccess(user_id, 'abc', queryClient as any, navigate)

      expect(queryClient.getQueriesData).not.toBeCalled()

      expect(queryClient.setQueryData).not.toBeCalled()
      expect(queryClient.removeQueries).not.toBeCalled()
    })

    test('should fail due to no res.data param', () => {
      queryClient.getQueriesData.mockReturnValueOnce([
        [
          [['users'], [{ params: 'fake' }]],
          { users: [{ app_metadata_ref: 'abcd' }] },
        ],
      ])

      handleDeleteSuccess(user_id, res, queryClient as any, navigate)

      expect(queryClient.getQueriesData).toBeCalledTimes(1)
      expect(navigate).toBeCalledTimes(1)
      expect(queryClient.setQueryData).not.toBeCalled()
      expect(queryClient.removeQueries).not.toBeCalled()
    })
    test('should fail due to no res.data param', () => {
      queryClient.getQueriesData.mockReturnValueOnce([
        [
          [['users'], [{ params: 'fake' }]],
          { users: [{ app_metadata: { ref: 'abc' } }] },
        ],
      ])

      handleDeleteSuccess(user_id, res, queryClient as any, navigate)

      expect(queryClient.getQueriesData).toBeCalledTimes(1)
      expect(navigate).toBeCalledTimes(1)
      expect(queryClient.setQueryData).toBeCalledTimes(1)
      expect(queryClient.removeQueries).toBeCalledTimes(1)
    })
  })
})
