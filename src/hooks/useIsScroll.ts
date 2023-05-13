import { useEffect, useState } from 'react'

const useIsScroll = () => {
  const [isScroll, setIsScroll] = useState(false)
  useEffect(() => {
    function pageScrollListener() {
      const offset = document.documentElement.scrollTop
      if (offset === 0) setIsScroll(false)
      else setIsScroll(true)
    }
    window.addEventListener('scroll', pageScrollListener)
    return () => window.removeEventListener('scroll', pageScrollListener)
  }, [])

  return { isScroll }
}

export default useIsScroll
