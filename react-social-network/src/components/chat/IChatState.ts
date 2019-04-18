
export interface IChatState {
  [key: string]: any
  newMessageCount: number
  searchText: string
  messageText: string
  anchorElCurrentUser: any
  anchorElEmoji: any
  leftSideDisabled: boolean
  rightSideDisabled: boolean
  smallSize: boolean
  isMinimized: boolean
  settingDisplyed: boolean
}
