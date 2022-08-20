import { QueryClient } from 'react-query'
import { NavigateFunction } from 'react-router-dom'
/**
 *
 * @param user_id auth0 provider id for user
 * @param res api response from useMutation
 * @param queryClient from useQueryClient
 * @param navigate from useNavigate
 * @returns void
 */
export const handleDeleteSuccess = (
  user_id: string,
  res: any,
  queryClient: QueryClient,
  navigate: NavigateFunction
) => {
  if (!res.data || !res.data.id) return
  const id = res.data.id
  const data = queryClient.getQueriesData(['users']) as any
  if (data && data.length > 0) {
    const found = data.reduce(
      (acc: any, curr: any) => {
        const users = curr[1].users

        if (!users || users.length === 0) return acc
        const index = users.findIndex(
          (user: any) => user.app_metadata && user.app_metadata.ref === id
        )
        if (index === -1) return acc
        users.splice(index, 1)
        acc = { key: curr[0][1], data: { ...curr[1], users } }
        return acc
      },
      { key: null, data: null }
    )
    console.log(found)
    if (found.key && found.data) {
      queryClient.setQueryData(['users', found.key], found.data)
      queryClient.removeQueries(['user', user_id])
    }
  }
  navigate('/users', { replace: true })
}
