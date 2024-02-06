import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { useState } from 'react'

export const useAccountsController = () => {
  const windowWidth = useWindowWidth()
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })
  return {
    sliderState,
    setSliderState,
    windowWidth
  }
}