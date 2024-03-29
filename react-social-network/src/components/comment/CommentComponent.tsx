// - Import react components
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import Linkify from 'react-linkify'
import Popover from '@material-ui/core/Popover'

import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

import { Comment } from 'core/domain/comments'

// - Import material UI libraries
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardHeader, CardMedia, CardContent } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import classNames from 'classnames'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as commentActions from 'store/actions/commentActions'
import * as userActions from 'store/actions/userActions'

import { ICommentComponentProps } from './ICommentComponentProps'
import { ICommentComponentState } from './ICommentComponentState'
import { userSelector } from 'store/reducers/users/userSelector'

const styles = (theme: any) => ({
  textField: {
    fontWeight: 400,
    fontSize: '14px'
  },
  header: {
    padding: '2px 3px 3px 10px'
  },
  popperOpen: {
    zIndex: 11
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  iconButton: {
    top: 0,
    display: 'flex',
    right: 4,
    flexDirection: 'row-reverse',
    position: 'absolute'

  },
  commentBody: {
    color: 'black',
    fontWeight: 400,
    fontSize: '12px',
    height: '100%',
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none'
  },
  rightIconMenuItem: {
    fontSize: 12,
    fontWeight: 300,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 0,
    paddingBottom: 0

  },
  moreIcon: {
    width: '0.6em',
    height: '0.6em'
  }
})

/**
 * Create component class
 */
export class CommentComponent extends Component<ICommentComponentProps, ICommentComponentState> {
  static propTypes = {
    /**
     * Comment object
     */
    comment: PropTypes.object,
    /**
     * If it's true the post owner is the logged in user which this post be long to the comment
     */
    isPostOwner: PropTypes.bool,
    /**
     * If it's true the comment is disable to write
     */
    disableComments: PropTypes.bool
  }

  /**
   * Fields
   */
  buttonMenu = null

  /**
   * DOM styles
   *
   *
   * @memberof CommentComponent
   */
  styles = {
    author: {
      fontSize: '10px',
      paddingRight: '10px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.87)',
      textOverflow: 'ellipsis',
      overflow: 'hidden'

    },
    textarea: {
      fontWeight: 400,
      fontSize: '14px',
      border: 'none',
      width: '100%',
      outline: 'none',
      resize: 'none'
    },
    cancel: {
      float: 'right',
      clear: 'both',
      zIndex: 5,
      margin: '0px 5px 5px 0px',
      fontWeight: 400
    }
  }

  /**
   * Fields
   *
   * @type {*}
   * @memberof CommentComponent
   */
  textareaRef: any
  divCommentRef: any
  inputText: any
  divComment: any

  /**
   * Component constructor
   *
   */
  constructor (props: ICommentComponentProps) {
    super(props)

    this.textareaRef = (i: any) => { this.inputText = i }
    this.divCommentRef = (i: any) => { this.divComment = i }

    // Defaul state
    this.state = {
      /**
       * Comment text
       */
      text: this.props.comment.text!,
      /**
       * Comment text to match edit with new comment that is edited
       */
      initialText: this.props.comment.text!,
      /**
       * If comment text dosn't take any change it will be true
       */
      editDisabled: true,
      /**
       * If it's true the post owner is the logged in user which this post be long to the comment
       */
      isPostOwner: false,
      /**
       * The anchor of comment menu element
       */
      openMenu: false,
      /**
       * Anchor element
       */
      anchorEl: null

    }

    // Binding functions to `this`
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdateComment = this.handleUpdateComment.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)

  }

  /**
   * Handle show edit comment
   * @param  {event} evt is an event passed by clicking on edit button
   */
  handleEditComment = (evt: any) => {
    this.setState({openMenu: false})
    this.props.openEditor!()
  }

  /**
   * Handle cancel edit
   * @param  {event} evt is an event passed by clicking on cancel button
   */
  handleCancelEdit = (evt: any) => {

    this.setState({
      text: this.state.initialText!
    })
    this.props.closeEditor!()
  }

  /**
   * Handle edit comment
   * @param  {event} evt is an event passed by clicking on post button
   */
  handleUpdateComment = (evt: any) => {
    const { comment } = this.props
    comment.text = this.state.text
    this.props.update!(comment)
    this.setState({
      initialText: this.state.text
    })

  }

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleOnChange = (evt: any) => {
    const data = evt.target.value
    if (data.length === 0 || data.trim() === '' || data.trim() === this.state.initialText) {
      this.setState({
        text: data,
        editDisabled: true
      })
    } else {
      this.setState({
        text: data,
        editDisabled: false
      })
    }

  }

  /**
   * Delete a comment
   * @param  {event} evt    an event passed by click on delete comment
   * @param  {string} id     comment identifire
   * @param  {string} postId post identifier which comment belong to
   */
  handleDelete = (evt: any, id?: string | null, postId?: string) => {
    this.props.delete!(id, postId)
  }

  /**
   * Handle comment menu
   */
  handleCommentMenu = (event: any) => {
    this.setState({ openMenu: true,  anchorEl: findDOMNode(this.buttonMenu!), })
  }

  /**
   * Handle close request for comment menu
   */
  handleCloseCommentMenu = () => {
    this.setState({ openMenu: false })
  }

  componentWillMount () {
    const { commentOwner } = this.props
    if (!this.props.isCommentOwner && !commentOwner) {
      this.props.getUserInfo!()
    }
  }

  /**
   * Reneder component DOM
   * 
   */
  render () {

    /**
     * Comment object from props
     */
    const { comment, classes, fullName, avatar, t , editorStatus} = this.props

    const { openMenu, anchorEl } = this.state

    const rightIconMenu = (
      <div>
          <IconButton
          buttonRef={(node: any) => {
            this.buttonMenu = node
          }}
            aria-owns={openMenu! ? 'comment-menu' : ''}
            aria-haspopup='true'
            onClick={this.handleCommentMenu}
          >
            <MoreVertIcon className={classes.moreIcon} />
          </IconButton>
        {/* <Popper
          placement='bottom-start'
          eventsEnabled={openMenu!}
          className={classNames({ [classes.popperClose]: !openMenu! }, { [classes.popperOpen]: openMenu! })}
        >
          <ClickAwayListener onClickAway={this.handleCloseCommentMenu}>
            <Grow in={openMenu!} > */}
            <Popover
                open={openMenu!}
                anchorEl={anchorEl}
                anchorReference={'anchorEl'}
                anchorPosition={{ top: 0, left: 0 }}
                onClose={this.handleCloseCommentMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <MenuList role='menu'>
                  <MenuItem className={classes.rightIconMenuItem}>{t!('comment.replyButton')}</MenuItem>
                  {this.props.isCommentOwner ? (<MenuItem className={classes.rightIconMenuItem} onClick={this.handleEditComment}>{t!('comment.editButton')}</MenuItem>) : ''}
                  {(this.props.isCommentOwner || this.props.isPostOwner) ? (<MenuItem className={classes.rightIconMenuItem} onClick={(evt: any) => this.handleDelete(evt, comment.id, comment.postId)}>{t!('comment.deleteButton')}</MenuItem>) : ''}
                </MenuList>
              </Popover>

              </div>
    )

    const Author = () => (
      <div>
        <NavLink to={`/${userId}`}> <span style={this.styles.author as any}>{comment.userDisplayName}</span></NavLink><span style={{
          fontWeight: 400,
          fontSize: '8px'
        }}>{moment(comment.creationDate!).local().fromNow()}</span>
      </div>
    )
    const { userId } = comment
    const commentBody = (
      <div style={{ outline: 'none', flex: 'auto', flexGrow: 1 }}>
      { editorStatus ? <TextField
                placeholder={t!('comment.updateCommentPlaceholder')}
                multiline
                autoFocus
                rowsMax='4'
                InputProps={{
                  disableUnderline: true,
                  autoFocus: true,
                  fullWidth: true
                }}
                value={this.state.text}
                onChange={this.handleOnChange}
                className={classes.textField}
                fullWidth={true}
              /> : <div className={classNames('animate2-top10', classes.commentBody)}>{this.state.text}</div>}

        <div style={{ display: (editorStatus ? 'flex' : 'none'), flexDirection: 'row-reverse' }}>
          <Button color='primary' disabled={this.state.editDisabled}
            style={{ float: 'right', clear: 'both', zIndex: 5, margin: '0px 5px 5px 0px', fontWeight: 400 }}
            onClick={this.handleUpdateComment} > {t!('comment.updateButton')} </Button>
          <Button color='primary' style={this.styles.cancel as any} onClick={this.handleCancelEdit} > {t!('comment.cancelButton')} </Button>
        </div>
      </div>
    )
    return (
      <div className='animate-top' key={comment.id!}>
        <Paper elevation={0} className='animate2-top10'
          style={{ position: 'relative', padding: '', display: (!this.state.display ? 'block' : 'none') }}>
          <Card elevation={0}>
            <CardHeader
            className={classes.header}
              title={editorStatus ? '' : <Author />}
              subheader={commentBody}
              avatar={<NavLink to={`/${userId}`}><UserAvatar fullName={fullName!} fileName={avatar!} size={24} /></NavLink>}
              action={(!this.props.isCommentOwner && !this.props.isPostOwner && this.props.disableComments) || editorStatus ? '' : rightIconMenu}
            >
            </CardHeader>

          </Card>

        </Paper>

      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICommentComponentProps) => {
  return {
    delete: (id: string | null, postId: string) => dispatch(commentActions.dbDeleteComment(id, postId)),
    update: (comment: Comment) => {
      dispatch(commentActions.dbUpdateComment(comment))
    },
    openEditor: () => dispatch(commentActions.openCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    closeEditor: () => dispatch(commentActions.closeCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    getUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(ownProps.comment.userId!, ''))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICommentComponentProps) => {
  const commentOwnerId = ownProps.comment.userId
  const uid = state.getIn(['authorize', 'uid'])
  const avatar =  ownProps.comment.userAvatar
  const fullName = ownProps.comment.userDisplayName
  return {
    
    uid: uid,
    isCommentOwner: (uid === commentOwnerId),
    commentOwner: userSelector.getUserProfileById(state, {userId: commentOwnerId!}),
    avatar,
    fullName
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(CommentComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(CommentComponent as any))
