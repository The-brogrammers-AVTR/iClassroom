import Konva from 'konva'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient()

export const addLine = (color, stage, layer, mode, collection) => {
  let isPaint = false
  let lastLine

  stage.on('mousedown touchstart', function(e) {
    isPaint = true
    let pos = stage.getPointerPosition()

    lastLine = new Konva.Line({
      stroke: mode == 'brush' ? color : 'white',
      strokeWidth: mode == 'brush' ? 5 : 20,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y],
      draggable: mode == 'brush'
    })

    //console.log(lastLine.attrs)
    layer.add(lastLine)
  })
  stage.on('mouseup touchend', function() {
    isPaint = false
  })
  stage.on('mousemove touchmove', function(e) {
    if (!isPaint) {
      return
    }

    const pos = stage.getPointerPosition()

    let newPoints = lastLine.points().concat([pos.x, pos.y])
    //console.log(line, newPoints)

    lastLine.points(newPoints)
    if (mode == 'brush') {
      socket.emit('line', lastLine.attrs)
    } else if (mode == 'erase') {
      socket.emit('eraseLine', lastLine.attrs)
    }
    layer.batchDraw()
  })
}
