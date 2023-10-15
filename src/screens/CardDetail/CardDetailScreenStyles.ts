import { StyleSheet } from 'react-native'
import { RNStyleType } from '../../configurations/types'

interface ICardListStyle {
  container: RNStyleType
  inputContainer: RNStyleType
  input: RNStyleType
}

const styles: ICardListStyle = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 16 },
  inputContainer: { marginVertical: 16 },
  input: { borderWidth: 1, marginTop: 8, height: 60 },
})

export default styles
