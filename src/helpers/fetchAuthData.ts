import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import Cookies from "universal-cookie"

/**
 * Fetches user auth data
 * @param location url where user to be redirected if not authenticated
 * @param navigate from useNavigate
 * @param setUser form useAuth()
 * @param setToken from useAuth()
 * @param setIsLoading from useAuth()
 * @returns boolean
 */
export const fetchAuthData = async (
  location: string,
  navigate: NavigateFunction,
  setUser: (_val: any) => void,
  setToken: (_val: string) => void,
  setIsLoading: (_val: boolean) => void
) => {
  const cookies = new Cookies()
  return await axios
    .get(`${process.env.AUTH_HOST}/data`)
    .then((res: any) => {
      if (!res || !res.data) throw new Error("Failed")

      if (!["admin", "reviewer"].some((r) => res.data.user.role.includes(r))) {
        navigate("/access-denied", { replace: true })
        return false
      }
      if (res.data.token) {
        axios.defaults.headers.common["Authorization"] = res.data.token
      }
      setUser(res.data.user)
      setToken(res.data.token)
      return true
    })
    .catch((err) => {
      console.log(err.message === "Failed")
      if (
        (err.response && err.response.status && err.response.status === 401) ||
        err.message === "Failed"
      ) {
        cookies.remove("rm_ia", {
          path: "/",
          domain: process.env.COOKIE_DOMAIN,
        })
        window.location.href = location
      }
      return false
    })
    .finally(() => setIsLoading(false))
}
