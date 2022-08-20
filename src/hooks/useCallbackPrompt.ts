import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useBlocker from './useBlocker'

const useCallbackPrompt = (when: boolean, setWhen: (_val: boolean) => void) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPrompt, setShowPrompt] = useState(false)
  const [lastLocation, setLastLocation] = useState<any>(null)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)
  const cancelNavigation = useCallback(() => {
    setShowPrompt(false)
  }, [])

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: any) => {
      // in if condition we are checking next location and current location are equals or not
      if (
        !confirmedNavigation &&
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true)
        setLastLocation(nextLocation)
        return false
      }
      return true
    },
    [confirmedNavigation, location]
  )

  const confirmNavigation = useCallback(() => {
    setWhen(false)
    setShowPrompt(false)
    setConfirmedNavigation(true)
  }, [])

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname)

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false)
    }
  }, [confirmedNavigation, lastLocation])

  useBlocker(handleBlockedNavigation, when)

  return { showPrompt, confirmNavigation, cancelNavigation }
}

export default useCallbackPrompt
