import Konva from 'konva'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient()

export const addLine = (color, stage, layer, mode = 'brush', collection) => {
  let isPaint = false
  let lastLine
  console.log({
    color: color,
    stage: stage,
    layer: layer,
    mode: mode,
    collection: collection
  })
  // if (collection.draggable) {
  //   console.log(collection)
  //   layer.add(collection)
  //   layer.batchDraw()
  //   return
  // }
  //console.log('last line', line)
  //console.log(line ? true : false, line)
  stage.on('mousedown touchstart', function(e) {
    //socket.emit('line', collection)
    //document.getElementsByClassName('home-page').style.cursor = 'crosshair'
    isPaint = true
    let pos = stage.getPointerPosition()
    //console.log(typeof line, line, typeof [pos.x, pos.y], [pos.x, pos.y])
    //socket.emit('line', [pos.x, pos.y])
    lastLine = new Konva.Line({
      stroke: mode == 'brush' ? color : 'white',
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
  stage.on('mousemove touchmove', function(e) {
    if (!isPaint) {
      return
    }

    const pos = stage.getPointerPosition()

    let newPoints = lastLine.points().concat([pos.x, pos.y])
    //console.log(line, newPoints)

    lastLine.points(newPoints)
    layer.batchDraw()
    // console.log(
    //   newPoints,
    //   lastLine.points(),
    //   e,
    //   [pos.x, pos.y],
    //   lastLine.points(newPoints)
    // )

    // socket.on('line', lastLine => {
    //   console.log('images from socket,', lastLine)
    // })
  })
}
