// - Import react components
import React, { Component } from 'react'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// - Import app components
import UserBoxList from 'components/userBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'
import { IHelpProps } from './IHelpProps'
import { IHelpState } from './IHelpState'
import { UserTie } from 'core/domain/circles/userTie'
import { connectHelp } from './connectHelp'
import SearchComponent from '../search'
import classNames from 'classnames'
import { helpStyles } from './helpStyles'
import { withRouter } from 'react-router-dom'

/**
 * Create component class
 */
export class HelpComponent extends Component<IHelpProps, IHelpState> {

  /**
   * Fields
   */

  /**
   * Component constructor
   *
   */
  constructor(props: IHelpProps) {
    super(props)

    // Defaul state
    this.state = {

    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { t, classes } = this.props
    return (
      <div></div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(HelpComponent as any)

export default withRouter<any>(connectHelp(withStyles(helpStyles as any)(translateWrraper as any) as any))
