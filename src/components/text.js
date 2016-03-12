/**
 * Imports
 */

import defaultTheme from '../default-theme'
import element from 'vdux/element'
import {setScaled} from '../util'
import pick from '@f/pick'
import omit from '@f/omit'
import Base from './base'

/**
 * Constants
 */

const themeProps = ['fonts', 'fontScale', 'weightScale', 'lineHeightScale']
const filterProps = omit([
  'tag',
  'size',
  'font',
  'bold',
  'font',
  '$theme',
  'weight',
  'italic',
  'transform'
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
 * Text
 */

function render ({props, children}) {
  const {tag = 'span', $theme} = props

  return (
    <Base tag={tag} baseStyle={getStyle(props, $theme)} {...filterProps(props)}>
      {children}
    </Base>
  )
}

/**
 * Helpers
 */

function getStyle (props, theme) {
  const {fonts, fontScale, weightScale, lineHeightScale} = theme
  const {italic, bold, weight, transform, font, lh, size} = props
  const result = {}

  if (italic) result.fontStyle = 'italic'
  if (transform) result.textTransform = transform
  if (bold) result.fontWeight = theme.bold || 'bold'

  setScaled(result, 'fontFamily', font, fonts)
  setScaled(result, 'fontSize', size, fontScale)
  setScaled(result, 'fontWeight', weight, weightScale)
  setScaled(result, 'lineHeight', lh, lineHeightScale)

  return result
}

/**
 * Exports
 */

export default {
  getProps,
  render
}
