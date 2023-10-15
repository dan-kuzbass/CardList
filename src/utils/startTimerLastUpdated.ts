import { AppState } from 'react-native'

const startTimerLastUpdated = (
  lastUpdated: number,
  onStart: (countSeconds: number, isUp?: boolean) => void,
  onClose: () => void,
) => {
  onStart(Math.floor((Date.now() - lastUpdated) / 1000), true)
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      onClose()
      onStart(Math.floor((Date.now() - lastUpdated) / 1000), true)
    }
  })
  return () => {
    onClose()
    subscription.remove()
  }
}

export default startTimerLastUpdated
