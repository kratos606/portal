import './style.css'
import Game from './Game/game.js'

const canvas = document.querySelector('canvas.webgl')
const game = new Game(canvas)

game.boot().catch((error) => {
  console.error(error)
  const label = document.getElementById('progressLabel')
  if (label) {
    label.textContent = `Initialisation failed: ${error.message}`
    label.style.color = '#ff6b6b'
  }
})
