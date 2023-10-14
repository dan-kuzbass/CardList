import React from 'react'
import { FlatList, View } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import styles from './CardListStyles'
import { useSelector } from 'react-redux'
import { ICardItem, selectCardList } from '../../store/slices/cardSlice'
import CardListItem from './CardListItem';

interface ICardListScreenProps {
  navigation: NavigationProp<ParamListBase>
}

interface ICardItemFromFlatList {
  index: number
  item: ICardItem
}

/**
 * Экран со списком карточек
 * @param {ICardListScreenProps} props
 * @constructor
 */
const CardListScreen = (props: ICardListScreenProps) => {
  const { navigation } = props

  const cardList = useSelector(selectCardList)

  /**
   * Обработчик нажатия на карточку
   */
  const onPressCard = () => {
    navigation.navigate('CardDetail')
  }

  /**
   * Экран со списком карточек
   * @param {ICardItemFromFlatList} param
   * @return {JSX.Element}
   */
  const renderCardItem = ({ item: cardItem, index }: ICardItemFromFlatList) => {
    return (
      <CardListItem key={index} {...cardItem} onPress={onPressCard} />
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={cardList} renderItem={renderCardItem} />
    </View>
  )
}

export default CardListScreen
