import { useState, useEffect } from 'react'
import { onbeforeunloadEvent } from '../helpers/onbeforeunloadEvent'

export default function useExitPrompt(bool: boolean) {
  const [showExitPrompt, setShowExitPrompt] = useState(bool)

  const initBeforeUnLoad = (showExitPrompt: boolean) => {
    Object.defineProperty(window, 'onbeforeunload', (event: any) =>
      onbeforeunloadEvent(event, showExitPrompt)
    )
  }

  Object.defineProperty(window, 'onload', () => {
    initBeforeUnLoad(showExitPrompt)
  })

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt)
  }, [showExitPrompt])

  return { showExitPrompt, setShowExitPrompt }
}
