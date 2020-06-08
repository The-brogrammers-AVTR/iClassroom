import Konva from 'konva'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://127.0.0.1:8080')

export const addLine = (stage, layer, mode = 'brush') => {
  console.log('stage,layer', stage, layer)
  let isPaint = false
  let lastLine
  //console.log('last line', lastLine)
  stage.on('mousedown touchstart', function(e) {
    isPaint = true
    let pos = stage.getPointerPosition()
    lastLine = new Konva.Line({
      stroke: mode == 'brush' ? 'black' : 'white',
      strokeWidth: mode == 'brush' ? 5 : 20,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y],
      draggable: mode == 'brush'
    })
    layer.add(lastLine)
  })
  stage.on('mouseup touchend', function() {
    isPaint = false
  })
  stage.on('mousemove touchmove', function() {
    if (!isPaint) {
      return
    }
    const pos = stage.getPointerPosition()
    let newPoints = lastLine.points().concat([pos.x, pos.y])
    lastLine.points(newPoints)
    layer.batchDraw()
  })
}
