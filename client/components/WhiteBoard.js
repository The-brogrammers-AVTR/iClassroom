import React, {useState, useEffect} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import {Stage, Layer} from 'react-konva'
import Rectangle from './WBmodules/Rectangle'
import Circle from './WBmodules/Circle'
import {addLine} from './WBmodules/Line'
import {addLine2} from './WBmodules/Line2'
import {addTextNode} from './WBmodules/textNode'
import Image from './WBmodules/Image'
import socketIOClient from 'socket.io-client'
import {SwatchesPicker, GithubPicker, TwitterPicker} from 'react-color'
import {popover, cover} from './WBmodules/WBconstants'

const socket = socketIOClient() //'http://127.0.0.1:8080')
const uuidv1 = require('uuid')

function WhiteBoard() {
  const [color, setColor] = useState('#000000')
  const [action, setAction] = useState(false)
  const [rectangles, setRectangles] = useState([])
  const [circles, setCircles] = useState([])
  const [images, setImages] = useState([])
  const [selectedId, selectShape] = useState(null)
  const [shapes, setShapes] = useState([])
  const [, updateState] = React.useState()
  const stageEl = React.createRef()
  const layerEl = React.createRef()
  const fileUploadEl = React.createRef()
  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max))
  }
  //console.log('sstageEl', layerEl)

  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: color,
      id: `rect${rectangles.length + 1}`
    }
    const rects = rectangles.concat([rect])
    setRectangles(rects)
    const shs = shapes.concat([`rect${rectangles.length + 1}`])
    setShapes(shs)
  }

  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: color,
      id: `circ${circles.length + 1}`
    }
    const circs = circles.concat([circ])
    setCircles(circs)
    const shs = shapes.concat([`circ${circles.length + 1}`])
    setShapes(shs)
  }

  const drawLine = () => {
    console.log('2', color, stageEl.current.getStage(), layerEl.current)
    addLine(color, stageEl.current.getStage(), layerEl.current)
  }

  const drawLine2 = line => {
    // console.log(line)

    console.log('1', line)
    addLine2(color, stageEl.current.getStage(), layerEl.current, 'brush', line)
  }

  const eraseLine = () => {
    let tcolor = color
    setColor('#ffff')
    addLine(color, stageEl.current.getStage(), layerEl.current, 'erase')
    setColor(tcolor)
  }
  const drawText = () => {
    const id = addTextNode(color, stageEl.current.getStage(), layerEl.current)
    const shs = shapes.concat([id])
    setShapes(shs)
    console.log(shs)
  }
  const drawImage = () => {
    fileUploadEl.current.click()
  }
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const fileChange = ev => {
    let file = ev.target.files[0]
    let reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        const id = uuidv1
        images.push({
          content: reader.result,
          id
        })
        setImages(images)
        socket.emit('images', images)
        fileUploadEl.current.value = null
        shapes.push(id)
        setShapes(shapes)
        forceUpdate()
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const undo = () => {
    const lastId = shapes[shapes.length - 1]
    let index = circles.findIndex(c => c.id === lastId)
    if (index !== -1) {
      circles.splice(index, 1)
      setCircles(circles)
    }
    index = rectangles.findIndex(r => r.id === lastId)
    if (index !== -1) {
      rectangles.splice(index, 1)
      setRectangles(rectangles)
    }
    index = images.findIndex(r => r.id === lastId)
    if (index !== -1) {
      images.splice(index, 1)
      setImages(images)
    }
    shapes.pop()
    setShapes(shapes)
    forceUpdate()
  }
  document.addEventListener('keydown', ev => {
    if (ev.code === 'Delete') {
      let index = circles.findIndex(c => c.id === selectedId)
      if (index !== -1) {
        circles.splice(index, 1)
        setCircles(circles)
      }
      index = rectangles.findIndex(r => r.id === selectedId)
      if (index !== -1) {
        rectangles.splice(index, 1)
        setRectangles(rectangles)
      }
      index = images.findIndex(r => r.id === selectedId)
      if (index !== -1) {
        images.splice(index, 1)
        setImages(images)
      }
      forceUpdate()
    }
  })

  socket.on('circle', circle => {
    //console.log('cirles from socket,', circle)
    setCircles(circle)
  })
  socket.on('rectangles', rectangles => {
    //console.log('rectengles from socket,', rectangles)
    setRectangles(rectangles)
  })
  socket.on('images', images => {
    //console.log('images from socket,', images)
    setImages(images)
  })
  const handleChangeComplete = color => {
    //console.log(color)
    setColor(color.hex)
  }
  const handleClick = () => {
    setAction(!action)
  }
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.querySelectorAll('canvas').addEventListener('change', () => {
  //     console.log('hello')
  //   })
  //   //console.log('aaaaaaaaaaaaa', a)
  // })

  const handleClose = () => {
    setAction({action: false})
  }

  return (
    <div className="whiteboard" id="crosshair">
      <h1>Whiteboard</h1>

      <ButtonGroup>
        <Button variant="primary" onClick={addRectangle}>
          Rectangle
        </Button>
        <Button variant="primary" onClick={addCircle}>
          Circle
        </Button>
        <Button variant="primary" onClick={drawLine}>
          Line
        </Button>
        <Button variant="primary" onClick={eraseLine}>
          Erase
        </Button>
        <Button variant="primary" onClick={drawText}>
          Text
        </Button>
        <Button variant="primary" onClick={drawImage}>
          Image
        </Button>
        <Button variant="primary" onClick={undo}>
          Undo
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Pick Color
        </Button>
        {action ? (
          //<div style={popover}>
          <div style={cover} onClick={handleClose}>
            {/*  <SwatchesPicker color={color} onChange={handleChangeComplete} />
               <GithubPicker color={color} onChange={handleChangeComplete} /> */}
            <TwitterPicker color={color} onChange={handleChangeComplete} />
          </div>
        ) : null}
      </ButtonGroup>
      <input
        style={{display: 'none'}}
        type="file"
        ref={fileUploadEl}
        onChange={fileChange}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage()
          if (clickedOnEmpty) {
            selectShape(null)
          }
        }}
      >
        <Layer
          ref={layerEl}
          onChange={() => {
            console.log('we changing')
            socket.emit('layer', layer)
          }}
        >
          {rectangles.map((rect, i) => {
            console.log(layerEl)
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id)
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice()
                  rects[i] = newAttrs
                  setRectangles(rects)
                  socket.emit('rectangles', rects)
                }}
              />
            )
          })}
          {circles.map((circle, i) => {
            console.log('circles', circles)
            return (
              <Circle
                key={i}
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                  selectShape(circle.id)
                }}
                onChange={newAttrs => {
                  const circs = circles.slice()
                  circs[i] = newAttrs
                  setCircles(circs)
                  socket.emit('circle', circs)
                }}
              />
            )
          })}
          {images.map((image, i) => {
            return (
              <Image
                key={i}
                imageUrl={image.content}
                isSelected={image.id === selectedId}
                onSelect={() => {
                  selectShape(image.id)
                }}
                onChange={newAttrs => {
                  const imgs = images.slice()
                  imgs[i] = newAttrs
                }}
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}
export default WhiteBoard
