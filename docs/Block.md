# Block

Block component for rendering content inside of a generic block.

## Usage

Render a block around something.

```javascript
import {Block} from 'vdux-ui'

function render () {
  return (
    <Block border borderColor='green'>
      <div>A green frame surrounds this</div>
    </Block>
  )
}
```

## API - props

  * `border` - Boolean. Sets `borderStyle` to 'solid' if true.
  * `borderTop` - Sets only the top border to solid. If set to a string, sets the color to that string.
  * `borderBottom` - Sets only the bottom border to solid. If set to a string, sets the color to that string
  * `borderLeft` - Sets only the left border to solid. If set to a string, sets the color to that string
  * `borderRight` - Sets only the right border to solid. If set to a string, sets the color to that string
  * `borderColor` - Color of the border. Selects from the `colors` prop of your theme if available.
  * `borderWidth` - Width of the border. Defaults to `1px`.
  * `textAlign` - Set `text-align` css prop.

## License

MIT
