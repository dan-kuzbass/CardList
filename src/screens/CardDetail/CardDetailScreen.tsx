import React, { useCallback } from 'react'
import { Text, TextInput, View } from 'react-native'
import { debounce } from 'lodash'

import styles from './CardDetailScreenStyles'

/**
 * Экран с детальным просмотром карточки
 * @constructor
 */
const CardDetailScreen = () => {
  const onChangeLabel1 = (value: string) => {
    console.log('fdfd value', value)
  }

  return (
    <View style={styles.container}>
      <Text>{`Last updated ${0}`}</Text>
      <View style={styles.inputContainer}>
        <Text>Label 1</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCallback(debounce(onChangeLabel1, 500), [])}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 2</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCallback(debounce(onChangeLabel1, 500), [])}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 3</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCallback(debounce(onChangeLabel1, 500), [])}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 4</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCallback(debounce(onChangeLabel1, 500), [])}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Label 5</Text>
        <TextInput
          style={styles.input}
          onChangeText={useCallback(debounce(onChangeLabel1, 500), [])}
        />
      </View>
    </View>
  )
}

export default CardDetailScreen
