import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import styles from './CardListScreenStyles'
import { ICardItem } from '../../store/slices/cardSlice'
import useTimeout from '../../hooks/useTimeout'
import startTimerLastUpdated from '../../utils/startTimerLastUpdated'

interface ICardListItem extends ICardItem {
  onPress: () => void
}

/**
 * Компонент карточки
 * @param {ICardListItem} props
 * @constructor
 */
const CardListItem = ({
  onPress,
  label1,
  label2,
  label3,
  label4,
  label5,
  lastUpdated,
}: ICardListItem) => {
  const { time, onStart, onClose } = useTimeout()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let returnCallback = () => {}
    if (lastUpdated && lastUpdated !== 0) {
      returnCallback = startTimerLastUpdated(lastUpdated, onStart, onClose)
    }
    return returnCallback
  }, [lastUpdated])

  return (
    <Pressable
      style={({ pressed }) =>
        StyleSheet.flatten([styles.cardContainer, pressed && styles.opacity])
      }
      onPress={onPress}
    >
      <Text>{`Label 1: ${label1}`}</Text>
      <Text>{`Label 2: ${label2}`}</Text>
      <Text>{`Label 3: ${label3}`}</Text>
      <Text>{`Label 4: ${label4}`}</Text>
      <Text>{`Label 5: ${label5}`}</Text>
      <Text>{`Last update: ${time}`}</Text>
    </Pressable>
  )
}

export default CardListItem
