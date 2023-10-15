export type labelType = 'label1' | 'label2' | 'label3' | 'label4' | 'label5'

export type ICardItem = {
  [key in labelType]: string
} & {
  lastUpdated: number
}

export interface CardState {
  cardList?: Array<ICardItem>
  isLoading?: boolean
  isFetching?: boolean
}

export interface IFetchCardListResponse {
  data: Array<ICardItem>
}

export interface IChangeCardPayload {
  index: number
  label: labelType
  value: string
}
