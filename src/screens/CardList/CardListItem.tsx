import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';
import styles from './CardListStyles';
import { ICardItem } from '../../store/slices/cardSlice';

interface ICardListItem extends ICardItem {
  onPress: () => void
}

/**
 * Компонент карточки
 * @param {ICardListItem} props
 * @constructor
 */
const CardListItem = ({onPress, label1, label2, label3, label4, label5, lastUpdated}: ICardListItem) => {
  return <Pressable
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
    <Text>{`Last update: ${lastUpdated}`}</Text>
  </Pressable>
}

export default CardListItem