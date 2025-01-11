import { createApp, customLoader } from './utils/index.js'
import { Board } from './Board.js'
 
customLoader({}, initGame)

function initGame() {
  const app = createApp(470, 600)
  root.appendChild(app.view)
  const game = new Game(app)
}

class Game {
  constructor(app) {
    this.board = new Board()
    app.stage.addChild(this.board.container)
  }
}
