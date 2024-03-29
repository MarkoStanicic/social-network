// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { grey } from '@material-ui/core/colors'
import SvgClose from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { IAppInputComponentProps } from './IAppInputComponentProps'
import { IAppInputComponentState } from './IAppInputComponentState'
import TextField from '@material-ui/core/TextField/TextField'

/**
 * Create component class
 */
export default class AppInputComponent extends Component<IAppInputComponentProps, IAppInputComponentState> {

  /**
   * Fields
   */
  input: any

  /**
   * Component constructor
   *
   */
  constructor(props: IAppInputComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }
  focus = () => {
    this.input.focus()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    return (
      <TextField
        inputRef={el => (this.input = el)}
        fullWidth
        {...this.props}
      />
    )
  }
}
