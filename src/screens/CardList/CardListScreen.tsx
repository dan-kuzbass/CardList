import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import styles from './CardListScreenStyles'
import {
  fetchCardList, fetchMoreCardList,
  ICardItem,
  selectCardList,
  selectIsFetchingCardList,
  selectIsLoadingCardList
} from "../../store/slices/cardSlice";
import CardListItem from './CardListItem'

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

  const dispatch = useDispatch()
  const insets = useSafeAreaInsets()

  const cardList = useSelector(selectCardList)
  const isLoadingCardList = useSelector(selectIsLoadingCardList)
  const isFetchingCardList = useSelector(selectIsFetchingCardList)

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
    return <CardListItem key={index} {...cardItem} onPress={onPressCard} />
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchCardList())
  }

  return (
    <View style={styles.container}>
      {isLoadingCardList && !cardList?.length ? (
        <Text style={{ alignSelf: 'center' }}>Загрузка списка...</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
          data={cardList}
          renderItem={renderCardItem}
          refreshControl={
            onRefresh && (
              <RefreshControl
                title={'Загрузка данных...'}
                onRefresh={onRefresh}
                refreshing={!!isLoadingCardList}
              />
            )
          }
          onEndReached={() => {
            if (!isFetchingCardList) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              dispatch(fetchMoreCardList())
            }
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={() => {
            if (isFetchingCardList) {
              return (
                <ActivityIndicator size="large" style={{ marginTop: 16 }} />
              )
            }
            return <></>
          }}
        />
      )}
    </View>
  )
}

export default CardListScreen
