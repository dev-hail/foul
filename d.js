// !function() {

  !"use strict";

  const canvas = F.G.id("scr");
  let ctx = canvas.getContext('2d');
  canvas.width = cW;
  canvas.height = cH
  let mX, mY, cuX, cuY;
  const slider = F.G.id("foul");
  mX = cW / 2;
  mY = cH / 2;
  let max = cW + cH * (1.5 + 6.65 + 1.2 + 1.4) + cW;

  window.addEventListener('resize', () => {
    cW = canvas.width = window.innerWidth;
    cH = canvas.height = window.innerHeight;
    max = cW + cH * (1.5 + 6.65 + 1.2 + 1.4) + cW;
    init()
  });

  slider.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
  })

  function init() {
    F.G.id('u').style.width = max+'px'
  }

  init()

  let images = Array.from(F.G.qs('.aci'))

  images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./img.png)`
  })

  let t = 0, i = 0, test = 0;
  let s0, s1 = [];
  const npgs = F.G.id('u').children;

  let ofim, skewDiff, min; 

  function lerp(start, end, t) {
    return start * (1-t) + end*t;
  }


  scroll()
  function xpos(e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
          return e.targetTouches[0].clientX;
      }
      return e.clientX;
  }

  min = -cW
  offset2 = 0;
  timeConstant = 325


  let leave = function () {
      mouseDown = false;
      F.T(wks, 0, 0, 'px', `skewX(0deg)`)
  }

  class K {
    constructor() {
      this.e = Array.from(npgs);
      this.mouseDown = false;
      this.wheelDelta = 0;
      this.msc = 0;
      this.t = 0
      this.ref = 0;
      this.ifr = 0;
      this.offset = 0;
      this.ct = 500;
      this.i = 1
      this.p = F.M(this.newObs.bind(this), '0px 0px 0px -3.7%', 0);
      this.opacity
      this.e.forEach(p => {
        this.p.observe(p)
      })
      if (typeof window.ontouchstart !== 'undefined') {
        slider.addEventListener('touchstart', this.tap.bind(this));
        slider.addEventListener('touchmove', this.drag.bind(this));
        slider.addEventListener('touchend', this.release.bind(this));
      } 
      slider.addEventListener('mousedown', this.tap.bind(this));
      slider.addEventListener('mousemove', this.drag.bind(this));
      slider.addEventListener('mouseup', this.release.bind(this));
      slider.addEventListener('mouseleave', this.leave.bind(this));
      slider.addEventListener('wheel', this.handleWheel.bind(this), {passive: !1});
      
      this.kScroll();
      let newarr = [...F.G.class('nvgs')]
      newarr.forEach(e=> {
        e.addEventListener('click', this.szy.bind(this))
      })
    }

    leave(e) {
      this.mouseDown = false;
      e.stopPropagation()
      e.preventDefault()
    };

    tap(e) {
      this.mouseDown = true;
      console.log(e.target)
      this.ref = xpos(e);
      return false; 
    }

    drag(e) {
      let y, delta;
      if (this.mouseDown) {
        y = xpos(e);
        delta = this.ref - y;
        if (delta) {
          this.ref = y;
          this.offset += delta
          this.k = delta ? delta : 0
        }
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    release() {
      this.mouseDown = false;
      this.k = 0
    }

    kScroll() {
      this.ifr = lerp(this.ifr, this.offset, 0.05)
      this.wtp = (cW + (cH * 1.5))
      let nde = -(this.ifr).toFixed(2)
      
      s0 = [h, fl1, work, fl2, a, c]
      scrip:
      s0.forEach((el, i)=> {

        if (this.ifr*2 < (this.wtp)) {
          F.T(el, `${nde*2}`, 0, 'px')
          F.T(wks, 0, 0, 'px')
        }
        if (this.ifr*2>= (this.wtp) && !F.C.liv(fl2)) {
          F.T(el, `${nde*2}`, 0, 'px')
          F.T(frft, `${this.ifr*2- this.wtp}`, 0, 'px')
          ofim = this.ifr*2 - this.wtp
          this.pwrld()
          upImg()
        }
        if (F.C.liv(fl2)) {
          F.T(el, `${nde*2}`, 0, 'px')
        }
        F.T(el, `${nde*2}`, 0, 'px')
      })
      if (F.Gt(s0[5]) <= -(max - cW)) {
        for (var i=0; i<3; i++) {
          F.T(frft, 0, 0, 'px')
          F.T(s0[i], `${max-this.ifr*2}`, 0, 'px')
          Array.from(F.G.class('aci')).forEach(e => {
            F.T(e, 0, 0, 'px')
          })
        }
        if (F.Gt(c) <= -max) {
          this.offset = this.ifr = -F.Gt(h)/2
        }
      }
      if (F.Gt(s0[0]) > 0 && F.Gt(c) > 0) {
        for (var i=5; i>=3; i--) {
          F.T(frft, `${6.65*cH - cW}`, 0, 'px')
          F.T(s0[i], `-${max + this.ifr*2}`, 0, 'px')
          if (F.Gt(c) >= -(max - cW)) {
            this.offset = this.ifr = -F.Gt(c)/2
          }
        }
      }
      this.prog = Math.floor((this.offset*2 / max)*100)
      F.T(F.G.id('prog-bar'), 0, `-${100 - this.prog}`)
      requestAnimationFrame(this.kScroll.bind(this))
    }

    handleWheel(e) {
      this.mouseDown = false
      if (!this.mouseDown) {
        let f = cW / (this.e.length*2)
        let b = e.deltaX ? e.deltaX : e.deltaY
        let j = F.Clamp(b / cW * 12e2, -25, 25)

        this.wheelDelta += j;
        
        this.offset += this.wheelDelta
        this.wheelDelta = 0
        e.preventDefault()
        e.stopPropagation()
      }
    }

    pwrld() {
      var spans = [...frft.querySelectorAll('div>span')]
      let grid = (6.60*cH) / spans.length;
      // console.log(grid)
      let percent, opac;
      fir:
      for (var i = 0; i < spans.length;) {
        var { left } = wks.getBoundingClientRect()
        percent = 1- (Math.abs(left) / (grid*(i+1)))
        // console.log(percent)
        if (percent >= 1) {
          i++
        } else {
          break fir;
        }
      }
      requestAnimationFrame(this.pwrld.bind(this))
    }

    szy(e) {
      switch (e.target.getAttribute('for')) {
        case 'work':
          this.offset = cW/2
          break;
        case 'about':
          this.offset = (cW + 8.2*cH)/2;
          break;
        case 'contact':
          this.offset = (max - cW)/2;
          break;
        default:
          break;
      }
    }

    newObs() {

    }

  }


  class W {
    constructor(i) {
      this.ap = Array.from(images)
      this.c = F.M(this.gc.bind(this), '0px', 0.8)
      this.ap.forEach(p => {
        this.c.observe(p);
      })
    }

    gc(v) {
      v.forEach(p => {
        this.p = p
        this.iv = p.isIntersecting
      })
      if (this.iv) {
        setTimeout(() => {

        })
      }
    }
  }

  function moveCu() {
    if (mouseDown) {
      ctx.clearRect(0, 0, cW, cH)
      ctx.beginPath(); 
      ctx.arc(mX, mY, 20, 0, Math.PI*2);
      ctx.stroke();
    } else {
      ctx.clearRect(0, 0, cW, cH)
      createC()
      ctx.save()
    }
    requestAnimationFrame(moveCu)
  }

  function createC() {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.beginPath()
      ctx.arc(mX, mY, 21, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      let ar1 = mX-26
      let ar2 = mX+26
      ctx.moveTo(ar1, (mY-4));
      ctx.lineTo(ar1, (mY+4));
      ctx.lineTo((ar1-5), mY);
      ctx.fill()
      ctx.moveTo(ar2, (mY-4));
      ctx.lineTo(ar2, (mY+4));
      ctx.lineTo((ar2+5), mY);
      ctx.fill()
      ctx.save()
  }

  let id = null;

  window.onload = (e) => {
    // createC()r
    // moveCu()
  }

  function draw_cursor() {
    clearInterval(id);
    id = setInterval(frame, 70)
      let i = 0;
    function frame() {
      if (i == Math.ceil(Math.PI*2.5)) {
        clearInterval(id)
        moveCu()
      } else {
        ctx.clearRect(0, 0, cW, cH)
        ctx.beginPath()
        ctx.arc(mX, mY, 21, 0, i)
        ctx.stroke()
        i++  
      }
    }
  }

  let listT = [F.G.id('dvnm'), F.G.id('fl2'), F.G.id('cbt'), F.G.id('trsT')]
  let hmC = [...F.G.id('fl1').querySelectorAll('div')]
  let l3 = listT.concat(hmC)
  let options1 = {
    // rootMargin: '',
    threshold: 0.6
  }

  let observer = new IntersectionObserver(showItems, options1);

  function showItems(entries) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        let letters = entry.target.querySelectorAll('span span') 
        letters?.forEach((letter, idx) => {
          setTimeout(() => {
            letter.classList.add('active');
          }, (idx+2)*50)
        })
        if (entry.target == unl1) {
          inl1.classList.add('active')
        }
      }
    })
  }

  l3.forEach(item => {
    observer.observe(item)
  })

  function upImg() {
    let c = F.G.id('wks');
    let imw = c.getBoundingClientRect().width / (images.length);
    let t = cW + (cH * 1.5)
    let ra = ofim / imw;
    let intRatioV;
    images.forEach((y, z) => {
      intRatioV = ra - z
      F.T(y, `${intRatioV*50}`, 0, 'px')
    })
  }

  let imgcon = F.G.class('imw')
  Array.from(imgcon).forEach(e => {
    let pe = e.parentElement
    let subtex = pe.querySelectorAll('span span')
    e.addEventListener('mouseenter', (d) => {
      d.preventDefault()
      setTimeout(() => {
        pe = d.target.parentElement
        subtex = pe.querySelectorAll('span span')
        if (subtex.length > 3) {
          for(i=3; i<subtex.length; i++) {
            subtex[i].remove()
          }
        } else { }
        for(i=0; i<=2; i++) {
          subtex[i].style.opacity = '1'
          t = F.Cr('span')
          z = subtex[i].parentElement.appendChild(t)
          z.classList.add('ohe')
          if (i == 0) {
            z.classList.add('flxs')
          } else if (i == 1){
            z.classList.add('flxc')
          } else {
            z.classList.add('flxe')
          }
          z.innerHTML = `${subtex[i].innerHTML}`
        }
      }, 300)
    })
    e.addEventListener('mouseleave', (d) => {
      d.preventDefault()
      pe = d.target.parentElement
      subtex = pe.querySelectorAll('span span')
      subtex.forEach(e => {
        // F.T(e, 0, -110, '%')
      })
      setTimeout(() => {
        for(i=3; i<subtex.length; i++) {
          subtex[i].remove()
        }
      }, 600)
    })
    e.addEventListener('click', (d) => {
      pe = d.target.parentElement
      subtex = pe.querySelectorAll('span span')
      for (var i = 0; i < 4; i++) {
        subtex[i].style.opacity = '0';
      }
      for (var i = 4; i < subtex.length; i++) {
        F.T(subtex[i], 0, -110, '%')
      }
    })
  })

  const nOpt = {
    rootMargin: '0px 0px 0px -3.7%'
  }

  let navObs = new IntersectionObserver((e) => {
    let n = [trbg, gre, whi, pbi, cre, trbg];
    let o;
    e.forEach(z => {
      if (!z.isIntersecting) {
        if (z.boundingClientRect.left < 0) {
          switch(z.target) {
            case h:
              i = 1;
              o = n[i];
              inov(o, i, n)
              break;
            case fl1:
              i=2;
              o = n[i];
              inov(o, i, n)

              break;
            case work:
              i=3;
              o = n[i];
              inov(o, i, n)
              break;
            case fl2:
              i=4;
              o = n[i];
              inov(o, i, n)
              break;
            case a:
              i=5;
              o = n[i];
              inov(o, i, n)
              break;
            case c:
              i=0;
              o = n[i];
              inov(o, i, n)
              break;
            default: 
              i=0
              o = n[i]
              inov(o, i, n)
              break;
          }
        }
      } else {
        if (z.boundingClientRect.left<0)
        switch(z.target) {
            case h:
              i = 0;
              o = n[i];
              inov(o, i, n)
              break;
            case fl1:
              i=1;
              o = n[i];
              inov(o, i, n)
              break;
            case work:
              i=2;
              o = n[i];
              inov(o, i, n)
              break;
            case fl2:
              i=3;
              o = n[i];
              inov(o, i, n)
              break;
            case a:
              i=4;
              o = n[i];
              inov(o, i, n)
              break;
            case c:
              i=5;
              o = n[i];
              inov(o, i, n)
              break;
            default: 
              i=0
              o = n[i]
              inov(o, i, n)
          }
      }
    })
  }, nOpt)
  Array.from(npgs).forEach(e=> {
    navObs.observe(e)
  })

  function inov(o, i, n) {
    let na = Array.from(n)
    na.splice(i, 1)
    na.forEach((e) => {
      e.style.opacity = '0';
    })
    o.style.opacity = '1';
    let whTxts = [...F.G.class('wht')];
    let blTxts = [...F.G.class('blt')];
    let brdr = [...F.G.class('nvbr')];
    switch (o) {
      case trbg:
        for (let i=0; i<whTxts.length; i++) {
          blTxts[i].style.opacity = '1'
          whTxts[i].style.opacity = '0'
        }
        brdr.forEach(e => {
          e.style.background = '#000'
        })
        break;
      case gre:
        for (let i=0; i<whTxts.length; i++) {
          blTxts[i].style.opacity = '1'
          whTxts[i].style.opacity = '0'
        }
        brdr.forEach(e => {
          e.style.background = '#000'
        })
        break;
      case blc:
        for (let i=0; i<whTxts.length; i++) {
          blTxts[i].style.opacity = '0'
          whTxts[i].style.opacity = '1'
        }
        brdr.forEach(e => {
          e.style.background = '#FFF'
        })
        break;
      default:
        for (let i=0; i<whTxts.length; i++) {
          blTxts[i].style.opacity = '1'
          whTxts[i].style.opacity = '0'
        }
        brdr.forEach(e => {
          e.style.background = '#000'
        })
        break;
    }
  }
  new class {
    constructor() {
      const foul = new K();
      const p = new W(F.G.id('wks'))
    }
  }
// }();
