import { useRef, useState } from 'react'

/**
 * @description хук таймера обраратного отсчета
 * @return { Object }
 */
const useTimeout = () => {
  const [time, setTime] = useState(0)

  const intervalRef = useRef<NodeJS.Timer>()

  /**
   * @description понижение времени
   */
  const downTime = () => {
    setTime((prev) => {
      if (prev - 1 === 0) {
        onClose()
        return 0
      }
      return prev - 1
    })
  }

  /**
   * @description понижение времени
   */
  const upTime = () => {
    setTime((prev) => prev + 1)
  }

  /**
   * @description запуск таймера
   * @param {number} countSeconds количество секунд
   * @param {boolean} isUp
   */
  const onStart = (countSeconds: number, isUp?: boolean) => {
    setTime(countSeconds)
    intervalRef.current = setInterval(() => {
      isUp ? upTime() : downTime()
    }, 1000)
  }

  /**
   * @description остановка таймера
   */
  const onClose = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    intervalRef.current && clearInterval(intervalRef.current)
  }

  /**
   * @description установить начальное время, но не запускать таймер
   * @param {number} initialTime
   */
  const setInitialTime = (initialTime: number) => {
    setTime(initialTime)
  }

  return { time, onStart, onClose, setInitialTime }
}

export default useTimeout
