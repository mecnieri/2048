export class Box {
  constructor(board, i, value) {
    this.value = value
    this.width = 100
    this.height = 100
    this.graphics = new PIXI.Graphics()
    this.graphics.x = 10 + (i % 4) * this.width + 10 * (i % 4)
    this.graphics.y = 10 + Math.floor(i / 4) * this.height + 10 * Math.floor(i / 4)
    this.graphics.beginFill(0xefe4da)
    this.graphics.drawRoundedRect(0, 0, this.width, this.height, 10)
    this.graphics.endFill()
    this.graphics.pivot.set(0.5)

    this.container = new PIXI.Container()
    this.container.addChild(this.graphics)
    board.container.addChild(this.container)

    this.text = new PIXI.Text(this.value, {
      fontSize: 50,
      fontFamily: 'rubic, Arial, system-ui, sans-serif',
      fontWeight: 600,
      fill: 0x776e65,
    })
    this.text.anchor.set(0.5)
    this.text.x = this.width / 2
    this.text.y = this.height / 2
    this.graphics.addChild(this.text)
    this.background = {
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
  }
  double() {
    this.value *= 2
    this.text.text = this.value

    this.text.style.fill = this.value > 4 ? 0xf9f6f2 : 0x776e65
    if (this.text.width > this.width) {
      this.text.scale.set(this.width / this.text.width)
    }
    this.graphics.beginFill(this.background[this.value])
    this.graphics.drawRoundedRect(0, 0, this.width, this.height, 10)
    this.graphics.endFill()

    // this.scaleAnimation()

  }

  scaleAnimation() {

    let startingScale = {
      animScaleX: 1,
      animScaleY: 1,
    }

    let endingScaleUp = {
      animScaleX: 2,
      animScaleY: 2,
    }

    function updateScale() {
      console.log('first')
      this.container.scale.set(startingScale.animScaleX, startingScale.animScaleY)
    }
    console.log(PIXI)
    let ticker = PIXI.Ticker.shared

    ticker.add(() => {
      console.log('da')
      TWEEN.update()
    })

    ticker.start()

    new TWEEN.Tween(startingScale)
      .to(endingScaleUp, 1000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(updateScale)
      .start()
      .onComplete(() => {
        console.log('done')
        ticker.stop()
      })
  }

  moveLeft(n) {
    gsap.to(this.graphics, {
      x: 10 + (n % 4) * this.width + 10 * (n % 4),
      duration: 0.1,
      ease: 'power1.inOut',
    })
  }
  moverRight(n) {
    gsap.to(this.graphics, {
      x: 10 + (n % 4) * this.width + 10 * (n % 4),
      duration: 0.1,
      ease: 'power1.inOut',
    })
  }
  moveUp(n) {
    gsap.to(this.graphics, {
      y: 10 + Math.floor(n / 4) * this.height + 10 * Math.floor(n / 4),
      duration: 0.1,
      ease: 'power1.inOut',
    })
  }
  moveDown(n) {
    gsap.to(this.graphics, {
      y: 10 + Math.floor(n / 4) * this.height + 10 * Math.floor(n / 4),
      duration: 0.1,
      ease: 'power1.inOut',
    })
  }
}
