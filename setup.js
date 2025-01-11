export class Tile {
  constructor(board, x, y) {
    this.graphics = new PIXI.Graphics()
    this.width = 100
    this.height = 100
    this.graphics.beginFill(0xbead98)
    this.graphics.drawRoundedRect(0, 0, this.width, this.height, 10)
    this.graphics.endFill()
    this.graphics.x = 10
    this.graphics.y = 10
    this.container = new PIXI.Container()
    this.container.x = x * this.width + 10 * x
    this.container.y = y * this.height + 10 * y
    this.container.addChild(this.graphics)
    board.container.addChild(this.container)
  }
}
