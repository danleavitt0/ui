/**
 * Imports
 */

import element from 'vdux/element'
import Base from './Base'

/**
 * <ModalBody/> component
 */

function render ({props, children}) {
  return (
    <Base tag='div' h='75%' wide bgColor='white' {...props}>
      {children}
    </Base>
  )
}

/**
 * Exports
 */

export default {
  render
}
