import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import CardListScreen from './src/screens/CardList'
import CardDetailScreen from './src/screens/CardDetail'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { appStore, persistedStore } from './src/store/store'

/**
 * точка входа приложения
 * @constructor
 */
const App = (): JSX.Element => {
  const Stack = createStackNavigator()
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="CardListScreen">
            <Stack.Screen
              name="CardList"
              component={CardListScreen}
              options={{ headerTitle: 'Список карточек' }}
            />
            <Stack.Screen
              name="CardDetail"
              component={CardDetailScreen}
              options={{
                headerTitle: 'Информация о карточке',
                headerBackTitle: 'Назад',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
