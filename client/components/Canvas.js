import React, {useEffect, useRef, useState} from 'react'

const Canvas = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextRef.current = context
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  )
}

export default Canvas

/*  const draw=(ctx,newLocation)=>{
        const {x,y}=newLocation;
        ctx.fillRect(x,y, 100, 100); 
 }

const Canvas=()=> {
    const [locations, setLocations] = React.useState([])
    const canvasRef = React.useRef(null)
    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, window.innerHeight, window.innerWidth)
        locations.forEach(location => draw(ctx, location))
      })

      function handleCanvasClick(e) {
        const newLocation = { x: e.clientX, y: e.clientY }
        setLocations([...locations, newLocation])
      }
      function handleClear() {
        setLocations([])
      }
      function handleUndo() {
        setLocations(locations.slice(0, -1))
      }
      React.useEffect(() => {
        localStorage.setItem('draw-app', JSON.stringify(locations))
      })
        return(
            <div>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleUndo}>Undo</button>
               <canvas ref={canvasRef} 
               width={window.innerWidth}
               height={window.innerHeight}
               onClick={handleCanvasClick}>

               </canvas>
            </div>
        )
    } */
