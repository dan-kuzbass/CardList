import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native'

interface ICardListScreenProps {
  navigation: NavigationProp<ParamListBase>
}

/**
 * Экран со списком карточек
 * @param {ICardListScreenProps} props
 * @constructor
 */
const CardListScreen = (props: ICardListScreenProps) => {
  const { navigation } = props
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        style={{ borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 8 }}
        onPress={() => {
          navigation.navigate('CardDetail')
        }}
      >
        <Text>{`Label 1: `}</Text>
        <Text>{`Label 2: `}</Text>
        <Text>{`Label 3: `}</Text>
        <Text>{`Label 4: `}</Text>
        <Text>{`Label 5: `}</Text>
        <Text>{`Last update: 0`}</Text>
      </Pressable>
    </View>
  )
}

export default CardListScreen
