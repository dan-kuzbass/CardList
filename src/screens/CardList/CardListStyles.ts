import { StyleSheet } from 'react-native'
import { RNStyleType } from '../../configurations/types'

interface ICardListStyle {
  container: RNStyleType
  cardContainer: RNStyleType
  labelRow: RNStyleType
  opacity: RNStyleType
}

const styles: ICardListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  cardContainer: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 8 },
  labelRow: {flexDirection: 'row', alignItems: 'center'},
  opacity: {opacity: 0.4},
})

export default styles
