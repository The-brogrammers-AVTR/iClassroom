/* eslint-disable max-statements */
import React, {useState, useEffect} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import {Stage, Layer} from 'react-konva'
import Rectangle from './WBmodules/Rectangle'
import Circle from './WBmodules/Circle'
import {addLine} from './WBmodules/Line'

import {addTextNode} from './WBmodules/textNode'
import Image from './WBmodules/Image'
import socketIOClient from 'socket.io-client'
import {SwatchesPicker, GithubPicker, TwitterPicker} from 'react-color'
import {popover, cover} from './WBmodules/WBconstants'
import Konva from 'konva'

import {Tooltip, IconButton, Paper} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank' //square
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked' //circle
import TextFormatIcon from '@material-ui/icons/TextFormat' //Text
import BrushIcon from '@material-ui/icons/Brush' // line
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle' //eraser
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined' //image
import UndoIcon from '@material-ui/icons/Undo' //undo
import ColorLensIcon from '@material-ui/icons/ColorLens' //colorpicker
// import ClearIcon from '@material-ui/icons/Clear'

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
  useEffect(
    () => {
      console.log(layerEl.current)
    },
    [layerEl]
  )
  //console.log('shapes sstageEl shapes', shapes, React.useState(), React)

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
    addLine(
      color,
      stageEl.current.getStage(),
      layerEl.current,
      'brush',
      layerEl.current.children
    )
  }

  const eraseLine = () => {
    let tcolor = color
    setColor('#ffff')
    addLine(
      color,
      stageEl.current.getStage(),
      layerEl.current,
      'erase',
      layerEl.current.children
    )
    setColor(tcolor)
  }
  const drawText = () => {
    const id = addTextNode(color, stageEl.current.getStage(), layerEl.current)
    const shs = shapes.concat([id])
    setShapes(shs)
    // console.log(shs)
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

  socket.on('line', attrs => {
    //console.log(attrs, attrs.stroke)

    var line = new Konva.Line({
      stroke: attrs.stroke,
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      points: attrs.points,

      tension: 1
    })
    let layer = layerEl.current
    //console.log(line, layerEl, layer)
    if (layerEl.current != null) {
      // console.log(line, layerEl, layer)
      layer.add(line)
      layer.batchDraw()
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
  console.log('stage', stageEl)
  return (
    <Paper className="whiteboard" id="crosshair">
      <ButtonGroup>
        <Tooltip title="Rectangle">
          <IconButton onClick={addRectangle}>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Circle">
          <IconButton onClick={addCircle}>
            <RadioButtonUncheckedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Line">
          <IconButton onClick={drawLine}>
            <BrushIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eraser">
          <IconButton onClick={eraseLine}>
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Text">
          <IconButton onClick={drawText}>
            <TextFormatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Image">
          <IconButton onClick={drawImage}>
            <ImageOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo">
          <IconButton onClick={undo}>
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Color Palette">
          <IconButton onClick={handleClick}>
            <ColorLensIcon />
          </IconButton>
        </Tooltip>

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
        width={window.innerWidth / 2}
        height={window.innerHeight / 6 * 5}
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
            console.log('we changing', layerEl)
            socket.emit('layer', layer)
          }}
        >
          {rectangles.map((rect, i) => {
            //console.log(layerEl)
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
    </Paper>
  )
}
export default WhiteBoard
