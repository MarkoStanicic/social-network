// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from 'src/config'

import classNames from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import { Map } from 'immutable'
import { translate, Trans } from 'react-i18next'

/**
 * Material-UI
 */
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import RaisedButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import CardActions from '@material-ui/core/CardActions'
import Switch from '@material-ui/core/Switch'
import WifiIcon from '@material-ui/icons/Wifi'
import BluetoothIcon from '@material-ui/icons/Bluetooth'

// - Components
import Footer from 'layouts/footer'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as userSettingActions from 'src/store/actions/userSettingActions'

import { INotificationSettingProps } from './INotificationSettingProps'
import { INotificationSettingState } from './INotificationSettingState'
import { notificationSettingStyles } from 'containers/notificationSetting/notificationSettingStyles'
import { UserSettingType } from 'core/services/users/userSettingType'

/**
 * Create component class
 */
export class NotificationSettingComponent extends Component<INotificationSettingProps, INotificationSettingState> {

  static getDerivedStateFromProps(props: INotificationSettingProps, state: INotificationSettingState) {
    if (!state.initialiazed && props.userSetting!.count() > 0) {
      return {
        initialiazed: true,
        checked: props.userSetting
      }
    }

    // Return null to indicate no change to state.
    return null
  }

  /**
   * Component constructor
   */
  constructor(props: INotificationSettingProps) {
    super(props)

    this.state = {
      checked:  Map([]),
      initialiazed: false
    }
    // Binding function to `this`
    this.handleSaveChanges = this.handleSaveChanges.bind(this)
  }

  /**
   * Handle check toggle
   */
  handleToggle = (value: any) => () => {
    let { checked } = this.state
    const isChecked = checked.get(value, false)
    if (isChecked) {
     checked = checked.set(value, false)
    } else {
     checked = checked.set(value, true)
    }

    this.setState({
      checked: checked,
    })
  }

  /**
   * Handle save changes
   */
  handleSaveChanges(event: any) {

    const {checked} = this.state
    const {updateUserSetting} = this.props

    updateUserSetting!(checked.toJS())
  }

  /**
   * Reneder component DOM
   */
  render() {

    const { classes, t } = this.props
    const {checked} = this.state

    return (
      <Grid container spacing={24} className={classes.notification}>
        <Grid item sm={12} xs={12} md={3} lg={4} xl={4} className={classes.headerCaption}>
          <Typography variant='h6' > {t!('config.notificationLabel')} </Typography>

          <Typography variant='caption' > {t!('config.notificationCaption')} </Typography>
        </Grid>
        <Grid item sm={12} xs={12} md={9} lg={8} xl={8}>

          <div className='animate-bottom'>
            <Paper className={classes.root}>
              <List subheader={<ListSubheader>{t!('config.notificationLabel')}</ListSubheader>}>
                <ListItem>
                  <ListItemText primary={t!('config.notification.emailOnVote')} />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={this.handleToggle(UserSettingType.Notification_EmailOnVoteEnable)}
                      checked={checked.get(UserSettingType.Notification_EmailOnVoteEnable, false)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary={t!('config.notification.emailOnFollow')} />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={this.handleToggle(UserSettingType.Notification_EmailOnFollowEnable)}
                      checked={checked.get(UserSettingType.Notification_EmailOnFollowEnable, false)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary={t!('config.notification.emailOnComment')} />
                  <ListItemSecondaryAction>
                    <Switch
                      onChange={this.handleToggle(UserSettingType.Notification_EmailOnCommentEnable)}
                      checked={checked.get(UserSettingType.Notification_EmailOnCommentEnable, false)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <CardActions>
              <Button color='primary' onClick={this.handleSaveChanges}>{t!('config.saveChangesButton')} </Button>
              </CardActions>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: INotificationSettingProps) => {
  return {
    updateUserSetting: (setting: object) => dispatch(userSettingActions.dbUpdateUserSetting(setting))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: INotificationSettingProps) => {
  return {
    
  }
}

// - Connect component to redux storea
const translateWrraper = translate('translations')(NotificationSettingComponent as any)
export default withRouter<any>(connect<any>(mapStateToProps as any, mapDispatchToProps)(withStyles(notificationSettingStyles as any)(translateWrraper as any)))
