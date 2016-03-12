/**
 * Imports
 */

import defaultTheme from '../default-theme'
import element from 'vdux/element'
import pick from '@f/pick'
import omit from '@f/omit'
import Base from './base'

/**
 * Prop filtering
 */

const themeProps = ['scale']
const filterProps = omit([
  'justify',
  'gutter',
  'column',
  '$theme',
  'align',
  'wrap',
  'auto'
])

/**
 * getProps
 */

function getProps (props, context = {}) {
  const {baseTheme = {}} = context
  props.$theme = pick(themeProps, baseTheme, defaultTheme)
  return props
}

/**
 * Flex container component
 */

function render ({props, children}) {
  const {gutter, $theme} = props
  const {scale} = $theme
  const extras = {}

  if (gutter) {
    extras.mx = -(scale && scale[gutter] ? scale[gutter] : gutter)
  }

  return (
    <Base baseStyle={getStyle(props)} {...extras} {...filterProps(props)}>
      {children}
    </Base>
  )
}

/**
 * Helpers
 */

function getStyle ({justify, align, column, wrap, auto}) {
  const result = {display: 'flex'}

  if (justify) result.justifyContent = flexify(justify)
  if (align) result.alignItems = flexify(align)
  if (column) result.flexDirection = 'column'
  if (wrap) result.flexWrap = 'wrap'
  if (auto) result.flex = '1 1 auto'

  return result
}

function flexify (str) {
  return str === 'start' || str === 'end'
    ? 'flex-' + str
    : str
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
