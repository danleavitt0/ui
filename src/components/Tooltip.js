/**
 * Imports
 */

import defaultTheme from '../default-theme'
import Position from 'vdux-position'
import element from 'vdux/element'
import Block from './Block'
import omit from '@f/omit'
import pick from '@f/pick'
import has from '@f/has'

/**
 * Constants
 */

const themeProps = ['colors']
const filterProps = omit(['placement', 'space', 'bgColor', 'color', 'show', 'class'])

/**
 * getProps - Grab theme properties
 */

function getProps (props, context = {}) {
  const {uiTheme = {}} = context
  props.$theme = pick(themeProps, uiTheme, defaultTheme)

  return props
}

/**
 * Tooltip
 */

function render ({props, children}) {
  const {placement = 'top', space = 0, color = 'white', show, $theme} = props
  const {colors = {}} = $theme
  let {bgColor = 'black'} = props

  bgColor = has(bgColor, colors) ? colors[bgColor] : bgColor

  return (
    <Position placement={placement} space={space} disable={!show}>
      <Block baseStyle={getStyle(props)} class={['vui-tooltip', props.class]}>
        <Block class='vui-tooltip-arrow' baseStyle={getBaseArrowStyle(props)} style={getArrowStyle(placement, bgColor)} />
        <Block class='vui-tooltip-inner' baseStyle={{maxWidth: 200}} fs='xxs' py={6} px={9} rounded {...filterProps(props)} bgColor={bgColor} color={color}>
          {children}
        </Block>
      </Block>
    </Position>
  )
}


/**
 * Compute base styles
 */

const width = '6px'

function getStyle ({show}) {
  return {
    position: 'absolute',
    pointerEvents: 'none',
    '-webkit-user-select': 'none',
    marginTop: '-3px',
    padding: `${width} 0`,
    top: -10000,
    opacity: show ? 1 : 0,
    transition: 'opacity .15s linear',
    '-webkit-transition': 'opacity .15s linear'
  }
}

function getBaseArrowStyle () {
  return {
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: 'transparent',
    width: 0,
    height: 0
  }
}

function getArrowStyle (placement, color) {
  switch (placement) {
    case 'top':
      return {
        bottom: 0,
        left: '50%',
        marginLeft: `-${width}`,
        borderWidth: `${width} ${width} 0`,
        borderTopColor: color,
        marginTop: '-3px'
      }
    case 'bottom':
      return {
        top: 0,
        left: '50%',
        marginLeft: `-${width}`,
        borderWidth: `0 ${width} ${width}`,
        borderBottomColor: color
      }
    case 'right':
      return {
        top: '50%',
        left: 0,
        marginTop: `-${width}`,
        borderWidth: `${width} ${width} ${width} 0`,
        borderRightColor: color
      }
    case 'left':
      return {
        top: '50%',
        right: 0,
        marginTop: `-${width}`,
        borderWidth: `${width} 0 ${width} ${width}`,
        borderLeftColor: color
      }
    default:
      throw new Error('Unknown tooltip placement: "' + placement + '"')
  }
}

/**
 * Exports
 */

export default {
  getProps,
  render
}