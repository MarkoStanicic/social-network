// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SvgImage from '@material-ui/icons/Image'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import {Map, List} from 'immutable'
import { translate, Trans } from 'react-i18next'

import {
  FacebookShareButton,
  FacebookIcon,

  TwitterShareButton,
  TwitterIcon,

  GooglePlusShareButton,
  GooglePlusIcon,

  LinkedinShareButton,
  LinkedinIcon
} from 'react-share'

// - Import app components

// - Import API

// - Import actions
import { IShareDialogComponentProps } from './IShareDialogComponentProps'
import { IShareDialogComponentState } from './IShareDialogComponentState'
import { Dialog, Paper, MenuList, MenuItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import SvgLink from '@material-ui/icons/Link'

const styles = (theme: any) => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%'
  },
  clipboard: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '10px',
    color: '#1e882d',
    fontWeight: 400
  },
  networkShare: {
    width: '100%',
    height: '100%'
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  },
  shareLinkPaper: {
    minHeight: 80,
    padding: 10,
    minWidth: 460
  }
})

/**
 * Create component class
 */
export class ShareDialogComponent extends Component<IShareDialogComponentProps, IShareDialogComponentState> {

  /**
   * Component constructor
   *
   */
  constructor(props: IShareDialogComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    let { classes, t, shareOpen, onClose, openCopyLink, post, onCopyLink } = this.props
    return (
      <Dialog
        className={classes.fullPageXs}
        title='Share On'
        open={shareOpen}
        onClose={onClose}
      >
        <Paper className={classes.shareLinkPaper}>
          {!openCopyLink
            ? (<MenuList>
              <div>
                <FacebookShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                  quote={post.get('body')}
                  hashtag={post.get('tags', List<string>([])).count() > 0 ?  `#${post.getIn(['tags', 0], 'hashtag') }` : null}
                  >
                  <MenuItem >
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <FacebookIcon
                        size={32}
                        round />
                    </ListItemIcon>
                    <ListItemText inset primary={t!('post.facebookButton')} />
                  </MenuItem>
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                  quote={post.get('body')}
                  hashtag={`#${post.getIn(['tags', 0], '')}`}>
                  <MenuItem >
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <TwitterIcon
                        size={32}
                        round />
                    </ListItemIcon>
                    <ListItemText inset primary={t!('post.twitterButton')} />
                  </MenuItem>
              </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                  quote={post.get('body')}
                  hashtag={`#${post.getIn(['tags', 0], '')}`}>
                  <MenuItem >
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <LinkedinIcon
                        size={32}
                        round />
                    </ListItemIcon>
                    <ListItemText inset primary={t!('post.linkedinButton')} />
                  </MenuItem>
              </LinkedinShareButton>
              </div>
              <div>
                <GooglePlusShareButton
                  onShareWindowClose={onClose}
                  url={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`}
                  quote={post.get('body')}
                  hashtag={`#${post.getIn(['tags', 0], '')}`}>
                  <MenuItem >
                    <ListItemIcon classes={{ root: classes.networkShare }}>
                      <GooglePlusIcon
                        size={32}
                        round />
                    </ListItemIcon>
                    <ListItemText inset primary={t!('post.googlePlusButton')} />
                  </MenuItem>
              </GooglePlusShareButton>
              </div>
              <MenuItem onClick={onCopyLink} >
                <ListItemIcon>
                  <SvgLink />
                </ListItemIcon>
                <ListItemText inset primary={t!('post.copyLinkButton')} />
              </MenuItem>
            </MenuList>)
            : <div>
              <TextField autoFocus fullWidth={true} id='text-field-default' defaultValue={`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`} />
              <Typography className={classNames('animate-top', classes.clipboard)} variant='h5' component='h2'>
                Link has been copied to clipboard ...
        </Typography>
            </div>}
        </Paper>
      </Dialog>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IShareDialogComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: IShareDialogComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ShareDialogComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)
