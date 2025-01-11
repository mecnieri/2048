import { Box } from './Box.js'
import { Tile } from './setup.js'

export class Board {
  constructor(app) {
    this.textures = app.textures
    this.width = 4
    this.height = 4
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0x9c8a7a)
    this.graphics.drawRoundedRect(0, 0, 450, 450, 10)
    this.graphics.endFill()

    this.container = new PIXI.Container()
    this.container.name = 'Tiles Container'
    this.container.x = 10
    this.container.y = 10
    this.container.addChild(this.graphics)

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        new Tile(this, i, j)
      }
    }
    this.boxesContainer = new PIXI.Container()
    this.boxesContainer.x = 10
    this.boxesContainer.y = 10

    this.boxesContainer.name = 'Boxes Container'

    this.boxes = new Array(16).fill(null, 0, 16)
    this.addRandomBoxes(4)
    this.container.addChild(this.boxesContainer)
    this.addEventListeners()
    this.count = 0
  }

  addRandomBoxes(n) {
    const freeTiles = this.getFreeTiles()
    if (freeTiles.length < n) n = freeTiles.length
    const randomTiles = []
    for (let i = 0; i < n; i++) {
      // check if there are 2 free tiles TODO

      const randomIndex = Math.floor(Math.random() * freeTiles.length)
      randomTiles.push(freeTiles[randomIndex])
      freeTiles.splice(randomIndex, 1)
      this.boxes[randomTiles[i]] = new Box(
        this,
        randomTiles[i],
        Math.random() < 0.9 ? 2 : 4,
      )
    }
    if (this.checkGameOver()) {
      setTimeout(() => {
        alert('Game Over')
      }, 100)
      return
    }
  }
  checkGameOver() {
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i] === null) return false
    }
    for (let i = 0; i < this.boxes.length; i++) {
      if (i % 4 !== 3 && this.boxes[i].value === this.boxes[i + 1].value) {
        return false
      }
      if (i < 12 && this.boxes[i].value === this.boxes[i + 4].value) {
        return false
      }
    }
    return true
  }
  getFreeTiles() {
    const freeTiles = []
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i] === null) {
        freeTiles.push(i)
      }
    }
    return freeTiles
  }
  moveLeft(n) {
    let arrs = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ]

    arrs.forEach(arr => {
      let sorted = arr.map(item => this.boxes[item]).sort()
      for (let i = 0; i < sorted.length - 1; i++) {
        if (
          sorted[i] !== null &&
          sorted[i + 1] !== null &&
          sorted[i].value === sorted[i + 1].value
        ) {
          sorted[i].double()
          sorted[i + 1].moveLeft(arr[i], true)
          sorted[i + 1] = null
        }
      }

      sorted.sort().forEach((item, index) => {
        if (item === null) {
          this.boxes[arr[index]] = null
        } else {
          this.boxes[arr[index]] = item
          item.moveLeft(arr[index])
        }
      })
    })
    setTimeout(() => {
      this.addRandomBoxes(Math.random() < 0.9 ? 1 : 2)
    }, 100)
  }
  moverRight(n) {
    let arrs = [
      [3, 2, 1, 0],
      [7, 6, 5, 4],
      [11, 10, 9, 8],
      [15, 14, 13, 12],
    ]
    arrs.forEach(arr => {
      let sorted = arr.map(item => this.boxes[item]).sort()
      for (let i = 0; i < sorted.length - 1; i++) {
        if (
          sorted[i] !== null &&
          sorted[i + 1] !== null &&
          sorted[i].value === sorted[i + 1].value
        ) {
          sorted[i].double()
          sorted[i + 1].moverRight(arr[i], true)

          sorted[i + 1] = null
        }
      }
      sorted.sort().forEach((item, index) => {
        if (item === null) {
          this.boxes[arr[index]] = null
        } else {
          this.boxes[arr[index]] = item
          item.moverRight(arr[index])
        }
      })
    })
    setTimeout(() => {
      this.addRandomBoxes(Math.random() < 0.9 ? 1 : 2)
    }, 100)
  }
  moveUp(n) {
    let arrs = [
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
    ]

    arrs.forEach(arr => {
      let sorted = arr.map(item => this.boxes[item]).sort()
      for (let i = 0; i < sorted.length - 1; i++) {
        if (
          sorted[i] !== null &&
          sorted[i + 1] !== null &&
          sorted[i].value === sorted[i + 1].value
        ) {
          sorted[i].double()
          sorted[i + 1].moveUp(arr[i], true)

          // this.boxesContainer.removeChild(sorted[i + 1].container)
          sorted[i + 1] = null
        }
      }
      sorted.sort().forEach((item, index) => {
        if (item === null) {
          this.boxes[arr[index]] = null
        } else {
          this.boxes[arr[index]] = item
          item.moveUp(arr[index])
        }
      })
    })
    setTimeout(() => {
      this.addRandomBoxes(Math.random() < 0.9 ? 1 : 2)
    }, 100)
  }

  moveDown(n) {
    let arrs = [
      [12, 8, 4, 0],
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
    ]

    arrs.forEach(arr => {
      let sorted = arr.map(item => this.boxes[item]).sort()
      for (let i = 0; i < sorted.length - 1; i++) {
        if (
          sorted[i] !== null &&
          sorted[i + 1] !== null &&
          sorted[i].value === sorted[i + 1].value
        ) {
          sorted[i].double()
          sorted[i + 1].moveDown(arr[i], true)

          // this.boxesContainer.removeChild(sorted[i + 1].container)
          sorted[i + 1] = null
        }
      }
      sorted.sort().forEach((item, index) => {
        if (item === null) {
          this.boxes[arr[index]] = null
        } else {
          this.boxes[arr[index]] = item
          item.moveDown(arr[index])
        }
      })
    })
    setTimeout(() => {
      this.addRandomBoxes(Math.random() < 0.9 ? 1 : 2)
    }, 100)
  }

  addEventListeners() {
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        this.moveLeft()
      }
      if (e.key === 'ArrowRight') {
        this.moverRight()
      }
      if (e.key === 'ArrowUp') {
        this.moveUp()
      }
      if (e.key === 'ArrowDown') {
        this.moveDown()
      }
    })

    window.addEventListener('touchstart', e => {
 
 
      // Cache the client X/Y coordinates
      this.clientX = e.touches[0].clientX
       this.clientY = e.touches[0].clientY

     
    })
    // window.addEventListener('touchend', e => {
    //   console.log('touchend')
    //   for (let i = 0; i < e.changedTouches.length; i++) {
    //     // Compute the change in X and Y coordinates.
    //     // The first touch point in the changedTouches
    //     // list is the touch point that was just removed from the surface.
    //     let deltaX = e.changedTouches[i].clientX - this.clientX
    //     let deltaY = e.changedTouches[i].clientY - this.clientY
    //     console.log(deltaX, deltaY)
    //     if (Math.abs(deltaX) > Math.abs(deltaY)) {
    //       console.log(deltaX, deltaY)
    //       if (deltaX > 0) {
    //         this.moverRight()
    //       } else {
    //         this.moveLeft()
    //       }
    //     } else {
    //       if (deltaY > 0) {
    //         this.moveDown()
    //       } else {
    //         this.moveUp()
    //       }
    //     }
    //   }
    // })
    document.addEventListener('touchend', () => {
      this.count = 0
    })
    document.addEventListener('touchmove', e => {
      // e.preventDefault()
      this.count++
      if (this.count === 4) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          // Compute the change in X and Y coordinates.
          // The first touch point in the changedTouches
          // list is the touch point that was just removed from the surface.
          let deltaX = e.changedTouches[i].clientX - this.clientX
          let deltaY = e.changedTouches[i].clientY - this.clientY
           if (Math.abs(deltaX) > Math.abs(deltaY)) {
             if (deltaX > 0) {
              this.moverRight()
            } else {
              this.moveLeft()
            }
          } else {
            if (deltaY > 0) {
              this.moveDown()
            } else {
              this.moveUp()
            }
          }
        }
      }
    })
  }
}
