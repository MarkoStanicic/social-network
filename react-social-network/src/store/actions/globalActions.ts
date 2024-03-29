// - Import image gallery action types
import { GlobalActionType } from 'constants/globalActionType'
import i18n from 'locales/i18n'
import { Map } from 'immutable'

// - Import actions
import * as serverActions from 'store/actions/serverActions'

import { ICommonService } from 'src/core/services/common/ICommonService'
import { provider } from 'src/socialEngine'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { Feed, SocialError } from 'src/core/domain/common'
import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'src/api/StringAPI'
import { ServerRequestModel } from 'src/models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { DialogType } from 'models/common/dialogType'

/**
 * Get service providers
 */
const commonService: ICommonService = provider.get<ICommonService>(SocialProviderTypes.CommonService)

/**
 * Add a normal feed
 */
export let dbSendFeed = (newFeed: Feed) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  =  getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    // Set server request status to {Sent}
    const feedbackRequest = createFeedbackRequest(uid)
    dispatch(serverActions.sendRequest(feedbackRequest))

    return commonService.addFeed(newFeed).then(() => {
      // Set server request status to {OK}
      feedbackRequest.status = ServerRequestStatusType.OK
      dispatch(serverActions.sendRequest(feedbackRequest))
    })
      .catch((error: SocialError) => {
        dispatch(showMessage(error.message))

        // Set server request status to {Error}
        feedbackRequest.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(feedbackRequest))
      })
  }
}

// - Show notification of request
export const showNotificationRequest = () => {
  return (dispatch: Function, getState: Function) => {
    const state: Map<string, any> = getState()
    
    return dispatch(showMessage(i18n.t('common.sentRequestMessage')))
  }
}

// - Show notification of success
export const showNotificationSuccess = () => {
  return (dispatch: Function, getState: Function) => {
    const state: Map<string, any>  = getState()
    return dispatch(showMessage(i18n.t('common.successfulRequestMessage')))
  }
}

// - Internal request------------------

/**
 * Set search request
 */
export const setSearchRequest = (percent: number, visible: Boolean) => {
  return {
    type: GlobalActionType.PROGRESS_CHANGE,
    payload: { percent, visible }
  }
}

/**
 * Progress change
 */
export const progressChange = (percent: number, visible: boolean) => {
  return {
    type: GlobalActionType.PROGRESS_CHANGE,
    payload: { percent, visible}
  }
}

/**
 * Progress change with key
 */
export const progressChangeWithKey = (percent: number, visible: boolean, progressKey: string, meta?: any) => {
  return {
    type: GlobalActionType.PROGRESS_CHANGE_WITH_KEY,
    payload: { percent, visible , progressKey, meta}
  }
}

/**
 * Initialize locale
 */
export const initLocale = () => {
  return {
    type: GlobalActionType.INIT_LOCALE,
    payload: null
  }

}

/**
 * Default data loaded status will be true
 */
export const defaultDataEnable = () => {
  return {
    type: GlobalActionType.DEFAULT_DATA_ENABLE
  }
}

/**
 * Default data loaded status will be false
 * @param {boolean} status
 */
export const defaultDataDisable = () => {
  return {
    type: GlobalActionType.DEFAULT_DATA_DISABLE
  }
}

/**
 * Hide global message
 */
export const hideMessage = () => {
  hideTopLoading()
  return {
    type: GlobalActionType.HIDE_MESSAGE_GLOBAL
  }

}

/**
 * Show message
 * @param {string} message
 */
export const showMessage = (message: string) => {
  if (!message || message === '' || (message && message.trim() === '')) {
    message = 'Bad request'
  }
  return {
    type: GlobalActionType.SHOW_MESSAGE_GLOBAL,
    payload: message
  }

}

/**
 * Set header title
 */
export const setHeaderTitleOpt = (callerKey: string, payload: any) => {
  return (dispatch: any, getState: Function) => {
    switch (callerKey) {
      case 'profile':
        const userName = getState().user.info && getState().user.info[payload] ? getState().user.info[payload].fullName : ''
        dispatch(setHeaderTitle(userName))
        break
      default:
        break
    }

  }

}

/**
 * Set header title
 */
export const setHeaderTitle = (text: string) => {
  return {
    type: GlobalActionType.SET_HEADER_TITLE,
    payload: text
  }

}

/**
 * Open post write
 */
export const openPostWrite = () => {
  return {
    type: GlobalActionType.OPEN_POST_WRITE
  }

}

/**
 * Close post write
 */
export const closePostWrite = () => {
  return {
    type: GlobalActionType.CLOSE_POST_WRITE
  }

}

/**
 * Show top loading
 */
export const showTopLoading = () => {
  return {
    type: GlobalActionType.SHOW_TOP_LOADING
  }

}

/**
 * Hide top loading
 */
export const hideTopLoading = () => {
  return {
    type: GlobalActionType.HIDE_TOP_LOADING
  }

}

/**
 * Show master loading
 */
export const showMasterLoading = () => {
  return {
    type: GlobalActionType.SHOW_MASTER_LOADING
  }

}

/**
 * Show send feedback
 */
export const showSendFeedback = () => {
  return {
    type: GlobalActionType.SHOW_SEND_FEEDBACK
  }

}

/**
 * Hide send feedback
 */
export const hideSendFeedback = () => {
  return {
    type: GlobalActionType.HIDE_SEND_FEEDBACK
  }

}

/**
 * Hide master loading
 */
export const hideMasterLoading = () => {
  return {
    type: GlobalActionType.HIDE_MASTER_LOADING
  }

}

/**
 * Store temp data
 */
export const temp = (data: any) => {
  return {
    type: GlobalActionType.TEMP,
    payload: data
  }

}

/**
 * Clear temp data
 */
export const clearTemp = () => {
  return {
    type: GlobalActionType.CLEAR_ALL_GLOBAL
  }

}

// - Load data for guest
export const loadDataGuest = () => {
  // tslint:disable-next-line:no-empty
  return (dispatch: any, getState: Function) => {
  }

}

/**
 * Load twitter media
 */
export const dbLoadTwitterMedia = (accessToken: string) => {
 return {
   type: GlobalActionType.LOAD_TWITTER_MEDIA,
   payload: {accessToken}
 }

}

// - Clear loaded data
export const clearLoadedData = () => {
  return {
    type: GlobalActionType.CLEAR_LOADED_DATA
  }
}

// - Load initial data
export const loadInitialData = () => {
  return {
    type: GlobalActionType.LOAD_INITIAL_DATA
  }
}

/**
 *  Open dialog
 */
export const openDialog = (type: DialogType) => {
  return {
    type: GlobalActionType.OPEN_DIALOG,
    payload: {type}
  }
}

/**
 * Close dialog
 */
export const closeDialog = (type: DialogType) => {
  return {
    type: GlobalActionType.CLOSE_DIALOG,
    payload: {type}
  }
}

/**
 * Create send feedback serevr request model
 */
const createFeedbackRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CommonSendFeedback, userId)
  return new ServerRequestModel(
    ServerRequestType.CommonSendFeedback,
    requestId,
    '',
    ServerRequestStatusType.Sent
  )
}
