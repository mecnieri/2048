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
    this.textures = {
      2: 0xeee4da,
      4: 0xede0c8,
      8: 0xf2b179,
      16: 0xf59563,
      32: 0xf67c5f,
      64: 0xf65e3b,
      128: 0xedcf72,
      256: 0xedcc61,
      512: 0xedc850,
      1024: 0xedc53f,
      2048: 0xedc22e,
    }
    for (let key in this.textures) {
      let gr = new PIXI.Graphics()
      gr.beginFill(this.textures[key])
      gr.drawRoundedRect(0, 0, 100, 100, 10)
      gr.endFill()
      const texture = app.renderer.generateTexture(gr)
      this.textures[key] = texture
    }

    this.board = new Board(this)

    app.stage.addChild(this.board.container)
    app.stage.addChild(this.board.boxesContainer)
  }
}
