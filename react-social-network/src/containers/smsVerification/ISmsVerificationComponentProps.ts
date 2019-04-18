import { LoginUser } from 'core/domain/authorize'

export interface ISmsVerificationComponentProps {

  /**
   * Logout user
   */
  logout?: () => void

  /**
   * Redirect to home
   */
  home?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

  /**
   * Show global message
   */
  showMessage?: (message: string) => any

  /**
   * Login user
   */
  login?: (user: LoginUser) => any
}
