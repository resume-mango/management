import React, { useEffect, useRef } from 'react'

const detectMultiOusideClick = (
  setShow: (val: number | null) => void,
  ignoreClass: string
) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref || !ref.current) return
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [ref.current])

  const handleClickOutside = (e: any) => {
    if (!ref || !ref.current) return
    const element = ref.current.getElementsByClassName('isVisible')[0]

    if (!element || (ignoreClass && e.target.classList.contains(ignoreClass)))
      return
    if (!element.contains(e.target)) {
      if (setShow === null) return
      setShow(null)
    }
  }

  return { ref }
}

export default detectMultiOusideClick
