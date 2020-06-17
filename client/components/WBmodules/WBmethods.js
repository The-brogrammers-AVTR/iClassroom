import React, {useState} from 'react'
import socketIOClient from 'socket.io-client'
import {addLine} from './Line'
import {addTextNode} from './textNode'

const [rectangles, setRectangles] = useState([])
const [circles, setCircles] = useState([])
const [images, setImages] = useState([])

const [shapes, setShapes] = useState([])

const socket = socketIOClient() //'http://127.0.0.1:8080')
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}
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

// console.log('sstageEl', layerEl)
socket.on('circle', circle => {
  console.log('cirles from socket,', circle)
  setCircles(circle)
})
socket.on('rectangles', rectangles => {
  console.log('rectengles from socket,', rectangles)
  setRectangles(rectangles)
})
socket.on('images', images => {
  console.log('images from socket,', images)
  setImages(images)
})
