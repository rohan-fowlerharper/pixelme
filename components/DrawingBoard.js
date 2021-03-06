import { SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import Pixel from './Pixel'
import { useSelector, useDispatch } from 'react-redux'

// TODO: add click handling here instead of in Pixel const [clicked, setClicked] = useState(false) const [rClick, setRClick] = useState(false)

const DrawingBoard = ({ width, height, template }) => {
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()

  const pixelSize = 16 // TODO: make this a prop based on the size of the canvas
  
  useEffect(() => {
    template 
      ? dispatch({ type: 'CREATE_BOARD_FROM_TEMPLATE', width, height, template: template }) 
      : dispatch({ type: 'CREATE_EMPTY_BOARD', width, height, initialColor: '#ffffff' })
  }, [dispatch, height, width, template])

  return (
    <SimpleGrid
      bg='gray.100'
      columns={width}
      spacingX="1px"
      spacingY="1px"
      height={height*(pixelSize + 1) + 1}
      p="1px"
      onContextMenu={(evt) => evt.preventDefault()}
    >
      {board.map((row, rowIdx) => (
          row.map((pixel, colIdx) => (
            <Pixel
              key={pixel.id}
              pixel={pixel}
              size={pixelSize}
            />
          ))
      ))}
    </SimpleGrid>
  )
}

  // width: Math.max(...nyanCat.art.map(line => line.length)),
  // height: nyanCat.art.length
export default DrawingBoard