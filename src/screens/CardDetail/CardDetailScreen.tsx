import React, { useCallback, useEffect, useState } from 'react'
import { AppState, Text, TextInput, View } from 'react-native'
import { debounce } from 'lodash'

import styles from './CardDetailScreenStyles'
import {
  changeCard,
  ICardItem,
  labelType,
  selectCardList,
} from '../../store/slices/cardSlice'
import { useDispatch, useSelector } from 'react-redux'
import useTimeout from '../../utils/useTimeout'
import startTimerLastUpdated from '../../utils/startTimerLastUpdated'

interface ICardDetailProps {
  route?: { params?: { index: number } }
}

const mockCard = {
  label1: '',
  label2: '',
  label3: '',
  label4: '',
  label5: '',
  lastUpdated: Date.now(),
}

/**
 * Экран с детальным просмотром карточки
 * @constructor
 */
const CardDetailScreen = ({ route }: ICardDetailProps) => {
  const cardIndex = route?.params?.index ?? -1
  const cardItem: ICardItem =
    cardIndex !== -1
      ? useSelector(selectCardList)?.[cardIndex] ?? mockCard
      : mockCard

  const lastUpdated = cardItem?.lastUpdated ?? 0

  const dispatch = useDispatch()

  const [label1, setLabel1] = useState(cardItem.label1)
  const [label2, setLabel2] = useState(cardItem.label2)
  const [label3, setLabel3] = useState(cardItem.label3)
  const [label4, setLabel4] = useState(cardItem.label4)
  const [label5, setLabel5] = useState(cardItem.label5)

  const { time, onStart, onClose } = useTimeout()

  useEffect(() => {
    let returnCallback = () => {}
    if (lastUpdated && lastUpdated !== 0) {
      returnCallback = startTimerLastUpdated(lastUpdated, onStart, onClose)
    }
    return returnCallback
  }, [lastUpdated])

  const onChangeLabel = (label: labelType, value: string) => {
    console.log('fdfd label value', label, value)
    dispatch(changeCard({ index: route?.params?.index ?? -1, label, value }))
  }

  const onChangeDebounceTextLabel = useCallback(
    debounce(onChangeLabel, 500),
    [],
  )

  const onChangeTextLabel1 = (value: string) => {
    setLabel1(value)
    onChangeDebounceTextLabel('label1', value)
  }

  const onChangeTextLabel2 = (value: string) => {
    setLabel2(value)
    onChangeDebounceTextLabel('label2', value)
  }

  const onChangeTextLabel3 = (value: string) => {
    setLabel3(value)
    onChangeDebounceTextLabel('label3', value)
  }

  const onChangeTextLabel4 = (value: string) => {
    setLabel4(value)
    onChangeDebounceTextLabel('label4', value)
  }

  const onChangeTextLabel5 = (value: string) => {
    setLabel5(value)
    onChangeDebounceTextLabel('label5', value)
  }

  return (
    <View style={styles.container}>
      <Text>{`Last updated ${time}`}</Text>
      <View style={styles.inputContainer}>
        <Text>Label 1</Text>
        <TextInput
          style={styles.input}
          value={label1}
          onChangeText={onChangeTextLabel1}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 2</Text>
        <TextInput
          style={styles.input}
          value={label2}
          onChangeText={onChangeTextLabel2}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 3</Text>
        <TextInput
          style={styles.input}
          value={label3}
          onChangeText={onChangeTextLabel3}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 4</Text>
        <TextInput
          style={styles.input}
          value={label4}
          onChangeText={onChangeTextLabel4}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 5</Text>
        <TextInput
          style={styles.input}
          value={label5}
          onChangeText={onChangeTextLabel5}
        />
      </View>
    </View>
  )
}

export default CardDetailScreen
