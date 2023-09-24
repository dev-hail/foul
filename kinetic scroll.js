class K {
    constructor() {
      this.e = Array.from(npgs);
      this.mouseDown = false;
      this.wheelDelta = 0;
      this.msc = 0;
      this.t = 0
      this.ref = 0;
      this.vel = 0;
      this.amp = 0;
      this.ifr = 0;
      this.o = null
      this.offset = 0;
      this.ct = 500;
      this.tic = null;
      this.mScroll = false
      this.p = F.M(this.pwrld.bind(this), '0px 0px 0px -3.7%', 0);
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
      // slider.addEventListener('wheel', this.handleWheel.bind(this), {passive: !1});
      // this.aScroll()
    }

    leave(e) {
      this.mouseDown = false;
      e.stopPropagation()
      e.preventDefault()
    };

    tap(e) {
      this.mouseDown = true;
      if (this.mScroll) {
        console.log('yea')
        console.log(`current is ${this.msc}`)
        this.offset = lerp(this.msc, this.offset, 0.05)
      }
      this.mScroll = false
      this.ref = xpos(e);
      console.log(this.offset)
      this.vel = this.amp = 0; 
      this.ifr = this.offset;
      this.ts = Date.now(); 
      clearInterval(this.tic); 
      this.tic = setInterval(this.track.bind(this), 10); 

      e.stopPropagation(); 
      return false; 
    }

    drag(e) {
      let y, delta;
      if (this.mouseDown) {
        y = xpos(e);
        delta = this.ref - y;
        if (delta) {
          this.ref = y;
          this.kScroll(this.offset + delta);
          this.k = this.ifr - this.offset
        }
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    track() {
      let now, elp, delta, v;
      now = Date.now();
      elp = now - this.ts; 
      this.ts = now; 
      delta = this.offset - this.ifr; 
      this.ifr = this.offset; 

      v = 1000 * delta / (1 + elp); 
      this.vel = 0.8 * v + 0.2 * this.vel;
      console.log(this.vel.toFixed(2))
    }

    release() {
      this.mouseDown = false;
      clearInterval(this.tic); 
      if (this.vel) { 
          this.amp = 0.4 * this.vel; 
          this.target = this.offset + this.amp; 
          this.ts = Date.now(); 
          requestAnimationFrame(this.autoScroll.bind(this)); 
      } 
    }

    autoScroll() {
      let scotch, delta;
      if (this.amp) {
        scotch = Date.now() - this.ts;
        delta = (-this.amp * Math.exp(-scotch / this.ct)).toFixed(2);
        if (delta > 2 || delta < -2) {
          this.kScroll(this.target + Math.floor(delta));
          requestAnimationFrame(this.autoScroll.bind(this));
        } else {
          this.kScroll(this.target);
        }
      }
    }

    kScroll(y) {
      this.offset = (y > max) ? max : (y < min) ? min : y;

      // if (this.mScroll) { return; }
      this.wtp = cW + (cH * 1.5)
      let nde = -(this.offset).toFixed(2)
      s0 = [h, fl1, work, fl2, a, c]
      s0.forEach(el => {
        if (this.offset < this.wtp) {
          F.T(el, `${nde}`, 0, 'px')
          F.T(frft, 0, 0, 'px')
          // F.T(wks, 0, 0, 'px', `skewX(0deg)`)
        } else if (this.offset >= this.wtp && !F.C.liv(fl2)) {
          F.T(el, `${nde}`, 0, 'px')
          F.T(frft, `${this.offset-this.wtp}`, 0, 'px')
          ofim = this.offset - this.wtp;
          upImg()
            // wprog()
        } else if (F.C.liv(fl2)) {
          F.T(el, `${nde}`, 0, 'px');
        }
      })
    }

    aScroll() {
      let e = 0.05
      this.wtp = cW + (cH * 1.5)
      // skewDiff = (this.t-this.msc)*.015
      if (this.mScroll && !this.mouseDown){
          this.msc = lerp(this.msc, this.offset, e).toFixed(2);
          Array.from(npgs).forEach(el => {
            if (this.msc < this.wtp) {
              F.T(el, `-${this.msc}`, 0, 'px')
              F.T(frft, 0, 0, 'px')
            }
            if (this.msc >= this.wtp && !F.C.liv(fl2)) {
              F.T(el, `-${this.msc}`, 0, 'px')
              F.T(frft, `${this.msc-this.wtp}`, 0, 'px')
              ofim = this.msc - this.wtp;
              upImg()
            }
            if (F.C.liv(fl2)) {
              F.T(el, `-${this.msc}`, 0, 'px');
            }
          })
        }
      
      // this.offset = this.t
      requestAnimationFrame(this.aScroll.bind(this))
    }

    handleWheel(e) {
      this.mScroll = true
      this.mouseDown = false
      if (!this.mouseDown) {
        let f = cW / (this.e.length*2)
        let b = (e.deltaY || e.deltaX) 
        let j = F.Clamp(b / cW * 12e2, -30, 35)

        this.wheelDelta += j;
        
        this.offset += this.wheelDelta
        this.wheelDelta = 0
      }

    }

    szy() {
      this.w = [];
      this.e.forEach(e => {
        // let p = e.getBoundingClientRect().width
        // var c = cW * 0.1;
      })
      // console.log(this.w)
    }

    pwrld(f) {
      f.forEach((p, k) => {
        if (p.isIntersecting) {
          F.C.inv()
          k = s1.length - 1;
          var b = this.e.findIndex(e => e == s1[k]) + 1;
          // console.log(b)
          s1.push(this.e[b])
          // console.log(s1)
          // if (this.k > 0) {
          //   console.log('left')
          //   k = s1.length - 1;
          //   g = s0.findIndex(e => e == s1[k]) + 1;
          //   s1.push(s0[g])
          // } else if (this.k < 0) {
          //   console.log('right')
          //   g = s0.findIndex(e => e == s1[0]) - 1;
          //   s1.push(s0[g])
          // }
        } else {
          F.C.inv()
          // if (this.k > 0) {
          //   console.log('right')
          //   g = s0.findIndex(e => e == s1[0]) - 1;
          //   s1.push(s0[g])
          // } else if (this.k < 0) {
          //   console.log('left')
          //   k = s1.length - 1;
          //   g = s0.findIndex(e => e == s1[k]) + 1;
          //   s1.push(s0[g])
          // }
        }
      }) 
    }
  }



class K {
    constructor() {
      this.e = Array.from(npgs);
      this.mouseDown = false;
      this.wheelDelta = 0;
      this.msc = 0;
      this.t = 0
      this.ref = 0;
      this.vel = 0;
      this.amp = 0;
      this.ifr = 0;
      this.o = null
      this.offset = 0;
      this.ct = 500;
      this.tic = null;
      this.mScroll = false
      this.p = F.M(this.pwrld.bind(this), '0px 0px 0px -3.7%', 0);
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
      // this.aScroll()
      this.kScroll()
    }

    leave(e) {
      this.mouseDown = false;
      e.stopPropagation()
      e.preventDefault()
    };

    tap(e) {
      this.mouseDown = true;
      if (this.mScroll) {
        // console.log('yea')
        // console.log(`current is ${this.msc}`)
      }
      this.mScroll = false
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
      // if (this.mScroll) { return; }
      this.ifr = lerp(this.ifr, this.offset, 0.05)
      this.wtp = (cW + (cH * 1.5))
      let nde = -(this.ifr).toFixed(2)
      s0 = [h, fl1, work, fl2, a, c]
      s0.forEach((el, i)=> {
        if (this.ifr*2 < (this.wtp)) {
          F.T(el, `${nde*2}`, 0, 'px')
          F.T(wks, 0, 0, 'px')
        }
        if (this.ifr*2>= (this.wtp) && !F.C.liv(a)) {
          console.log('yes')
          
          F.T(el, `${nde*2}`, 0, 'px')
          ofim = this.ifr*2 - this.wtp
          upImg()
        }
        if (F.C.liv(a)) {
          F.T(el, `${nde}`, 0, 'px')
          F.T(wks, 0, 0, 'px')
        }
      })
      requestAnimationFrame(this.kScroll.bind(this))
    }

    handleWheel(e) {
      this.mScroll = true
      this.mouseDown = false
      if (!this.mouseDown) {
        let f = cW / (this.e.length*2)
        let b = e.deltaX ? e.deltaX : e.deltaY
        let j = F.Clamp(b / cW * 12e2, -30, 35)

        this.wheelDelta += j;
        
        this.offset += this.wheelDelta
        this.wheelDelta = 0
      }
    }

    szy() {
      this.w = [];
      this.e.forEach(e => {
        // let p = e.getBoundingClientRect().width
        // var c = cW * 0.1;
      })
      // console.log(this.w)
    }

    pwrld(f) {
      f.forEach((p, k) => {
        if (p.isIntersecting) {
          F.C.inv()
          k = s1.length - 1;
          var b = this.e.findIndex(e => e == s1[k]) + 1;
          // console.log(b)
          s1.push(this.e[b])
          // console.log(s1)
          // if (this.k > 0) {
          //   console.log('left')
          //   k = s1.length - 1;
          //   g = s0.findIndex(e => e == s1[k]) + 1;
          //   s1.push(s0[g])
          // } else if (this.k < 0) {
          //   console.log('right')
          //   g = s0.findIndex(e => e == s1[0]) - 1;
          //   s1.push(s0[g])
          // }
        } else {
          F.C.inv()
          // if (this.k > 0) {
          //   console.log('right')
          //   g = s0.findIndex(e => e == s1[0]) - 1;
          //   s1.push(s0[g])
          // } else if (this.k < 0) {
          //   console.log('left')
          //   k = s1.length - 1;
          //   g = s0.findIndex(e => e == s1[k]) + 1;
          //   s1.push(s0[g])
          // }
        }
      }) 
    }
}