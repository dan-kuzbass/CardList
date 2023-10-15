import { StyleSheet } from 'react-native'
import { RNStyleType } from '../../configurations/types'

interface ICardListStyle {
  container: RNStyleType
  cardContainer: RNStyleType
  labelRow: RNStyleType
  fetchMoreLoader: RNStyleType
  opacity: RNStyleType
}

const styles: ICardListStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 4,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center' },
  fetchMoreLoader: { marginTop: 16 },
  opacity: { opacity: 0.4 },
})

export default styles
