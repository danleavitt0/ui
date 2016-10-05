/**
 * Imports
 */

import {classes, createEvent} from '../util'
import inputAttrs from '@f/input-attrs'
import element from 'vdux/element'
import ErrorTip from './ErrorTip'
import Block from './Block'
import pick from '@f/pick'
import omit from '@f/omit'
import Base from './Base'
import Text from './Text'
import Icon from './Icon'

/**
 * Constants
 */

const inputPropNames = [
  'tag',
  'invalid',
  'type',
  'name',
  'inputProps',
  'onInvalid',
  'defaultValue',
  'defaultChecked'
].concat(inputAttrs)
const filterProps = omit(inputPropNames)

/**
 * Input component
 */

function render ({props, children}) {
  const {
    message, name, label, labelClass,
    labelProps = {}, inputClass, inputProps = {},
    invalid, border, errorPlacement = 'left', icon
  } = props
  const filteredProps = filterProps(props)
  const restInputAttrs = pick(inputPropNames, props)

  const hasLabel = !!(label || children.length)

  return (
    <Block
      tag='label'
      align='start center'
      mb='s'
      relative
      overflow='visible'
      onFocus={[props.onFocus, stopEvent]}
      onBlur={[props.onBlur, stopEvent]}
      color={invalid ? 'error' : null}
      {...filteredProps}
      class={classes(props.class, 'vui-input-container')}>
      {
        hasLabel && (
          <Base tag='label' for={name} class={classes(labelClass, 'vui-label')} {...labelProps}>
            {label || children}
          </Base>
        )
      }
      {icon && <Icon name={icon} fs='s' lh='inherit'/>}
      <Base
        tag='input'
        onBlur={handleEvent}
        onFocus={handleEvent}
        outline='none'
        boxSizing='border-box'
        fontFamily='inherit'
        display='block'
        wide
        m={0}
        color='inherit'
        fs='inherit'
        type='text'
        border={inputProps.border && (invalid ? 'error' : 'border')}
        {...restInputAttrs}
        {...inputProps}
        class={classes(inputClass, 'vui-input')} />
        {
          message && <ErrorTip placement={errorPlacement} show={invalid} message={message} />
        }
    </Block>
  )
}

/**
 * Event simulation
 */

function handleEvent (e) {
  if (!e.bubbles) {
    const newEvent = createEvent(e.type, true)
    e.target.dispatchEvent(newEvent)
  }
}

function stopEvent (e) {
  e.stopPropagation()
  e._rawEvent.stopPropagation()
}

/**
 * Exports
 */

export default {
  render
}
