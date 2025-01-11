import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

export class Box {
  constructor(board, i, value) {
    this.board = board
    this.value = value
    this.width = 100
    this.height = 100

    this.container = new PIXI.Container()
    this.sprite = new PIXI.Sprite(this.board.textures[this.value])
    this.sprite.x = 10 + (i % 4) * this.width + 10 * (i % 4)
    this.sprite.y =
      10 + Math.floor(i / 4) * this.height + 10 * Math.floor(i / 4)

    this.container.addChild(this.sprite)
    this.board.boxesContainer.addChild(this.container)

    this.text = new PIXI.Text(this.value, {
      fontSize: 50,
      fontFamily: 'rubic, Arial, system-ui, sans-serif',
      fontWeight: 600,
      fill: 0x776e65,
    })
    this.text.anchor.set(0.5)
    this.text.x = this.width / 2
    this.text.y = this.height / 2
    this.sprite.addChild(this.text)

    // this.updateScale.bind(this)
    // this.scaleAnimation.bind(this)
    this.startingScale = {
      animScaleX: 1,
      animScaleY: 1,
    }

    this.endingScaleUp = {
      animScaleX: 2,
      animScaleY: 2,
    }
  }
  double() {
    this.value *= 2
    this.text.text = this.value
    this.sprite.texture = this.board.textures[this.value]

    this.text.style.fill = this.value > 4 ? 0xf9f6f2 : 0x776e65
    if (this.text.width > this.width) {
      this.text.width = 100
    }
  }

  updateScale = () => {
    this.container.scale.set(
      this.startingScale.animScaleX,
      this.startingScale.animScaleY,
    )
  }

  scaleAnimation = () => {
     let ticker = PIXI.Ticker.shared

    ticker.add(() => {
       TWEEN.update()
    })

    ticker.start()
    console.log(this)
    console.log(this.startingScale)
    console.log(this.endingScaleUp)
    new TWEEN.Tween(this.startingScale)
      .to(this.endingScaleUp, 1000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(this.updateScale)
      .start()
      .onComplete(() => {
        console.log('done')
        ticker.stop()
      })
  }

  moveLeft(n, deleted) {
    gsap
      .timeline({
        onComplete: () => {
          if (deleted) {
            this.board.boxesContainer.removeChild(this.container)
          }
        },
      })
      .to(this.sprite, {
        x: 10 + (n % 4) * this.width + 10 * (n % 4),
        duration: 0.1,
        ease: 'power1.inOut',
      })
  }
  moverRight(n, deleted) {
    gsap
      .timeline({
        onComplete: () => {
          if (deleted) {
            this.board.boxesContainer.removeChild(this.container)
          }
        },
      })
      .to(this.sprite, {
        x: 10 + (n % 4) * this.width + 10 * (n % 4),
        duration: 0.1,
        ease: 'power1.inOut',
      })
  }
  moveUp(n, deleted) {
    gsap
      .timeline({
        onComplete: () => {
          if (deleted) {
            this.board.boxesContainer.removeChild(this.container)
          }
        },
      })
      .to(this.sprite, {
        y: 10 + Math.floor(n / 4) * this.height + 10 * Math.floor(n / 4),
        duration: 0.1,
        ease: 'power1.inOut',
      })
  }
  moveDown(n, deleted) {
    gsap
      .timeline({
        onComplete: () => {
          if (deleted) {
            this.board.boxesContainer.removeChild(this.container)
          }
        },
      })
      .to(this.sprite, {
        y: 10 + Math.floor(n / 4) * this.height + 10 * Math.floor(n / 4),
        duration: 0.1,
        ease: 'power1.inOut',
      })
  }
}
