// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from 'src/config'
import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material UI
import { grey } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'
import EventListener, { withOptions } from 'react-event-listener'
import { Parallax, Background } from 'react-parallax'

// - Import app components
import ImgCover from 'components/imgCover'
import EditProfile from 'components/editProfile'
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as userActions from 'store/actions/userActions'
import { IProfileHeaderComponentProps } from './IProfileHeaderComponentProps'
import { IProfileHeaderComponentState } from './IProfileHeaderComponentState'

/**
 * Create component class
 */
export class ProfileHeaderComponent extends Component<IProfileHeaderComponentProps, IProfileHeaderComponentState> {

    /**
     * Component constructor
     *
     */
  constructor (props: IProfileHeaderComponentProps) {
    super(props)

        /**
         * Defaul state
         */
    this.state = {
            /**
             * If it's true , the window is in small size
             */
      isSmall: false

    }

        // Binding functions to `this`

  }
    /**
     * Handle resize event for window to change sidebar status
     * @param  {event} evt is the event is passed by winodw resize event
     */
  handleResize = () => {

        // Set initial state
    let width = window.innerWidth

    if (width > 900) {
      this.setState({
        isSmall: false
      })

    } else {
      this.setState({
        isSmall: true
      })
    }
  }

  componentDidMount () {
    this.handleResize()
  }

    /**
     * Reneder component DOM
     * 
     */
  render () {
    const {t, isAuthedUser, editProfileOpen} = this.props
    const styles = {
      avatar: {
        border: '2px solid rgb(255, 255, 255)'
      },
      iconButton: {
        fill: 'rgb(255, 255, 255)',
        height: '24px',
        width: '24px'

      },
      iconButtonSmall: {
        fill: 'rgb(0, 0, 0)',
        height: '24px',
        width: '24px'
      },

      editButton: {

        marginLeft: '20px'

      },
      editButtonSmall: {

        marginLeft: '20px',
        color: 'white',
        fill: 'blue'

      },
      aboutButton: {
        color: 'white'
      },
      aboutButtonSmall: {
        color: 'black'
      }
    }

    const iconButtonElement = (
            <IconButton style={this.state.isSmall ? styles.iconButtonSmall : styles.iconButton}>
                <MoreVertIcon style={{...(this.state.isSmall ? styles.iconButtonSmall : styles.iconButton), color: grey[400]}} viewBox='10 0 24 24' />
            </IconButton>
        )

    const RightIconMenu = () => (
      <div>
           {iconButtonElement}
                <MenuItem style={{ fontSize: '14px' }}>Reply</MenuItem>
                <MenuItem style={{ fontSize: '14px' }}>Edit</MenuItem>
                <MenuItem style={{ fontSize: '14px' }}>Delete</MenuItem>
      </div>
        )

    return (

            <div>
                <Parallax strength={500} className='profile__parallax' bgStyle={{ position: 'relative' }}>
                    <Background>
                        <ImgCover width='100%' height='510px' borderRadius='2px'
                        src={this.props.banner || config.settings.defaultProfileCover} />
                    </Background>

                </Parallax>
                <div className={this.state.isSmall ? 'profile__head-info-s' : 'profile__head-info'}>
                    <EventListener
                        target='window'
                        onResize={this.handleResize}
                    />
                    <div className='left'>
                        {/* User avatar*/}
                        <div style={{ display: 'flex', justifyContent: 'center' }}><UserAvatar fullName={this.props.fullName || ' '} fileName={this.props.avatar} size={60} style={styles.avatar} /></div>
                        <div className='info'>
                            <div className='fullName'>
                                {this.props.fullName}
                            </div>
                            <div className='tagLine'>
                               {this.props.tagLine}
                            </div>
                            {/*<div className='followers'>
                                {this.props.followerCount} Followers
                </div>*/}
                        </div>
                    </div>
                    <div className='right'>
                        {isAuthedUser ? (<div style={this.state.isSmall ? styles.editButtonSmall : styles.editButton}>
                        <Button variant='contained' onClick={this.props.openEditor}>
                        {t!('profile.editProfileButton')}
                        </Button>
                        </div>) : ''}
                    </div>
                </div>
                {isAuthedUser && editProfileOpen ? (<EditProfile
                    avatar={this.props.avatar}
                    banner={this.props.banner}
                    fullName={this.props.fullName}
                />) : ''}
            </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IProfileHeaderComponentProps) => {
  return {
    openEditor: () => dispatch(userActions.openEditProfile())
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileHeaderComponentProps) => {

  return {
    
    editProfileOpen: state.getIn(['user', 'openEditProfile'])
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ProfileHeaderComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(translateWrraper as any)
