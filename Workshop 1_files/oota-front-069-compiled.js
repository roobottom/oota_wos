/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
Utils = {};

Utils.find = function(target, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }

  if(target.matches(selector)) {
    return target;
  } else if(target.parentNode !== document.body) {
    return this.find(target.parentNode, selector);
  } else {
    return false;
  }
}

Utils.throttle = function(fn, threshhold, scope) {
  threshhold = threshhold || 300;

  var last = void 0;
  var deferTimer = void 0;

  return function () {
    var context = scope || this;
    var now = new Date().getTime();
    var args = arguments;

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);

      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

Utils.totalOffsetTop = function(element) {
  var offsetTop = 0;
  while(element) {
      offsetTop += (element.offsetTop);
      element = element.offsetParent;
  }
  return offsetTop;
}

Utils.totalOffsetLeft = function(element) {
  var offsetLeft = 0;
  while(element) {
      offsetLeft += (element.offsetLeft);
      element = element.offsetParent;
  }
  return offsetLeft;
}

Utils.applyPrefixedStyle = function(element, style, value) {
  var getCSSPrefix = function(style, value) {
    return ' -webkit- -moz- -o- -ms-'.split(' ').map(function(prefix) { return prefix + style; });
  }
  var prefixes = getCSSPrefix(style, value);

  prefixes.forEach(function(prefix) {
    element.style[prefix] = value;
  });
}
!function(t,n,e){"use strict";!function(t,n){var e=t.define||null;"function"==typeof e&&e.amd?e("ajax",[],function(){return n()}):t.Ajax=n()}(t,function(){var r={URLENCODED:"application/x-www-form-urlencoded",JSON:"application/json"},o=["onStart","onSuccess","onError","onFinish","onTimeout"],a=function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(e);return n}(r),i=function(e){var r=n.createElement("a");return r.href=e,r.hostname===t.location.hostname},u=function(t){return!!t.constructor.toString().match("FormData")},c=function(t){var n=new XMLHttpRequest;return"withCredentials"in n?n:i(t)?new ActiveXObject("Msxml2.XMLHTTP"):new XDomainRequest},s=function(){},f=e.keys,h={url:null,method:"GET",type:"URLENCODED",data:{},token:null,timeout:0,headers:{}};o.forEach(function(t){h[t]=s});var d=function(t,n){return f(t).forEach(function(e){n[e]=t[e]}),n},l=function(t,n){return u(t)?(f(n).forEach(function(e){t.append(e,n[e])}),t):d(n,t)},m=function(t){var n=t.querySelectorAll("input, textarea, select"),e={};return[].forEach.call(n,function(t){var n=t.name,r=t.value;n&&(e[n]=r)}),e},p=function(t){var n=this;n.url=t.url||h.url,n.method=t.method||h.method,n.type=t.type||h.type,n.token=t.token||h.token||n._getToken(),n.timeout=t.timeout||h.timeout,n.headers=d(t.headers||{},h.headers),n.data=n._prepData(t.data),o.forEach(function(e){n[e]=t[e]||h[e]})};return p.prototype={init:function(){var n=this;n._validate(),n._defaultHeaders(),n.xhr=c(n.url),n.xhr.open(n.method,n.url,!0),n.xhr.timeout=n.timeout,n._setRequestHeaders(),n._bindEvents();var e=n.xhr;return n.onStart(e),t.setTimeout(function(){n.xhr.send(n._parseData())},0),this},_prepData:function(t){return t=t||{},t=t.constructor.toString().match("HTMLFormElement")?m(t):t,l(t,h.data)},_bindEvents:function(){var t=this,n=t.xhr;n.ontimeout=t.onTimeout,this._xDomainRequest()?(n.onload=function(){t.onSuccess(n),t.onFinish(n)},n.onerror=function(){t.onError(n),t.onFinish(n)},n.ontimeout=s,n.pnprogress=s):n.onreadystatechange=function(){4===n.readyState&&(n.status.toString().match(/2[0-9]{1,2}/)?t.onSuccess(n):t.onError(n),t.onFinish(n))}},_xDomainRequest:function(){return!("withCredentials"in new XMLHttpRequest||i())},_setRequestHeaders:function(){var t=this;if(!t._xDomainRequest()){var n=t.headers;f(n).forEach(function(e){t.xhr.setRequestHeader(e,n[e])})}},_validate:function(){if(-1===a.indexOf(this.type))throw new Error("Ajax: Invalid type");if(!this.url&&!h.url)throw new Error("Ajax: URL required")},_defaultHeaders:function(){var t=this.headers,n=this.token;u(this.data)||(t["Content-Type"]=this._contentType()),n&&(t["X-CSRF-Token"]=n)},_contentType:function(){return r[this.type]},_getToken:function(){var t=n.getElementsByName("csrf-token")[0];return"undefined"!=typeof t&&null!==t?t.content:null},_parseData:function(){var t=this,n=t.data;return u(n)?n:"JSON"===t.type?JSON.stringify(n):t._dataToURLEncoded()},_dataToURLEncoded:function(){var t=this.data,n=f(t).map(function(n){return n+"="+encodeURIComponent(t[n])});return n.join("&")}},{request:function(t){return new p(t).init()},configure:function(t){return d(t,h)}}})}(window,document,Object);
//# sourceMappingURL=ajax.js.map
(function(window, document) {
  "use strict"

  /**
   * Fairly basic slider
   * @param {DOM element} element Element to contain slider, include .slides and .slide inside
   * @param {Object} options
   *
   */
  var BasicSlider = function(element, options) {
    this.element = element;
    this.slidesElement = element.querySelector('.slides');
    this.slides = [];
    this.nSlides = 0;
    this.nClones = 0;
    this.lastSlide = 0;
    this.currentSlide;
    this.loops;

    options = options || {};
    this.options = options;
    this.options.effect = options.effect || parseInt(this.element.getAttribute('data-effect')) || 'slide';
    this.options.effectDuration = options.effectDuration || parseInt(this.element.getAttribute('data-effect-duration')) || 1000;
    this.options.center = options.center || parseInt(this.element.getAttribute('data-center')) || false;
    this.options.margin = options.margin || parseInt(this.element.getAttribute('data-margin')) || 0;
    this.options.setHeight = options.setHeight || parseInt(this.element.getAttribute('data-set-height')) || 0;
    this.options.slidesVisible = options.slidesVisible || parseInt(this.element.getAttribute('data-slides-visible')) || 1;
    this.options.throttleControls = options.throttleControls || parseInt(this.element.getAttribute('data-throttle-controls')) || false;
    this.options.slideNav = options.slideNav || parseInt(this.element.getAttribute('data-slide-nav')) || false;
    this.options.directionNav = options.directionNav || null;
    this.options.controlNav = options.controlNav || null;
    this.options.afterInit = options.afterInit || function() {};
    this.options.afterSlide = options.afterSlide || function() {};
    this.options.beforePrev = options.beforePrev || function() {};
    this.options.afterPrev = options.afterPrev || function() {};
    this.options.beforeNext = options.beforeNext || function() {};
    this.options.afterNext = options.afterNext || function() {};

    // Width is being auto detected based on style
    this.autoWidth = this.options.slidesVisible === 'auto';

    this.init();

    this.directionNav;
    this.prev;
    this.next;

    this.clickable = true;

    window.addEventListener('resize', this.onResize.bind(this));
  }

  BasicSlider.prototype.init = function() {
    var slideNodes = this.element.querySelectorAll(".slide");
    for (var i = 0; i < slideNodes.length; i++) {
      this.slides[i] = slideNodes[i];
    };

    // Clone slides for infinite loop
    this.nOriginalSlides = this.slides.length;
    if(this.options.effect === "slide") {
      this.loops = true;
      this.cloneSlides();
    } else {
      this.loops = false;
      this.nClones = 0;
    }
    this.nSlides = this.slides.length;

    var activeNodeAt = null;
    for (var i = 0; i < this.nSlides; i++) {
      this.slides[i].setAttribute("data-slide", i);

      if(this.slides[i].getAttribute("data-state") === "active") {
        activeNodeAt = i;
      }
    };

    this.element.style.position = "relative";
    this.element.style.overflow = "hidden";

    if(this.options.carousel) {
      this.setupCarousel();
    } else {
      this.setupSlider();
    }

    this.setupNav();

    // afterInit callback
    this.options.afterInit.call(this);

    this.currentSlide = activeNodeAt ? activeNodeAt : this.nClones;
    this.moveToSlide(this.currentSlide, true, true);
  }

  BasicSlider.prototype.unset = function() {
    this.element.removeAttribute('style');
    this.slidesElement.removeAttribute('style');
    [].forEach.call(this.slidesElement.querySelectorAll('.slide'), function(s) {
      s.classList.remove('active-slide');
      s.removeAttribute('style');
    });
    if(this.directionNav) this.directionNav.innerHTML = "";
    if(this.controlNav) this.controlNav.innerHTML = "";
  }

  BasicSlider.prototype.cloneSlides = function() {
    this.originalSlides = this.slides;

    // Determine number of slides to clone
    // Right now whole screen in case goes to end
    if(this.autoWidth || this.options.slidesVisible > 1) {
      var slidesVisible = this.slides.length
    } else {
      var slidesVisible = this.options.slidesVisible;
    }

    this.nClones = slidesVisible;

    var firstSlides = [];
    var lastSlides = [];

    // Create clones
    for (var i = 0; i < this.nClones; i++) {
      firstSlides[i] = this.slides[this.slides.length - (i + 1)].cloneNode(true);
      lastSlides[i] = this.slides[i].cloneNode(true);

      firstSlides[i].classList.add('clone');
      lastSlides[i].classList.add('clone');
      firstSlides[i].removeAttribute('data-state');
      lastSlides[i].removeAttribute('data-state');
    };

    // Insert clones
    for (var i = 0; i < this.nClones; i++) {
      this.slidesElement.insertBefore(firstSlides[i], this.slidesElement.children[0]);
      this.slides.unshift(firstSlides[i]);

      this.slidesElement.appendChild(lastSlides[i]);
      this.slides.push(lastSlides[i]);
    };
  }

  BasicSlider.prototype.setupSlider = function() {

    this.slidesElement.style.padding = "0";
    this.slidesElement.style.margin = "0";
    for (var i = 0; i < this.nSlides; i++) {
      this.slides[i].style['-webkit-touch-callout'] = 'none';
      this.slides[i].style['-webkit-user-select'] = 'none';
      this.slides[i].style['-khtml-user-select'] = 'none';
      this.slides[i].style['-moz-user-select'] = 'none';
      this.slides[i].style['-ms-user-select'] = 'none';
      this.slides[i].style['user-select'] = 'none';
    }

    if(this.autoWidth) {
      this.setSize();
      BasicSlider.applyPrefixedStyle(this.slidesElement, 'transition', 'transform 0.8s');
    } else {
      // Set slides element width/transition
      var baseWidth = 100 / this.options.slidesVisible;
      this.slidesElement.style.width = ((baseWidth + this.options.margin) * this.nSlides) + "%";
      BasicSlider.applyPrefixedStyle(this.slidesElement, 'transition', 'transform 0.8s');

      // Set individual slide widths/styles
      for (var i = 0; i < this.nSlides; i++) {
        this.slides[i].style.float = "left";
        var margin = this.options.margin / 2 / this.nSlides;
        var widthFactor = 1 / ((100 + this.options.margin) / 100);
        var marginFactored = margin * widthFactor
        this.slides[i].style.marginLeft = marginFactored + "%";
        this.slides[i].style.marginRight = marginFactored + "%";
        this.slides[i].style.width = (widthFactor * 100 / this.nSlides) + "%";
      };
    }
  }

  BasicSlider.prototype.setupNav = function() {
    // Direction nav
    this.setupDirectionNav();

    // Control Nav
    this.setupControlNav();

    // Swipe
    this.detectSwipe();

    // Click on slide
    if(this.options.slideNav) {
      for (var i = 0; i < this.slides.length; i++) {
        var self = this;
        this.slides[i].addEventListener('click', function() {
          self.moveToSlide(parseInt(this.getAttribute('data-slide')));
        });
      };
    }
  }

  BasicSlider.prototype.setupDirectionNav = function() {
    // Use options direction nav element or find contained element
    if(this.options.directionNav) {
      this.directionNav = this.options.directionNav;
    } else {
      this.directionNav = this.element.querySelector('.direction-nav');
    }
    if(!this.directionNav) return false;
    this.directionNav.style.zIndex = 5;

    // Add prev/next button if not there
    var possiblePrev = this.directionNav.querySelector('.js-slider-prev');
    if(possiblePrev) {
      this.prev = possiblePrev
    } else {
      this.prev = document.createElement('div');
      this.prev.className = 'js-slider-prev';
      this.directionNav.appendChild(this.prev);
    }

    var possibleNext = this.directionNav.querySelector('.js-slider-next');
    if(possibleNext) {
      this.next = possibleNext
    } else {
      this.next = document.createElement('div');
      this.next.className = 'js-slider-next';
      this.directionNav.appendChild(this.next);
    }

    BasicSlider.applyPrefixedStyle(this.prev, 'user-select', 'none');
    this.prev.style.cursor = "pointer";
    this.prev.addEventListener('click', this.handlePrev = this.handlePrev.bind(this));

    BasicSlider.applyPrefixedStyle(this.next, 'user-select', 'none');
    this.next.style.cursor = "pointer";
    this.next.addEventListener('click', this.handleNext = this.handleNext.bind(this));
  }

  BasicSlider.prototype.setupControlNav = function() {
    // Use options direction nav element or find contained element
    if(this.options.controlNav) {
      this.controlNav = this.options.controlNav;
    } else {
      this.controlNav = this.element.querySelector('.control-nav');
    }
    if(!this.controlNav) return false;
    this.controlNav.style.zIndex = 5;

    // Generate dots
    this.controlNav.dots = [];
    for (var i = 0; i < this.nOriginalSlides; i++) {
      var dot = document.createElement('div');
      dot.className = 'js-slider-control dot';
      dot.setAttribute('data-index', i);
      BasicSlider.applyPrefixedStyle(dot, 'user-select', 'none');

      var self = this;
      dot.addEventListener('click', function() { self.moveToSlide(parseInt(this.getAttribute('data-index')) + self.nClones); });

      this.controlNav.appendChild(dot);
      this.controlNav.dots[i] = dot; // EASY ACCESS
    };
  }

  BasicSlider.prototype.getSlideWidth = function() {
    // For now only check first
    return 100 / this.nSlides;
  }

  BasicSlider.prototype.getPrevSlide = function() {
    return this.currentSlide === 0 ? this.nSlides - 1 : this.currentSlide - 1;
  }

  BasicSlider.prototype.getNextSlide = function() {
    return this.currentSlide === this.nSlides - 1 ? 0 : this.currentSlide + 1;
  }

  BasicSlider.prototype.getCurrentSlide = function() {
    if(this.currentSlide === 0) {
      return this.nSlides - 1;
    } else if(this.currentSlide === this.nSlides - 1) {
      return 0;
    } else {
      return this.currentSlide;
    }
  }

  BasicSlider.prototype.prevSlide = function() {
    var prevSlide = this.getPrevSlide()
    this.options.beforePrev.call(this, this.slides[prevSlide], prevSlide);
    this.moveToSlide(prevSlide);
    this.options.afterPrev.call(this, this.slides[prevSlide], prevSlide);
  }

  BasicSlider.prototype.nextSlide = function() {
    var nextSlide = this.getNextSlide()
    this.options.beforeNext.call(this, this.slides[nextSlide], nextSlide);
    this.moveToSlide(nextSlide);
    this.options.afterPrev.call(this, this.slides[nextSlide], nextSlide);
  }

  BasicSlider.prototype.moveToSlide = function(slideNumber, noAnimate, noClip) {
    // Throttle
    if(this.options.throttleControls) {
      if(!this.throttled) {
        this.throttled = true;
        setTimeout(function(){
          this.throttled = false;
        }.bind(this), this.options.effectDuration);
      } else {
        return false;
      }
    }

    slideNumber = parseInt(slideNumber);
    this.currentSlide = slideNumber;

    var position = this.getPosition();

    // Set/remove active class on slides
    [].forEach.call(this.slidesElement.querySelectorAll('.active-slide'), function(s) {
      s.classList.remove('active-slide');
    });
    this.slides[slideNumber].classList.add('active-slide');

    // Clip if looping slider and not prevented in this function
    if(this.loops && !noClip) {
      var slideNumberSafe = this.clip(slideNumber);
    } else {
      var slideNumberSafe = slideNumber - this.nClones;
    }

    // Set controls
    if(this.controlNav) {
      for (var i = 0; i < this.controlNav.dots.length; i++) {
        this.controlNav.dots[i].classList.remove('active');
        this.controlNav.dots[slideNumberSafe].classList.add('active');
      };
    }

    // Set text
    if(this.element.querySelector('.accompaniment')) {
      [].forEach.call(this.element.querySelectorAll('.accompaniment li.active'), function(li) {
        li.classList.remove('active');
      });
      this.element.querySelector('.accompaniment li:nth-child(' + (slideNumberSafe + 1) + ')').classList.add('active');
    }

    if(noAnimate) {
      this.setPositionNoAnimation(position);
    } else {
      this.setPosition(position);
    }

    // onChangeSlide callback
    this.options.afterSlide.call(this, this.slides[slideNumber], slideNumber);
  }

  BasicSlider.prototype.getPosition = function() {
    var activeSlide = (this.currentSlide - Math.floor(this.nSlides / 2));

    if(this.options.effect === "none") {

      return "";

    } else if(this.options.effect === "fade") {

      return "";

    } else {

      if(0 && this.options.slidesVisible === 1) {
        // Percentage-based slide position
        // var negativeOffset = -((this.nSlides - 1) * 10);
        // var widthFactor = 1 / ((100 + this.options.margin) / 100);
        // var leftMargin = (widthFactor * this.options.margin / 10);

        // var slideWidth = this.getSlideWidth();
        // var x =  negativeOffset - leftMargin - activeSlide * slideWidth;
        // return "rotateY(0deg) translateX(" + x + "%)";
      } else {
        // Calculated carousel offset
        var x = -1 * this.slides[this.currentSlide].offsetLeft;

        // Centre carousel active item
        if(this.options.center) {
          x += this.element.clientWidth / 2 - this.slides[this.currentSlide].clientWidth / 2;
        }

        // Append 3D acceleration
        var extraCSS = BasicSlider.hasTransitions() ? 'rotateY(0deg) ' : '';
        // return CSS Position string
        return extraCSS + 'translateX(' + x + 'px)';
      }

    }
  }

  BasicSlider.prototype.setPosition = function(position) {
    BasicSlider.applyPrefixedStyle(this.slidesElement, 'transform', position);
  }

  BasicSlider.prototype.setPositionNoAnimation = function(position) {
    BasicSlider.applyPrefixedStyle(this.slidesElement, 'transition', 'transform 0s');
    BasicSlider.applyPrefixedStyle(this.slidesElement, 'transform', position);
    this.slidesElement.offsetTop
    BasicSlider.applyPrefixedStyle(this.slidesElement, 'transition', 'transform ' + (this.options.effectDuration / 1000) + 's');
  }

  // Move end-to-end for infinite loop effect
  // Returns resulting slide (although both ends still have an active slide)
  BasicSlider.prototype.clip = function(slideNumber) {
    var self = this;
    var slideNumberSafe = slideNumber - this.nClones; // Slide number if there weren't extra padding slides

    var setClipPosition = function(slideNumber) {
      this.clickable = false;

      // Add active class to psuedo-slide
      this.slides[slideNumber].classList.add('active-slide');

      setTimeout(function(){
        this.clickable = true;
        this.currentSlide = slideNumber;
        this.setPositionNoAnimation.call(self, this.getPosition());
      }.bind(this), 1000);
    }.bind(this);

    // Reset to start if at end
    if(this.isCloneAfter(slideNumberSafe)) {
      if(this.autoWidth) {
        var overshoot = slideNumberSafe - this.nClones;
        slideNumberSafe = overshoot;
        slideNumber = this.nClones + overshoot;
      } else {
        slideNumberSafe = 0;
        slideNumber = this.nClones;
      }

      setClipPosition(slideNumber);
    }

    // Reset to end if at start
    if(this.isCloneBefore(slideNumberSafe)) {
      if(this.autoWidth || this.options.slidesVisible > 1) {
        var overshoot = slideNumberSafe;
        slideNumberSafe = this.nClones + overshoot;
        slideNumber = this.nClones + slideNumberSafe;
      } else {
        slideNumberSafe = this.nOriginalSlides - 1;
        slideNumber = this.nOriginalSlides;
      }
      setClipPosition(slideNumber);
    }

    return slideNumberSafe;
  }

  BasicSlider.prototype.isCloneBefore = function(slideNumberSafe) {
    return slideNumberSafe < 0;
  }

  BasicSlider.prototype.isCloneAfter = function(slideNumberSafe) {
    if(this.autoWidth) {
      return slideNumberSafe >= this.nClones;
    } else {
      return slideNumberSafe >= this.nOriginalSlides;
    }
  }

  BasicSlider.prototype.setSize = function(setPosition) {
    if(setPosition) {
      this.setPositionNoAnimation(this.getPosition());
    }

    if(this.autoWidth) {
      this.slidesWidth = this.slides.reduce(function(prev, cur) { return prev + cur.clientWidth; }, 0);
      this.slidesElement.style.width = 3 * this.slidesWidth + "px";
    }

    if(this.options.setHeight) {
      var tallest = 0;
      for (var i = 0; i < this.slides.length; i++) {
        var height = this.slides[i].clientHeight
        if(height > tallest) {
          tallest = height;
        }
      };
      this.slidesElement.style.height = tallest + "px";
    }
  }

  BasicSlider.prototype.onResize = function() {
    this.setSize(true);
    this.moveToSlide(this.currentSlide, true);
  }

  BasicSlider.prototype.handlePrev = function(e) {
    if(this.clickable) {
      this.prevSlide();
    }
  }

  BasicSlider.prototype.handleNext = function(e) {
    if(this.clickable) {
      this.nextSlide();
    }
  }

  BasicSlider.prototype.detectSwipe = function() {
    var self = this;
    var minimumSwipeDistance = 30;

    this.element.addEventListener('touchstart', function(e) {
      var clientX = e.touches ? e.touches[0].pageX : e.clientX;
      var clientY = e.touches ? e.touches[0].pageY : e.clientY;

      // Store the initial position of drag event relative to viewport
      self.touchData = {};
      self.touchData.touchstartClientX = clientX;
      self.touchData.touchstartClientY = clientY;
    });

    this.element.addEventListener('touchend', function (e) {
      var clientX = e.touches ? e.changedTouches[0].pageX : e.clientX;
      var clientY = e.touches ? e.changedTouches[0].pageY : e.clientY;

      var xVector = self.touchData.touchstartClientX - clientX;
      var yVector = self.touchData.touchstartClientY - clientY;
      var absXVector = Math.abs(xVector);
      var absYVector = Math.abs(yVector);

      // Must have moved more horizontally than vertically
      if(absXVector > absYVector && absXVector > minimumSwipeDistance) {
        var direction = xVector > 0 ? "left" : "right";
        direction === "left" ? self.nextSlide() : self.prevSlide();
      }
    });
  }

  BasicSlider.applyPrefixedStyle = function(element, style, value) {
    var getCSSPrefix = function(style, value) {
      return ' -webkit- -moz- -o- -ms-'.split(' ').map(function(prefix) { return prefix + style; });
    }
    var prefixes = getCSSPrefix(style, value);

    prefixes.forEach(function(prefix) {
      element.style[prefix] = value;
    });
  }

  BasicSlider.hasTransitions = function() {
    var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition'.split(' ');
    var div = document.createElement('div');
    for(var i = 0; i < prefixes.length; i++) {
      if(div && div.style[prefixes[i]] !== undefined) {
        return prefixes[i];
      }
    }
    return false;
  };

  var sliders = document.querySelectorAll('.js-slider');
  for (var i = 0; i < sliders.length; i++) {
    var jsSlider = new BasicSlider(sliders[i], {});
  }

  window.BasicSlider = BasicSlider;


})(window, document);
/*! H5F
* https://github.com/ryanseddon/H5F/
* Copyright (c) Ryan Seddon | Licensed MIT */
(function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof module&&module.exports?module.exports=t():e.H5F=t()})(this,function(){var e,t,a,i,n,r,l,s,o,u,d,c,v,p,f,m,b,h,g,y,w,C,N,A,E,$,x=document,k=x.createElement("input"),q=/^[a-zA-Z0-9.!#$%&'*+-\/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,M=/[a-z][\-\.+a-z]*:\/\//i,L=/^(input|select|textarea)$/i;return r=function(e,t){var a=!e.nodeType||!1,i={validClass:"valid",invalidClass:"error",requiredClass:"required",placeholderClass:"placeholder",onSubmit:Function.prototype,onInvalid:Function.prototype};if("object"==typeof t)for(var r in i)t[r]===void 0&&(t[r]=i[r]);if(n=t||i,a)for(var s=0,o=e.length;o>s;s++)l(e[s]);else l(e)},l=function(a){var i,r=a.elements,l=r.length,c=!!a.attributes.novalidate;if(g(a,"invalid",o,!0),g(a,"blur",o,!0),g(a,"input",o,!0),g(a,"keyup",o,!0),g(a,"focus",o,!0),g(a,"change",o,!0),g(a,"click",u,!0),g(a,"submit",function(i){return e=!0,t||c||a.checkValidity()?(n.onSubmit.call(a,i),void 0):(w(i),void 0)},!1),!v())for(a.checkValidity=function(){return d(a)};l--;)i=!!r[l].attributes.required,"fieldset"!==r[l].nodeName.toLowerCase()&&s(r[l])},s=function(e){var t=e,a=h(t),n={type:t.getAttribute("type"),pattern:t.getAttribute("pattern"),placeholder:t.getAttribute("placeholder")},r=/^(email|url)$/i,l=/^(input|keyup)$/i,s=r.test(n.type)?n.type:n.pattern?n.pattern:!1,o=p(t,s),u=m(t,"step"),v=m(t,"min"),b=m(t,"max"),g=!(""===t.validationMessage||void 0===t.validationMessage);t.checkValidity=function(){return d.call(this,t)},t.setCustomValidity=function(e){c.call(t,e)},t.validity={valueMissing:a,patternMismatch:o,rangeUnderflow:v,rangeOverflow:b,stepMismatch:u,customError:g,valid:!(a||o||u||v||b||g)},n.placeholder&&!l.test(i)&&f(t)},o=function(e){var t=C(e)||e,a=/^(input|keyup|focusin|focus|change)$/i,r=/^(submit|image|button|reset)$/i,l=/^(checkbox|radio)$/i,u=!0;!L.test(t.nodeName)||r.test(t.type)||r.test(t.nodeName)||(i=e.type,v()||s(t),t.validity.valid&&(""!==t.value||l.test(t.type))||t.value!==t.getAttribute("placeholder")&&t.validity.valid?(A(t,[n.invalidClass,n.requiredClass]),N(t,n.validClass)):a.test(i)?t.validity.valueMissing&&A(t,[n.requiredClass,n.invalidClass,n.validClass]):t.validity.valueMissing?(A(t,[n.invalidClass,n.validClass]),N(t,n.requiredClass)):t.validity.valid||(A(t,[n.validClass,n.requiredClass]),N(t,n.invalidClass)),"input"===i&&u&&(y(t.form,"keyup",o,!0),u=!1))},d=function(t){var a,i,r,l,s,u=!1;if("form"===t.nodeName.toLowerCase()){a=t.elements;for(var d=0,c=a.length;c>d;d++)i=a[d],r=!!i.attributes.disabled,l=!!i.attributes.required,s=!!i.attributes.pattern,"fieldset"!==i.nodeName.toLowerCase()&&!r&&(l||s&&l)&&(o(i),i.validity.valid||u||(e&&i.focus(),u=!0,n.onInvalid.call(t,i)));return!u}return o(t),t.validity.valid},c=function(e){var t=this;t.validationMessage=e},u=function(e){var a=C(e);a.attributes.formnovalidate&&"submit"===a.type&&(t=!0)},v=function(){return E(k,"validity")&&E(k,"checkValidity")},p=function(e,t){if("email"===t)return!q.test(e.value);if("url"===t)return!M.test(e.value);if(t){var i=e.getAttribute("placeholder"),n=e.value;return a=RegExp("^(?:"+t+")$"),n===i?!1:""===n?!1:!a.test(e.value)}return!1},f=function(e){var t={placeholder:e.getAttribute("placeholder")},a=/^(focus|focusin|submit)$/i,r=/^(input|textarea)$/i,l=/^password$/i,s=!!("placeholder"in k);s||!r.test(e.nodeName)||l.test(e.type)||(""!==e.value||a.test(i)?e.value===t.placeholder&&a.test(i)&&(e.value="",A(e,n.placeholderClass)):(e.value=t.placeholder,g(e.form,"submit",function(){i="submit",f(e)},!0),N(e,n.placeholderClass)))},m=function(e,t){var a=parseInt(e.getAttribute("min"),10)||0,i=parseInt(e.getAttribute("max"),10)||!1,n=parseInt(e.getAttribute("step"),10)||1,r=parseInt(e.value,10),l=(r-a)%n;return h(e)||isNaN(r)?"number"===e.getAttribute("type")?!0:!1:"step"===t?e.getAttribute("step")?0!==l:!1:"min"===t?e.getAttribute("min")?a>r:!1:"max"===t?e.getAttribute("max")?r>i:!1:void 0},b=function(e){var t=!!e.attributes.required;return t?h(e):!1},h=function(e){var t=e.getAttribute("placeholder"),a=/^(checkbox|radio)$/i,i=!!e.attributes.required;return!(!i||""!==e.value&&e.value!==t&&(!a.test(e.type)||$(e)))},g=function(e,t,a,i){E(window,"addEventListener")?e.addEventListener(t,a,i):E(window,"attachEvent")&&window.event!==void 0&&("blur"===t?t="focusout":"focus"===t&&(t="focusin"),e.attachEvent("on"+t,a))},y=function(e,t,a,i){E(window,"removeEventListener")?e.removeEventListener(t,a,i):E(window,"detachEvent")&&window.event!==void 0&&e.detachEvent("on"+t,a)},w=function(e){e=e||window.event,e.stopPropagation&&e.preventDefault?(e.stopPropagation(),e.preventDefault()):(e.cancelBubble=!0,e.returnValue=!1)},C=function(e){return e=e||window.event,e.target||e.srcElement},N=function(e,t){var a;e.className?(a=RegExp("(^|\\s)"+t+"(\\s|$)"),a.test(e.className)||(e.className+=" "+t)):e.className=t},A=function(e,t){var a,i,n="object"==typeof t?t.length:1,r=n;if(e.className)if(e.className===t)e.className="";else for(;n--;)a=RegExp("(^|\\s)"+(r>1?t[n]:t)+"(\\s|$)"),i=e.className.match(a),i&&3===i.length&&(e.className=e.className.replace(a,i[1]&&i[2]?" ":""))},E=function(e,t){var a=typeof e[t],i=RegExp("^function|object$","i");return!!(i.test(a)&&e[t]||"unknown"===a)},$=function(e){for(var t=document.getElementsByName(e.name),a=0;t.length>a;a++)if(t[a].checked)return!0;return!1},{setup:r}});/*!
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"use strict";"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var c=d.apply(u,n);o=void 0===o?c:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,c=0;u>c;c++){var l=h[c],f=r[l],m=parseFloat(f);a[l]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,z=d&&s,b=t(r.width);b!==!1&&(a.width=b+(z?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(z?0:g+E)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){"complete"==document.readyState?t():document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",c=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);c&&c.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t,t.EvEmitter,t.getSize))}(window,function(t,e,i){"use strict";function n(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function r(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,a="string"==typeof s.transition?"transition":"WebkitTransition",h="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[a],d=[h,a,a+"Duration",a+"Property"],c=o.prototype=Object.create(e.prototype);c.constructor=o,c._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},c.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.getSize=function(){this.size=i(this.element)},c.css=function(t){var e=this.element.style;for(var i in t){var n=d[i]||i;e[n]=t[i]}},c.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},c.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",c=this.position.y+t[h];e[u]=this.getYValue(c),e[d]="",this.css(e),this.emitEvent("layout",[this])},c.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},c.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},c._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},c.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},c.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},c.moveTo=c._transitionTo,c.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},c._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},c._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+r(d.transform||"transform");c.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:l,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(u,this,!1))},c.transition=o.prototype[a?"_transition":"_nonTransition"],c.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},c.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};c.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],n(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd){var o=e.onEnd[i];o.call(this),delete e.onEnd[i]}this.emitEvent("transitionEnd",[this])}},c.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},c._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var m={transitionProperty:"",transitionDuration:""};return c.removeTransitionStyles=function(){this.css(m)},c.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},c.remove=function(){return a&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},c.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},c.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},c.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},c.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},c.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},c.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++d;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var a=t.console,h=t.jQuery,u=function(){},d=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var l=r.prototype;return n.extend(l,e.prototype),l.option=function(t){n.extend(this.options,t)},l._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},l._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},l.reloadItems=function(){this.items=this._itemize(this.element.children)},l._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},l._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},l.getItemElements=function(){return this.items.map(function(t){return t.element})},l.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},l._init=l.layout,l._resetLayout=function(){this.getSize()},l.getSize=function(){this.size=i(this.element)},l._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},l.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},l._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},l._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},l._getItemLayoutPosition=function(){return{x:0,y:0}},l._processLayoutQueue=function(t){t.forEach(function(t){this._positionItem(t.item,t.x,t.y,t.isInstant)},this)},l._positionItem=function(t,e,i,n){n?t.goTo(e,i):t.moveTo(e,i)},l._postLayout=function(){this.resizeContainer()},l.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},l._getContainerSize=u,l._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},l._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},l.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h)if(this.$element=this.$element||h(this.element),e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},l.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},l.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},l.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},l.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},l._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},l._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},l._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},l._manageStamp=u,l._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},l.handleEvent=n.handleEvent,l.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},l.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},l.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),l.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},l.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},l.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},l.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},l.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},l.reveal=function(t){this._emitCompleteOnItems("reveal",t),t&&t.length&&t.forEach(function(t){t.reveal()})},l.hide=function(t){this._emitCompleteOnItems("hide",t),t&&t.length&&t.forEach(function(t){t.hide()})},l.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},l.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},l.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},l.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},l.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},l.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i},r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");return i.compatOptions.fitWidth="isFitWidth",i.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0},i.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},i.prototype.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},i.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this._getColGroup(n),r=Math.min.apply(Math,o),s=o.indexOf(r),a={x:this.columnWidth*s,y:r},h=r+t.size.outerHeight,u=this.cols+1-o.length,d=0;u>d;d++)this.colYs[s+d]=h;return a},i.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++){var o=this.colYs.slice(n,n+t);e[n]=Math.max.apply(Math,o)}return e},i.prototype._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,c=a;h>=c;c++)this.colYs[c]=Math.max(d,this.colYs[c])},i.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},i.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},i.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});
(function(window, document) {
  "use strict"

  var applyMenu = function() {
    var menuElement = document.querySelector('.main-menu');
    var menuButton = document.querySelector('.menu-btn');

    menuButton.addEventListener('click', function() {
      this.classList.toggle('is-active');
      menuElement.classList.toggle('is-active');
      menuElement.style.top = document.getElementById('header').clientHeight + "px";

      if(this.classList.contains('is-active')) {
        document.body.classList.add('prevent-scroll');
      } else {
        document.body.classList.remove('prevent-scroll')
      }
    });
  }

  applyMenu();

})(window, document);
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-shiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return w("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransitions=function(){return H("transition")};for(var I in q)A(q,I)&&(v=I.toLowerCase(),e[v]=q[I](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=x,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=w,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/* shifty - v1.5.2 - 2016-02-10 - http://jeremyckahn.github.io/shifty */
(function(){var a=this||Function("return this")(),b=function(){"use strict";function b(){}function c(a,b){var c;for(c in a)Object.hasOwnProperty.call(a,c)&&b(c)}function d(a,b){return c(b,function(c){a[c]=b[c]}),a}function e(a,b){c(b,function(c){"undefined"==typeof a[c]&&(a[c]=b[c])})}function f(a,b,c,d,e,f,h){var i,j,k,m=f>a?0:(a-f)/e;for(i in b)b.hasOwnProperty(i)&&(j=h[i],k="function"==typeof j?j:l[j],b[i]=g(c[i],d[i],k,m));return b}function g(a,b,c,d){return a+(b-a)*c(d)}function h(a,b){var d=k.prototype.filter,e=a._filterArgs;c(d,function(c){"undefined"!=typeof d[c][b]&&d[c][b].apply(a,e)})}function i(a,b,c,d,e,g,i,j,k,l,m){s=b+c+d,t=Math.min(m||r(),s),u=t>=s,v=d-(s-t),a.isPlaying()&&(u?(k(i,a._attachment,v),a.stop(!0)):(a._scheduleId=l(a._timeoutHandler,p),h(a,"beforeTween"),b+c>t?f(1,e,g,i,1,1,j):f(t,e,g,i,d,b+c,j),h(a,"afterTween"),k(e,a._attachment,v)))}function j(a,b){var d={},e=typeof b;return"string"===e||"function"===e?c(a,function(a){d[a]=b}):c(a,function(a){d[a]||(d[a]=b[a]||n)}),d}function k(a,b){this._currentState=a||{},this._configured=!1,this._scheduleFunction=m,"undefined"!=typeof b&&this.setConfig(b)}var l,m,n="linear",o=500,p=1e3/60,q=Date.now?Date.now:function(){return+new Date},r="undefined"!=typeof SHIFTY_DEBUG_NOW?SHIFTY_DEBUG_NOW:q;m="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var s,t,u,v;return k.prototype.tween=function(a){return this._isTweening?this:(void 0===a&&this._configured||this.setConfig(a),this._timestamp=r(),this._start(this.get(),this._attachment),this.resume())},k.prototype.setConfig=function(a){a=a||{},this._configured=!0,this._attachment=a.attachment,this._pausedAtTime=null,this._scheduleId=null,this._delay=a.delay||0,this._start=a.start||b,this._step=a.step||b,this._finish=a.finish||b,this._duration=a.duration||o,this._currentState=d({},a.from)||this.get(),this._originalState=this.get(),this._targetState=d({},a.to)||this.get();var c=this;this._timeoutHandler=function(){i(c,c._timestamp,c._delay,c._duration,c._currentState,c._originalState,c._targetState,c._easing,c._step,c._scheduleFunction)};var f=this._currentState,g=this._targetState;return e(g,f),this._easing=j(f,a.easing||n),this._filterArgs=[f,this._originalState,g,this._easing],h(this,"tweenCreated"),this},k.prototype.get=function(){return d({},this._currentState)},k.prototype.set=function(a){this._currentState=a},k.prototype.pause=function(){return this._pausedAtTime=r(),this._isPaused=!0,this},k.prototype.resume=function(){return this._isPaused&&(this._timestamp+=r()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0,this._timeoutHandler(),this},k.prototype.seek=function(a){a=Math.max(a,0);var b=r();return this._timestamp+a===0?this:(this._timestamp=b-a,this.isPlaying()||(this._isTweening=!0,this._isPaused=!1,i(this,this._timestamp,this._delay,this._duration,this._currentState,this._originalState,this._targetState,this._easing,this._step,this._scheduleFunction,b),this.pause()),this)},k.prototype.stop=function(c){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=b,(a.cancelAnimationFrame||a.webkitCancelAnimationFrame||a.oCancelAnimationFrame||a.msCancelAnimationFrame||a.mozCancelRequestAnimationFrame||a.clearTimeout)(this._scheduleId),c&&(h(this,"beforeTween"),f(1,this._currentState,this._originalState,this._targetState,1,0,this._easing),h(this,"afterTween"),h(this,"afterTweenEnd"),this._finish.call(this,this._currentState,this._attachment)),this},k.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},k.prototype.setScheduleFunction=function(a){this._scheduleFunction=a},k.prototype.dispose=function(){var a;for(a in this)this.hasOwnProperty(a)&&delete this[a]},k.prototype.filter={},k.prototype.formula={linear:function(a){return a}},l=k.prototype.formula,d(k,{now:r,each:c,tweenProps:f,tweenProp:g,applyFilter:h,shallowCopy:d,defaults:e,composeEasingObject:j}),"function"==typeof SHIFTY_DEBUG_NOW&&(a.timeoutHandler=i),"object"==typeof exports?module.exports=k:"function"==typeof define&&define.amd?define(function(){return k}):"undefined"==typeof a.Tweenable&&(a.Tweenable=k),k}();!function(){b.shallowCopy(b.prototype.formula,{easeInQuad:function(a){return Math.pow(a,2)},easeOutQuad:function(a){return-(Math.pow(a-1,2)-1)},easeInOutQuad:function(a){return(a/=.5)<1?.5*Math.pow(a,2):-.5*((a-=2)*a-2)},easeInCubic:function(a){return Math.pow(a,3)},easeOutCubic:function(a){return Math.pow(a-1,3)+1},easeInOutCubic:function(a){return(a/=.5)<1?.5*Math.pow(a,3):.5*(Math.pow(a-2,3)+2)},easeInQuart:function(a){return Math.pow(a,4)},easeOutQuart:function(a){return-(Math.pow(a-1,4)-1)},easeInOutQuart:function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},easeInQuint:function(a){return Math.pow(a,5)},easeOutQuint:function(a){return Math.pow(a-1,5)+1},easeInOutQuint:function(a){return(a/=.5)<1?.5*Math.pow(a,5):.5*(Math.pow(a-2,5)+2)},easeInSine:function(a){return-Math.cos(a*(Math.PI/2))+1},easeOutSine:function(a){return Math.sin(a*(Math.PI/2))},easeInOutSine:function(a){return-.5*(Math.cos(Math.PI*a)-1)},easeInExpo:function(a){return 0===a?0:Math.pow(2,10*(a-1))},easeOutExpo:function(a){return 1===a?1:-Math.pow(2,-10*a)+1},easeInOutExpo:function(a){return 0===a?0:1===a?1:(a/=.5)<1?.5*Math.pow(2,10*(a-1)):.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},easeOutCirc:function(a){return Math.sqrt(1-Math.pow(a-1,2))},easeInOutCirc:function(a){return(a/=.5)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},easeOutBounce:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},easeInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},easeOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},easeInOutBack:function(a){var b=1.70158;return(a/=.5)<1?.5*(a*a*(((b*=1.525)+1)*a-b)):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},elastic:function(a){return-1*Math.pow(4,-8*a)*Math.sin((6*a-1)*(2*Math.PI)/2)+1},swingFromTo:function(a){var b=1.70158;return(a/=.5)<1?.5*(a*a*(((b*=1.525)+1)*a-b)):.5*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},swingFrom:function(a){var b=1.70158;return a*a*((b+1)*a-b)},swingTo:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},bounce:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},bouncePast:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?2-(7.5625*(a-=1.5/2.75)*a+.75):2.5/2.75>a?2-(7.5625*(a-=2.25/2.75)*a+.9375):2-(7.5625*(a-=2.625/2.75)*a+.984375)},easeFromTo:function(a){return(a/=.5)<1?.5*Math.pow(a,4):-.5*((a-=2)*Math.pow(a,3)-2)},easeFrom:function(a){return Math.pow(a,4)},easeTo:function(a){return Math.pow(a,.25)}})}(),function(){function a(a,b,c,d,e,f){function g(a){return((n*a+o)*a+p)*a}function h(a){return((q*a+r)*a+s)*a}function i(a){return(3*n*a+2*o)*a+p}function j(a){return 1/(200*a)}function k(a,b){return h(m(a,b))}function l(a){return a>=0?a:0-a}function m(a,b){var c,d,e,f,h,j;for(e=a,j=0;8>j;j++){if(f=g(e)-a,l(f)<b)return e;if(h=i(e),l(h)<1e-6)break;e-=f/h}if(c=0,d=1,e=a,c>e)return c;if(e>d)return d;for(;d>c;){if(f=g(e),l(f-a)<b)return e;a>f?c=e:d=e,e=.5*(d-c)+c}return e}var n=0,o=0,p=0,q=0,r=0,s=0;return p=3*b,o=3*(d-b)-p,n=1-p-o,s=3*c,r=3*(e-c)-s,q=1-s-r,k(a,j(f))}function c(b,c,d,e){return function(f){return a(f,b,c,d,e,1)}}b.setBezierFunction=function(a,d,e,f,g){var h=c(d,e,f,g);return h.displayName=a,h.x1=d,h.y1=e,h.x2=f,h.y2=g,b.prototype.formula[a]=h},b.unsetBezierFunction=function(a){delete b.prototype.formula[a]}}(),function(){function a(a,c,d,e,f,g){return b.tweenProps(e,c,a,d,1,g,f)}var c=new b;c._filterArgs=[],b.interpolate=function(d,e,f,g,h){var i=b.shallowCopy({},d),j=h||0,k=b.composeEasingObject(d,g||"linear");c.set({});var l=c._filterArgs;l.length=0,l[0]=i,l[1]=d,l[2]=e,l[3]=k,b.applyFilter(c,"tweenCreated"),b.applyFilter(c,"beforeTween");var m=a(d,i,e,f,k,j);return b.applyFilter(c,"afterTween"),m}}(),function(a){function b(a,b){var c,d=[],e=a.length;for(c=0;e>c;c++)d.push("_"+b+"_"+c);return d}function c(a){var b=a.match(v);return b?(1===b.length||a[0].match(u))&&b.unshift(""):b=["",""],b.join(A)}function d(b){a.each(b,function(a){var c=b[a];"string"==typeof c&&c.match(z)&&(b[a]=e(c))})}function e(a){return i(z,a,f)}function f(a){var b=g(a);return"rgb("+b[0]+","+b[1]+","+b[2]+")"}function g(a){return a=a.replace(/#/,""),3===a.length&&(a=a.split(""),a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),B[0]=h(a.substr(0,2)),B[1]=h(a.substr(2,2)),B[2]=h(a.substr(4,2)),B}function h(a){return parseInt(a,16)}function i(a,b,c){var d=b.match(a),e=b.replace(a,A);if(d)for(var f,g=d.length,h=0;g>h;h++)f=d.shift(),e=e.replace(A,c(f));return e}function j(a){return i(x,a,k)}function k(a){for(var b=a.match(w),c=b.length,d=a.match(y)[0],e=0;c>e;e++)d+=parseInt(b[e],10)+",";return d=d.slice(0,-1)+")"}function l(d){var e={};return a.each(d,function(a){var f=d[a];if("string"==typeof f){var g=r(f);e[a]={formatString:c(f),chunkNames:b(g,a)}}}),e}function m(b,c){a.each(c,function(a){for(var d=b[a],e=r(d),f=e.length,g=0;f>g;g++)b[c[a].chunkNames[g]]=+e[g];delete b[a]})}function n(b,c){a.each(c,function(a){var d=b[a],e=o(b,c[a].chunkNames),f=p(e,c[a].chunkNames);d=q(c[a].formatString,f),b[a]=j(d)})}function o(a,b){for(var c,d={},e=b.length,f=0;e>f;f++)c=b[f],d[c]=a[c],delete a[c];return d}function p(a,b){C.length=0;for(var c=b.length,d=0;c>d;d++)C.push(a[b[d]]);return C}function q(a,b){for(var c=a,d=b.length,e=0;d>e;e++)c=c.replace(A,+b[e].toFixed(4));return c}function r(a){return a.match(w)}function s(b,c){a.each(c,function(a){var d,e=c[a],f=e.chunkNames,g=f.length,h=b[a];if("string"==typeof h){var i=h.split(" "),j=i[i.length-1];for(d=0;g>d;d++)b[f[d]]=i[d]||j}else for(d=0;g>d;d++)b[f[d]]=h;delete b[a]})}function t(b,c){a.each(c,function(a){var d=c[a],e=d.chunkNames,f=e.length,g=b[e[0]],h=typeof g;if("string"===h){for(var i="",j=0;f>j;j++)i+=" "+b[e[j]],delete b[e[j]];b[a]=i.substr(1)}else b[a]=g})}var u=/(\d|\-|\.)/,v=/([^\-0-9\.]+)/g,w=/[0-9.\-]+/g,x=new RegExp("rgb\\("+w.source+/,\s*/.source+w.source+/,\s*/.source+w.source+"\\)","g"),y=/^.*\(/,z=/#([0-9]|[a-f]){3,6}/gi,A="VAL",B=[],C=[];a.prototype.filter.token={tweenCreated:function(a,b,c,e){d(a),d(b),d(c),this._tokenData=l(a)},beforeTween:function(a,b,c,d){s(d,this._tokenData),m(a,this._tokenData),m(b,this._tokenData),m(c,this._tokenData)},afterTween:function(a,b,c,d){n(a,this._tokenData),n(b,this._tokenData),n(c,this._tokenData),t(d,this._tokenData)}}}(b)}).call(null);/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
(function(){
  'use strict';
  (function(window){
    /**
     * Represents a bunch of tabs, and some buttons
     *
     * @class Tabber
     * @param {object} el - The element containing some tabs
     * @param {function} [onChange] - on change callback function
     */
    var Tabber = function(el, onChange){
      this.el = el;
      this.el.tabber = this;
      this.onChange = onChange || function(){};

      this._bindEvents();
    };

    /** @memberof Tabber */
    Tabber.prototype = {
      navAccessor: function() {
        return this.el.querySelector('.tab-nav');
      },

      navItemAccessor: function() {
        return this.navAccessor().querySelectorAll('.tab-button');
      },

      tabsAccessor: function() {
        return this.el.querySelectorAll('.tab');
      },

      /**
       * bind events
       * @private
       */
      _bindEvents: function(){
        var that = this;

        this.el.addEventListener('click', function(e){
          var target = e.target;

          if(target.classList.contains('tab-button')){
            that._tabButtonClicked(target);
          } else {
            var tabButton = Utils.find(target, '.tab-button');
            if(tabButton) that._tabButtonClicked(tabButton);
          }
        });
      },

      /**
       * show selected tab only
       * @private
       * @param {object} el - tab nav button
       */
      _tabButtonClicked: function(el){
        // work out which tab?
        var tabId = (el.getAttribute('data-index') * 1);
        var tab = this.tabsAccessor()[tabId - 1];
        var oldTabId = this.getCurrentTab().id;

        // hide all the tabs
        this._iterateTabs(function(tab){
          tab.classList.remove('is-active');
        });

        // hide all the nav items
        this._iterateNavItems(function(navItem){
          navItem.classList.remove('is-active');
        });

        // show selected tab
        tab.classList.add('is-active');

        // show selected nav item
        el.classList.add('is-active');

        // onChange callback
        if(tabId !== oldTabId){
          this.onChange(this);
        }
      },

      /**
       * itterate nav
       * @private
       * @param {function} fn - callback
       */
      _iterateNavItems: function(fn){
        for(var i = 0, nav = this.navItemAccessor(); i < nav.length; i++){
          var navItem = nav[i];
          fn.call(this, navItem, i);
        }
      },

      /**
       * itterate tabs
       * @private
       * @param {function} fn - callback
       */
      _iterateTabs: function(fn){
        for(var i = 0, tabs = this.tabsAccessor(); i < tabs.length; i++){
          var tab = tabs[i];
          fn.call(this, tab, i);
        }
      },

      /**
       * get active tab el
       * @returns {object} active tab and id
       */
      getCurrentTab: function(){
        var active = null;

        this._iterateTabs(function(tab, i){
          if(tab.classList.contains('is-active')){
            active = {id: i+1, tab: tab};
          }
        });

        return active;
      }
    };

    /**
     * create one or more tabber instances
     *
     * @memberof Tabber
     * @param {nodelist | object} el - either a dom object or NodeList
     * @param {function} fn - on change callback
     * @returns {object | array} tabber instance, or array of tabber instances
     */
    Tabber.init = function(el, fn){
      if(el instanceof NodeList){
        var tabbers = []

        for(var i = 0; i < el.length; i++){
          tabbers.push(new Tabber(el[i], fn));
        }

        return tabbers;
      }else{
        return new Tabber(el, fn);
      }
    };

    // expose Tabber
    var define = window.define || null;

    if(typeof define === 'function' && define.amd){
      define('tabber', [], function(){return Tabber;}); // amd
    }else{
      window.Tabber = Tabber;
    }

    [].forEach.call(document.querySelectorAll('.js-tabs'), function(tabsElement) {
      new Tabber(tabsElement);
    });
  })(window);
}).call(this);

/**
*	Common: Account.
*/
(function() {

	if (document.body.classList.contains('body_pages_account'))
	{
		var togglers = document.querySelectorAll('.toggler');
		
		[].forEach.call(togglers, function(toggler)
		{
			var dataContent = toggler.getAttribute('data-content');
			var content = document.getElementById(dataContent);
			var wrapper = document.querySelector('.account-section-content');
			
			toggler.addEventListener('mouseenter', function()
			{
				wrapper.classList.add('is-active');
				content.classList.add('is-active');
			});
			
			toggler.addEventListener('mouseleave', function()
			{
				wrapper.classList.remove('is-active');
				content.classList.remove('is-active');
			});
		});
	}

})();/**
*	Common: Addresses.
*/
(function(document) {

	[].forEach.call(document.querySelectorAll('.address-value'), function(label)
	{
		label.addEventListener('click', function()
		{
			document.getElementById(this.getAttribute('data-for')).checked = true;
		})
	});
  
})(document);
/**
*	Common: Audio.
*/
(function(document) {

	function common_audio_stop()
	{
		var buttons_playing = document.querySelectorAll('.common_audio_button.common_audio_button_playing');
		for (var i = 0; i < buttons_playing.length; i++)
		{
			buttons_playing[i].classList.remove('common_audio_button_playing');
		}
		if (window.common_audio_player && window.common_audio_player.playing)
		{
			window.common_audio_player.stop();
		}
	}
	
	var buttons_all = document.querySelectorAll('.common_audio_button');
	for (var i = 0; i < buttons_all.length; i++)
	{
		buttons_all[i].addEventListener('click', function()
		{
			if (!this.classList.contains('common_audio_button_playing'))
			{
				common_audio_stop();
				var audioSrc = this.getAttribute('data-audio-src');
				if (!window.common_audio_player)
				{
					window.common_audio_player = document.createElement('audio');
					window.common_audio_player.addEventListener('ended', function()
					{
						common_audio_stop();
					})
				}
				window.common_audio_player.src = audioSrc;
				window.common_audio_player.play();
			}
			else
			{
				window.common_audio_player.pause();
			}
			this.classList.toggle('common_audio_button_playing');
		});
	}

})(document);
/**
*	Common: Collapsible.
*/
(function(document) {

	var collapsibles = document.querySelectorAll('.common_collapsible');
	for (var i = 0; i < collapsibles.length; i++)
	{
		var collapsible = collapsibles[i];
		
		var heading = collapsible.querySelector('.common_collapsible_heading');
		heading.collapsible = collapsible;
		
		var inner = collapsible.querySelector('.common_collapsible_section');
		inner.collapsible = collapsible;

		var type = 'normal';		
		if (collapsible.tagName === 'TABLE')
			type = 'table';
		if (collapsible.classList.contains('box'))
			type = 'box';
		
		if (heading && inner)
		{
			var openIcon = document.createElement('div');
			switch (type)
			{
				// Note that the first two cases below were never used as the break statements were left out.
				//case "normal": openIcon.className = 'common_collapsible_toggle common_collapsible_open fa fa-plus-square';
				//case "table": openIcon.className = 'common_collapsible_toggle common_collapsible_open fa fa-plus';
				case "normal": openIcon.className = 'common_collapsible_toggle common_collapsible_open fa fa-chevron-down';
				case "table": openIcon.className = 'common_collapsible_toggle common_collapsible_open fa fa-chevron-down';
				case "box": openIcon.className = 'common_collapsible_toggle common_collapsible_open fa fa-chevron-down';
			}
		
			var closedIcon = document.createElement('div');
			switch (type)
			{
				// Note that the first two cases below were never used as the break statements were left out.
				//case "normal": closedIcon.className = 'common_collapsible_toggle common_collapsible_closed fa fa-minus-square';
				//case "table": closedIcon.className = 'common_collapsible_toggle common_collapsible_closed fa fa-minus';
				case "normal": closedIcon.className = 'common_collapsible_toggle common_collapsible_closed fa fa-chevron-up';
				case "table": closedIcon.className = 'common_collapsible_toggle common_collapsible_closed fa fa-chevron-up';
				case "box": closedIcon.className = 'common_collapsible_toggle common_collapsible_closed fa fa-chevron-up';
			}
		
			var disabledIcon = document.createElement('div');
			switch (type)
			{
				case "normal": disabledIcon.className = 'common_collapsible_toggle common_collapsible_notoggle common_collapsible_disabled fa';
				case "table": disabledIcon.className = 'common_collapsible_toggle common_collapsible_notoggle common_collapsible_disabled fa';
				case "box": disabledIcon.className = 'common_collapsible_toggle common_collapsible_notoggle common_collapsible_disabled fa';
			}
		
			if (heading.children[0])
			{
				heading.insertBefore(disabledIcon, heading.children[0]);
				heading.insertBefore(closedIcon, heading.children[0]);
				heading.insertBefore(openIcon, heading.children[0]);
			}
			else
			{
				heading.appendChild(disabledIcon);
				heading.appendChild(closedIcon);
				heading.appendChild(openIcon);
			}
			
			heading.addEventListener('click', function()
			{
				if (!this.collapsible.classList.contains('always-open'))
					this.collapsible.classList.toggle('is-active');
			});
		}
	}

})(document);
/**
*	Common: Carousel.
*/
(function(document) {

	var carousels = document.querySelectorAll('.common_carousel');
	if (!carousels.length)
		return;
	
	function common_carousel_show_hide_arrows(carousel)
	{
		if (carousel.scroll.scrollLeft === 0)
			carousel.left.classList.remove('is-active');
		else
			carousel.left.classList.add('is-active');
		if (carousel.scroll.scrollLeft === carousel.scroll.scrollWidth - carousel.scroll.clientWidth)
			carousel.right.classList.remove('is-active');
		else
			carousel.right.classList.add('is-active');
	}
	
	function common_carousel_scroll_to(carousel, to)
	{
		var tweenable = new Tweenable();
		tweenable.tween({
			from: { scrollLeft: carousel.scroll.scrollLeft },
			to:   { scrollLeft: to },
			duration: 500,
			easing: 'easeOutQuart',
			step: function (state) {
				carousel.scroll.scrollLeft = state.scrollLeft;
			}
		});
	}
	
	function common_carousel_is_single_scroll(carousel)
	{
		var nItems = carousel.scroll.children.length
		if (nItems.length === 0)
			return false;
		var itemWidth = carousel.scroll.children[0].clientWidth;
		var carouselWidth = carousel.scroll.clientWidth;
		if (itemWidth * nItems > carouselWidth * 2 + nItems)
			return true;
		return false;
	}
	
	window.addEventListener('load', function() {
		for (var i = 0; i < carousels.length; i++)
		{
			var carousel = carousels[i];
			carousel.scroll = carousel.querySelector('.common_carousel_scroll');
			carousel.scroll.carousel = carousel;
			carousel.left = carousel.querySelector('.common_carousel_left');
			carousel.left.carousel = carousel;
			carousel.right = carousel.querySelector('.common_carousel_right');
			carousel.right.carousel = carousel;
			common_carousel_show_hide_arrows(carousel);
			carousel.scroll.addEventListener('scroll', function() { common_carousel_show_hide_arrows(this.carousel); });
			carousel.left.addEventListener('click', function()
			{
				var scrollLeft = 0;
				if (common_carousel_is_single_scroll(this.carousel))
				{
					var items = this.carousel.scroll.children;
					for (var i = 0; i < items.length; i++)
					{
						if (items[i].offsetLeft < this.carousel.scroll.scrollLeft)
							var nextItem = items[i];
					}
					scrollLeft = Math.max(0, nextItem.offsetLeft);
				}
				common_carousel_scroll_to(this.carousel, scrollLeft);
			});
			carousel.right.addEventListener('click', function()
			{
				var scrollEnd = this.carousel.scroll.scrollWidth - this.carousel.scroll.clientWidth;
				var scrollRight = scrollEnd;
				if (common_carousel_is_single_scroll(this.carousel))
				{
					var items = this.carousel.scroll.children;
					for (var i = 0; i < items.length; i++)
					{
						if (items[i].offsetLeft > this.carousel.scroll.scrollLeft)
						{
							var nextItem = items[i];
							break;
						}
					}
					var scrollRight = Math.min(scrollEnd, nextItem.offsetLeft)
				}
				common_carousel_scroll_to(this.carousel, scrollRight);
			});
		}
	});

})(document);
/**
*	Common: Filters.
*/
(function(window, document) {

	"use strict";
	
	var filterBtn = document.querySelector('.js-search-filters-btn');
	if (!filterBtn)
		return;

	var filterMenu = document.querySelector('.js-search-filters');
	var filterCloseBtn = filterMenu.querySelector('.js-search-filters-close-btn');
	var menuButton = document.querySelector('.menu-btn');
	
	filterBtn.addEventListener('click', function()
	{
		filterMenu.style.top = document.getElementById('header').clientHeight + "px";
		filterMenu.classList.add('is-active');
		document.body.classList.add('prevent-scroll')
	});
	
	filterCloseBtn.addEventListener('click', function()
	{
		filterMenu.classList.remove('is-active');
		document.body.classList.remove('prevent-scroll')
	});
	
	menuButton.addEventListener('click', function()
	{
		if (menuButton.classList.contains('is-active'))
			filterMenu.classList.remove('is-active');
	});

})(window, document);
/**
*	Common: Fixable.
*/
(function(document) {

	var fixables = document.querySelectorAll('.common_fixable');
	if(!fixables.length)
		return;
	
	function common_fixable_resize()
	{
		for (var i = 0; i < fixables.length; i++)
		{
			var fixable = fixables[i];
			var fixableHide = fixable.querySelector('.common_fixable_hide');
			if (fixableHide)
				fixable.hideY = Utils.totalOffsetTop(fixableHide) + fixableHide.clientHeight;
		}
	}
	window.addEventListener('load', common_fixable_resize);
	
	function common_fixable_apply()
	{
		for (var i = 0; i < fixables.length; i++)
		{
			var fixable = fixables[i];
			
			if (window.pageYOffset >= fixable.hideY && !fixable.isFixed)
			{
				var fixableHide = fixable.querySelector('.common_fixable_hide');
				fixable.isFixed = true;
				fixable.classList.add('is-fixed');
				fixableHide.style.maxHeight = '0';
				fixableHide.style.overflow = 'hidden';
			}
			else if (window.pageYOffset < fixable.hideY && fixable.isFixed)
			{
				var fixableHide = fixable.querySelector('.common_fixable_hide');
				fixable.isFixed = false;
				fixable.classList.remove('is-fixed');
				fixableHide.style.maxHeight = 'none';
				fixableHide.style.overflow = 'visible';
			}
		}
	}
	window.addEventListener('load', common_fixable_apply);
	window.addEventListener('scroll', common_fixable_apply);

})(document);
/**
*	Common: Forms.
*/
(function(document) {

	var forms = document.querySelectorAll('.form');
	[].forEach.call(forms, function(form)
	{
		H5F.setup(form, {
			validClass: "valid",
			invalidClass: "invalid",
			requiredClass: "required"
		});
		
		function formSubmit(e)
		{
			['.js-confirm-email', '.js-confirm-password'].forEach(function(selector)
			{
				var confirms = form.querySelectorAll(selector);
				if (confirms.length > 1)
				{
					if(confirms[0].value.trim() !== confirms[1].value.trim())
						confirms[1].setCustomValidity('Confirmation must match');
					else
						confirms[1].setCustomValidity('');
				}
			});
		}
		
		var submit_input = form.querySelector('input[type="submit"]');
		if (submit_input)
			submit_input.addEventListener('click', formSubmit);
			
		var submit_button = form.querySelector('button');
		if (submit_button)
			submit_button.addEventListener('click', formSubmit);
		
		var focusableInputs = form.querySelectorAll('\
		input[type="text"],\
		input[type="email"],\
		input[type="password"],\
		input[type="number"],\
		select,\
		textarea\
		');
		
		[].forEach.call(focusableInputs, function(input)
		{
			var label = document.querySelector('label[for="' + input.id + '"]');
			if (label)
			{
				input.addEventListener('focus', function()
				{
					label.classList.add('is-active');
				});
				
				input.addEventListener('blur', function()
				{
					label.classList.remove('is-active');
				});
			}
		});
	});
	
	[].forEach.call(document.querySelectorAll('input[type="submit"][form], button[form]'), function(button)
	{
		button.addEventListener('click', function(e)
		{
			e.preventDefault();
			var targetForm = document.getElementById(this.getAttribute('form'));
			var targetSubmit = targetForm.querySelector('input[type="submit"], button[type="submit"]');
			if(targetSubmit)
				targetSubmit.click();
			else
				targetForm.submit();
		});
	});

})(document);
/**
*	Common: Inspiration.
*/
(function(window) {

	window.addEventListener('load', function()
	{
		var carousel = document.querySelector('.carousel-container');
		if (!carousel)
			return;
		
		var leftButton = document.querySelector('.left-button');
		var rightButton = document.querySelector('.right-button');
		var currentPos = carousel.scrollLeft;
		var slides = document.querySelectorAll('.slide').length;
		var slideNumber = 1;
		
		common_inspiration_show_hide_buttons();
		
		leftButton.addEventListener('click', function()
		{
			if (slideNumber > 1)
			{			
				var to = currentPos - window.innerWidth;
				common_inspiration_scroll(to);
				currentPos = to;
				slideNumber--;
			}
			common_inspiration_show_hide_buttons();
			common_inspiration_add_active_class(slideNumber);
		});
		
		rightButton.addEventListener('click', function()
		{
			if (slideNumber < slides)
			{
				var to = currentPos + window.innerWidth;
				common_inspiration_scroll(to);
				currentPos = to;
				slideNumber++;
			}
		
			common_inspiration_show_hide_buttons();
			common_inspiration_add_active_class(slideNumber);
		});
		
		function common_inspiration_show_hide_buttons()
		{
			if (slideNumber === 1)
				leftButton.classList.add('hide');
			else
				leftButton.classList.remove('hide');

			if (slideNumber === slides)
				rightButton.classList.add('hide');
			else
				rightButton.classList.remove('hide');
		}
		
		function common_inspiration_add_active_class(slideNumber)
		{
			var slideEls = carousel.querySelectorAll('.slide');
			var currentSlide = slideEls[slideNumber-1];
			[].forEach.call(slideEls, function(el)
			{
				el.classList.remove('is-active');
			});
			currentSlide.classList.add('is-active');
		}
		
		function common_inspiration_scroll(to)
		{
			var tweenable = new Tweenable();
			tweenable.tween({
				from: { scrollLeft: carousel.scrollLeft },
				to:   { scrollLeft: to },
				duration: 500,
				easing: 'easeOutQuart',
				step: function (state) { carousel.scrollLeft = state.scrollLeft; }
			});
		}
	})

})(window);
/**
*	Common: Inspiration Slider.
*/
$(document).on('ready', function() {

	$(".inspiration-slider").slick({
		dots: false,
		arrows: false,
		infinite: true,
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		focusOnSelect: true
	});

});
/**
*	Common: Quantities.
*/
(function() {

	"use strict";
	
	var Quantities =
	{
		addWrappers: function(qtys)
		{
			[].forEach.call(qtys, function(qty){
			// create wrapper container
			var wrapper = document.createElement('div');
			wrapper.classList.add('js-qty-wrapper');
			wrapper.classList.add('styled-qty');
			
			// insert wrapper before el in the DOM tree
			qty.parentNode.insertBefore(wrapper, qty);
			
			// move el into wrapper
			wrapper.appendChild(qty);
			});
		},
		
		addButtons: function()
		{
			var wrappers = document.querySelectorAll('.js-qty-wrapper');
			var that = this;
			
			[].forEach.call(wrappers, function(wrapper){
			
			var input = wrapper.querySelector('.js-qty');
			
			var buttonMinus = document.createElement('BUTTON');
			var buttonAdd = document.createElement('BUTTON');
			
			buttonMinus.className = 'js-qty-btn js-min-button';
			if (input.hasAttribute("readonly"))
				buttonMinus.className = 'js-qty-btn js-min-button js-qty-readonly';
			buttonMinus.innerHTML = "-";
			buttonAdd.className = 'js-qty-btn js-add-button';
			if (input.hasAttribute("readonly"))
				buttonAdd.className = 'js-qty-btn js-add-button js-qty-readonly';
			buttonAdd.innerHTML = "+";
			
			wrapper.parentNode.insertBefore(buttonMinus, wrapper);
			wrapper.parentNode.insertBefore(buttonAdd, wrapper);
			
			wrapper.appendChild(buttonAdd);
			wrapper.appendChild(buttonMinus);
			
			// trigger buttons
			that.decreaseValue(buttonMinus);
			that.increaseValue(buttonAdd);
			});
		},
		
		decreaseValue: function(buttonMinus)
		{
			var input = buttonMinus.parentNode.querySelector('.js-qty');
			
			buttonMinus.addEventListener('click', function(e){
			if (!input.onchange)
				e.preventDefault();
			if(input.value > 0 && !input.hasAttribute("readonly")) {
			input.value--;
			}
			});
		},
		
		increaseValue: function(buttonAdd)
		{
			var input = buttonAdd.parentNode.querySelector('.js-qty');
			
			buttonAdd.addEventListener('click', function(e){
			if (!input.onchange)
				e.preventDefault();
			if(!input.hasAttribute("readonly")) {
			input.value++;
			}
			});
		},
		
		qtyAttrs: function(qtys)
		{
			[].forEach.call(qtys, function(qty){
			//qty.setAttribute('min', '1');
			qty.setAttribute('placeholder', '0');
			});
		},
		
		init: function()
		{
			var qtys = document.querySelectorAll('.js-qty');
			
			this.addWrappers(qtys);
			this.addButtons();
			this.qtyAttrs(qtys);
		}
	};
	
	Quantities.init();

})();
/**
* 	Common: Review Stars.
*/
(function(document) {

	function setRating(rating)
	{
		document.querySelector('.common_reviewstars_rating').value = rating;
	}
	
	var starsElement = document.querySelector('.common_reviewstars_stars.interactive');
	if (!starsElement)
		return;
		
	var stars = starsElement.querySelectorAll('.common_reviewstars_star');
	
	for (var i = 0; i < stars.length; i++)
	{
		stars[i].addEventListener('mouseover', function(e)
		{
			starsElement.classList.add('common_reviewstars_is_being_rated');
		});
		
		stars[i].addEventListener('mouseout', function(e)
		{
			starsElement.classList.remove('common_reviewstars_is_being_rated');
		});
		
		stars[i].addEventListener('click', function(e)
		{
			var rating = parseInt(this.getAttribute('data-index')) + 1;
			starsElement.classList.add('common_reviewstars_is_rated');
			starsElement.classList.remove('common_reviewstars_is_being_rated');
			for (var j = 0; j < stars.length; j++)
			{
				if (j < rating)
					starsElement.children[j].classList.add('is-active');
				else
					starsElement.children[j].classList.remove('is-active');
			}
			setRating(rating);
		});
	}

})(document);
/**
*	Common: Sticky (positions fixed elements when scrolled past).
*/
(function(document) {

	var stickyElements = document.querySelectorAll('.common_sticky');
	if (!stickyElements.length)
		return;
	
	var header = document.querySelector('#header .header-main');
	var footer = document.getElementById('footer');
	var elementMargin;
	var headerPadding = 28;
	var footerPadding = 143;
	
	function common_stick_set_positions()
	{
		for (var i = 0; i < stickyElements.length; i++)
		{
			var element = stickyElements[i];
			element.classList.remove('is-fixed');
			var style = window.getComputedStyle(element);
			element.headerPadding = element.hasAttribute('data-header-padding') ? parseInt(element.getAttribute('data-header-padding')) : headerPadding;
			element.footerPadding = element.hasAttribute('data-footer-padding') ? parseInt(element.getAttribute('data-footer-padding')) : footerPadding;
			element.height = parseInt(style.height);
			element.marginTop = parseInt(style.marginTop);
			element.headerBottom = header.clientHeight + element.headerPadding;
			element.footerTop = document.body.clientHeight - (footer.clientHeight + element.footerPadding);
			element.startTop = Utils.totalOffsetTop(element);
		}
	}
	window.addEventListener('load', common_stick_set_positions);
	window.addEventListener('resize', common_stick_set_positions);
	
	function common_sticky_scroll()
	{
		for (var i = 0; i < stickyElements.length; i++)
		{
			var element = stickyElements[i];
			if (element.startTop < window.pageYOffset + element.headerBottom)
			{
				if (element.headerBottom + element.height + window.pageYOffset > element.footerTop)
				{
					element.classList.remove('is-fixed');
					element.style.top = 'calc(100% - ' + (element.height + element.marginTop + element.footerPadding) + 'px)';
				}
				else
				{
					element.classList.add('is-fixed');
					element.style.top = (element.headerBottom - element.marginTop) + 'px';
				}
			}
			else
			{
				element.classList.remove('is-fixed');
				element.style.top = '0px';
			}
		}
	}
	window.addEventListener('load', common_sticky_scroll);
	window.addEventListener('scroll', common_sticky_scroll);
	window.addEventListener('resize', common_sticky_scroll);

})(document);
/**
*	Common: Toggle.
*/
(function(document) {

	var toggles_active = document.querySelectorAll('.common_toggle_active');
	for (var i = 0; i < toggles_active.length; i++)
	{
		toggles_active[i].addEventListener('click', function()
		{
			var zone = document.querySelector(this.getAttribute('data-toggle'));
			if (zone) zone.classList.toggle('is-active');
		});
	}
	
	var toggles_share = document.querySelectorAll('.common_toggle_share');
	for (var i = 0; i < toggles_share.length; i++)
	{
		toggles_share[i].addEventListener('click', function()
		{
			var zone = Utils.find(this, '.common_toggle_share_zone')
			if (zone) zone.classList.toggle('common_toggle_share_mode');
		});
	}

})(document);
/**
*	Layout: Basket Panel.
*/
(function() {

	"use strict";
	
	var layout_basketpanel_panel = document.getElementById('basket-panel');
	var layout_basketpanel_prevent_scrolling = false;
	
	if (!document.body.classList.contains('body_page_basket_view'))
	{
		document.getElementById('basket-item').addEventListener('mouseover', function()
		{
			layout_basketpanel_panel.classList.add('is-active');
			if (layout_basketpanel_prevent_scrolling)
				document.body.style.overflow = "hidden";
		});
	
		layout_basketpanel_panel.addEventListener('mouseleave', function()
		{
			if (layout_basketpanel_prevent_scrolling)
				document.body.style.overflow = "auto";
		});
		
		document.querySelector('main').addEventListener('mouseover', function()
		{
			if (layout_basketpanel_panel.classList.contains('is-active'))
			{
				layout_basketpanel_panel.classList.remove('is-active');
				if (layout_basketpanel_prevent_scrolling)
					document.body.style.overflow = "auto";
			}
		});
	}
		
	var items = layout_basketpanel_panel.querySelectorAll('.product');
	var price = 0;
	[].forEach.call(items, function(item)
	{
		var price = item.querySelector('.price').getAttribute('data-price');
		var qty = item.querySelector('.qty').getAttribute('data-qty');
		var itemTotal = price * qty;
		item.setAttribute('data-product-total', itemTotal);
	});

})();
/**
*	Layout: Menu.
*/
(function(document) {

	function layout_menu_large_offset()
	{
		var fullsizeMenus = document.querySelectorAll('.submenu.fullsize');
		for (var i = 0; i < fullsizeMenus.length; i++)
		{
			var fullsizeMenu = fullsizeMenus[i];
			var bodyWidth = document.body.clientWidth;
			var menuItemOffsetLeft = fullsizeMenu.parentNode.offsetLeft;
			var headerOffsetLeft = Math.max((bodyWidth / 20), (bodyWidth - 1700)/2 );
			var fullsizeMenuMargin = 150;
			fullsizeMenu.style.width = bodyWidth - fullsizeMenuMargin + "px";
			fullsizeMenu.style.left = -menuItemOffsetLeft + fullsizeMenuMargin/2 - headerOffsetLeft + "px";
		}
	}

	function layout_menu_small_insert_title(openBtn, submenu)
	{
		if (openBtn.submenuInserted)
			return;
		openBtn.submenuInserted = true;
		
		var cloneTitle = openBtn.cloneNode(true);
		arrow = cloneTitle.querySelector('.menu-arrow');
		if (arrow)
			cloneTitle.removeChild(arrow);
		cloneTitle.className = 'menu-item menu-heading';
		submenu.insertBefore(cloneTitle, submenu.children[0]);
		
		var back = document.createElement('a');
		back.href = 'javascript:;';
		back.className = 'menu-control-btn js-close-inner-menu fa fa-chevron-left';
		back.submenu = submenu;
		back.addEventListener('click', function()
		{
			if(window.innerWidth > maxWidth)
				return;
			
			menu.level--;
			var distance = menu.level * 100;
			
			Utils.applyPrefixedStyle(menu, 'transform', 'translateX(-' + distance + '%)');
			
			setTimeout(function() { submenu.style.display = 'none'; }.bind(openBtn), animationTime);
		});
		submenu.insertBefore(back, cloneTitle);
	}	
	
	
	if (document.querySelectorAll('.submenu.fullsize'))
	{
		window.addEventListener('load', layout_menu_large_offset);
		window.addEventListener('resize', layout_menu_large_offset);
	}

	var menu = document.querySelector('.js-slidemenu-container');
	if (menu)
	{
		var maxWidth = 1100;
		var animationTime = 800;
		menu.level = 0;
		
		Utils.applyPrefixedStyle(menu, 'transition', 'transform ' + (animationTime / 1000) + 's')
		
		var openBtns = document.querySelectorAll('.js-open-inner-menu');
		for (var i = 0; i < openBtns.length; i++)
		{
			var openBtn = openBtns[i];
			
			openBtn.addEventListener('click', function(e)
			{
				if(window.innerWidth > maxWidth)
					return false;
				
				e.preventDefault();
				e.stopPropagation();
				
				// Add back btn and title link
				this.submenu = Utils.find(this, '.submenu-container').querySelector('.js-inner-menu');
				
				layout_menu_small_insert_title(this, this.submenu);
				
				menu.level++;
				var distance = menu.level * 100;
				var submenu = this.submenu;
				
				submenu.style.display = 'block';
				submenu.style.left = '100%'; // Inside another abs el
				
				Utils.applyPrefixedStyle(menu, 'transform', 'translateX(-' + distance + '%)');
				
				return false;
			});
		}
	}

})(document);
/**
*	Layout: Search.
*/
(function(document) {

	var layout_search_button = document.querySelector('.search-btn');
	var layout_search_close = document.querySelector('.search-close-btn');

	function layout_search_toggle()
	{
		document.querySelector('.main-search').classList.toggle('is-active');
		document.querySelector('.main-menu').classList.toggle('hidden');
		document.body.classList.toggle('is-searching');
		
		if (document.querySelector('.main-search').classList.contains('is-active'))
			document.querySelector('.main-search input').focus();
	}
	
	if (layout_search_button && layout_search_close)
	{
		layout_search_button.addEventListener('click', layout_search_toggle);
		layout_search_close.addEventListener('click', layout_search_toggle);
	}

})(document);
/**
*	Page: Checkout Checkout5.
*/
(function(document){

	if (!document.querySelector('.body_page_checkout_checkout5'))
		return;

	var paymentDetails = document.getElementById('page_checkout_checkout5_card');
	if (paymentDetails)
	{
		var cardSelector = document.getElementById('page_checkout_checkout5_card_type');
		var cardIcons = document.getElementById('card_types');
		var numberInput = paymentDetails.querySelector('.js-card-number');
		
		numberInput.addEventListener('keyup', function(e)
		{
			var target = e.target;
			switch (target.value.trim().charAt(0))
			{
				case '4':
					cardIcons.classList.add('visa');
					cardSelector.value = "VISA";
					break;
				case '5':
					cardIcons.classList.add('mastercard');
					cardSelector.value = "MC";
					break;
				case '6':
					cardIcons.classList.add('maestro');
					cardSelector.value = "MAESTRO";
					break;
				case '7':
					cardIcons.classList.add('maestro');
					cardSelector.value = "MAESTRO";
					break;
				default:
					cardIcons.className = "";
					cardSelector.value = "";
			}
		});
	}
	
})(document);

/*
(function(){
	'use strict';
	var paymentPage = document.body.classList.contains('body_page_checkout_checkout5');
	if (paymentPage)
	{
		var paymentOptions = document.getElementById('payment_options');
		paymentOptions.addEventListener('click', function (e)
		{
			var target = e.target;
			if (target.classList.contains('js-payment-option'))
			{
				if (target.classList.contains('js-card-payment'))
				{
					paymentOptions.classList.add('card-payment-active');
					paymentOptions.classList.remove('po-payment-active');
					var requiredInputs = target.querySelectorAll('[required]');
					[].requiredInputs.forEach.call(requiredInputs, function(input)
					{
						input.removeAttribute('required');
					});
				}
				
				if (target.classList.contains('js-po-payment'))
				{
					paymentOptions.classList.add('po-payment-active');
					paymentOptions.classList.remove('card-payment-active');
					
					var requiredInputs = target.querySelectorAll('[required]');
					[].requiredInputs.forEach.call(requiredInputs, function(input)
					{
						input.removeAttribute('required');
					});
				}
			}
		});
	}
})();
*/
/**
*	Page: Product Details.
*/
(function(document) {

	if (!document.querySelector('.body_page_product_details'))
		return;

	// Marks a child product as included.
	function page_product_details_included_set(p_product)
	{
		p_product.querySelector(".js-subproduct-price").style.display = "none";
		p_product.querySelector(".js-subproduct-included").style.display = "inline-block";
		p_product.querySelector(".js-subproduct-input").setAttribute("disabled", "disabled");
		Utils.find(p_product, ".common_collapsible").classList.add("is-active");
		p_product.querySelector(".js-subproduct-input").value = 0;
	}
	
	// Marks a child product as not included.
	function page_product_details_included_unset(p_product)
	{
		p_product.querySelector(".js-subproduct-price").style.display = "inline-block";
		p_product.querySelector(".js-subproduct-included").style.display = "none";
		p_product.querySelector(".js-subproduct-input").removeAttribute("disabled");
	}		
		
	// Called when a quantity has changed.
	function page_product_details_refresh()
	{
		// Get all subproduct rows, quantity inputs and total elements.
		var subproduct_rows = document.querySelectorAll('.js-subproduct');
		var quantity_inputs = document.querySelectorAll('.page_product_details_quantity');
		var total_elements = document.querySelectorAll('.page_product_details_total');
		
		// These will be set below.
		var total_quantity = 0;
		var total_price_today = 0;
		var total_price_pa = 0;
		
		// Mark all subproduct rows as not included.
		for (var subproduct_rows_index = 0; subproduct_rows_index < subproduct_rows.length; subproduct_rows_index++)
			page_product_details_included_unset(subproduct_rows[subproduct_rows_index]);

		// Mark appropriate subproduct rows as included.
		for (var quantity_inputs_index = 0; quantity_inputs_index < quantity_inputs.length; quantity_inputs_index++)
		{
			if (quantity_inputs[quantity_inputs_index].getAttribute('data-subproducts') !== null && quantity_inputs[quantity_inputs_index].getAttribute('data-subproducts') != "")
			{
				var quantity = parseFloat(quantity_inputs[quantity_inputs_index].value);
				if (isNaN(quantity))
					quantity = 0;
				if (quantity > 0)
				{
					var childrefs = quantity_inputs[quantity_inputs_index].getAttribute('data-subproducts').split(",");
					for (var subproduct_rows_index = 0; subproduct_rows_index < subproduct_rows.length; subproduct_rows_index++)
						if (childrefs.indexOf(subproduct_rows[subproduct_rows_index].getAttribute('data-product')) != -1)
							page_product_details_included_set(subproduct_rows[subproduct_rows_index]);
				}
			}
		}
	
		// Determine the new totals.
		for (var quantity_inputs_index = 0; quantity_inputs_index < quantity_inputs.length; quantity_inputs_index++)
		{
			var quantity = parseFloat(quantity_inputs[quantity_inputs_index].value);
			if (isNaN(quantity))
				quantity = 0;
			
			price = quantity * parseFloat(quantity_inputs[quantity_inputs_index].getAttribute('data-price'));
			
			total_quantity += quantity;
			total_price_today += price;
			if (quantity_inputs[quantity_inputs_index].getAttribute('data-pa') == "true")
				total_price_pa += price;
		}
		
		// Output the new totals.
		for (var total_elements_index = 0; total_elements_index < total_elements.length; total_elements_index++)
		{
			if (total_price_pa > 0)
				total_elements[total_elements_index].innerHTML = document.getElementById('page_product_details_currency').value+total_price_today.toFixed(2)+" ("+document.getElementById('page_product_details_currency').value+total_price_pa.toFixed(2)+" pa)";
			else
				total_elements[total_elements_index].innerHTML = document.getElementById('page_product_details_currency').value+total_price_today.toFixed(2);
		}
		
		// Update the input minimums.
		for (var quantity_inputs_index = 0; quantity_inputs_index < quantity_inputs.length; quantity_inputs_index++)
		{
			if (total_quantity < 1)
				quantity_inputs[quantity_inputs_index].setAttribute('min', 1);
			else
				quantity_inputs[quantity_inputs_index].setAttribute('min', 0);
		}
	}	
	
	// Scrolls the page to the given element.
	function page_product_details_scroll(p_element)
	{
		var tweenable = new Tweenable();
		tweenable.tween({
			from: { scrollTop: window.pageYOffset },
			to:  { scrollTop: Utils.totalOffsetTop(p_element) },
			duration: 500,
			easing: 'easeOutQuart',
			step: function (state) { window.scrollTo(0, state.scrollTop); }
		});
	}

	// Handle the "View Buying Options" button.
	if (document.querySelector('.page_product_details_button_buying_options'))
	{
		document.querySelector('.page_product_details_button_buying_options').addEventListener('click', function() {
			document.querySelector('.js-tabs').tabber._tabButtonClicked(document.querySelector('.page_product_details_tab_buying_options'));
			page_product_details_scroll(document.querySelector('#buying-options'));
		});
	}
	
	// Handle the "Listen To Songs" button.
	if (document.querySelector('.js-btn-listen-songs'))
	{
		document.querySelector('.js-btn-listen-songs').addEventListener('click', function() {
			document.querySelector('.js-tabs').tabber._tabButtonClicked(document.querySelector('.js-listen-songs'));
			page_product_details_scroll(document.querySelector('#listen-songs'));
		});
	}
	
	// Handle the reviews links.
	if (document.querySelector('.js-btn-view-reviews'))
	{
		document.querySelector('.js-btn-view-reviews').addEventListener('click', function() {
			document.querySelector('.js-tabs').tabber._tabButtonClicked(document.querySelector('.js-reviews'));
			page_product_details_scroll(document.querySelector('#reviews'));
		});
	}
	
	// Handle quantity changes.
	document.addEventListener('DOMContentLoaded', function()
	{
		var quantity_inputs = document.querySelectorAll('.page_product_details_quantity');
		for (var quantity_inputs_index = 0; quantity_inputs_index < quantity_inputs.length; quantity_inputs_index++)
		{
			quantity_inputs[quantity_inputs_index].addEventListener('change', function() { page_product_details_refresh(); });
		}
		
		var quantity_buttons = document.querySelectorAll('.js-qty-btn');
		for (var quantity_buttons_index = 0; quantity_buttons_index < quantity_buttons.length; quantity_buttons_index++)
		{
			if (quantity_buttons[quantity_buttons_index].parentNode.children[0])
			{
				quantity_buttons[quantity_buttons_index].addEventListener('click', function()
				{
					page_product_details_refresh();
				});
			}
		};
	});
	
	/*
	*	The below is from product_option_units.js
	*
	*	Loads HTML from available product 'units' (Teacher's book, WOS CD etc) into buying options based on data attrs "Options" are one product buying option row. "Units" are one component from What's Available of which options can have many.
	*/
	var options = document.querySelectorAll('.js-product-option');
	if(options)
	{
		var unitSelector = '.js-product-unit';
		var optionUnitsSelector = '.js-product-option-units';
		var optionInfoSelector = '.js-product-option-info';
		var optionInfoBtnSelector = '.js-product-option-info-btn';
		var unitDataAttribute = 'data-product-unit';
		var optionDataAttribute = 'data-product-units';
		
		for (var i = 0; i < options.length; i++)
		{
			var option = options[i];
			var optionInfoBtn = option.querySelector(optionInfoBtnSelector);
			var optionUnits = option.querySelector(optionUnitsSelector);
			
			// Add units to image/units cell
			if(!optionUnits) continue;
			var units = option.hasAttribute(optionDataAttribute) ? option.getAttribute(optionDataAttribute).split(',') : [];
			units.forEach(function(unit) {
			if(unit == '') return;
			var unitElement = document.querySelector(unitSelector + '[' + unitDataAttribute + '=' + unit + ']');
			var unitIcon = unitElement.querySelector('.js-product-unit-icon');
			optionUnits.appendChild(unitIcon.cloneNode(true));
			}.bind(this));
			
			// Add units to info area on accordion open
			if(!optionInfoBtn) continue;
			optionInfoBtn.option = option;
			optionInfoBtn.addEventListener('click', function() {
			// Only add units to info area once
			if(this.optionsSet) return;
			this.optionsSet = true;
			
			option = this.option;
			
			var units = option.hasAttribute(optionDataAttribute) ? option.getAttribute(optionDataAttribute).split(',') : [];
			units.forEach(function(unit) {
			if(unit == '') return;
			var unitElement = document.querySelector(unitSelector + '[' + unitDataAttribute + '=' + unit + ']');
			option.querySelector(optionInfoSelector).appendChild(unitElement.cloneNode(true));
			}.bind(this));
			});
		}
		
		// Make units clickable to hide/show relevant sections
		var iconWrappers = document.querySelectorAll(optionUnitsSelector);
		[].forEach.call(iconWrappers, function(wrapper)
		{
			wrapper.addEventListener('mouseup', function(e)
			{
				var target = e.target;
				
				// reset all heights so panels can close after another has opened
				var unitWrappers = document.querySelectorAll('.unit-wrapper');
				[].forEach.call(unitWrappers, function(wrapper)
				{
					wrapper.style.height = 0 + 'px';
				});
				
				var opened = false;
				if (target.classList.contains('js-product-unit-icon'))
				{
					if (target.classList.contains('is-active'))
					{
						target.classList.remove('is-active');
						target.parentNode.classList.remove('js-section-active')
					}
					else
					{
						opened = true;
						
						var parent = target.parentNode.parentNode;
						var unitDetailEls = document.querySelectorAll('.song-buying-options .js-product-unit');
						var icons = document.querySelectorAll('.song-buying-options .js-product-unit-icon');
						
						// inactive state for all icons
						[].forEach.call(icons, function(icon){
						icon.classList.remove('is-active')
						});
						
						// hide all units
						[].forEach.call(unitDetailEls, function(unitDetailEl){
						unitDetailEl.classList.remove('is-active')
						});
						
						var includedUnit = target.getAttribute('data-included-unit')
						var activeUnit = parent.querySelector('[data-product-unit="' + includedUnit + '"]');
						
						// show active unit
						if(activeUnit) activeUnit.classList.add('is-active')
						
						// active state for target
						target.classList.add('is-active');
						wrapper.classList.remove('js-section-active')
						target.parentNode.classList.add('js-section-active')
					}
				}
				
				// transiton for heights
				if (opened)
				{
					var unitWrapper = wrapper.parentNode.querySelector('.unit-wrapper');
					var activeList = unitWrapper.querySelector('.is-active');
					if (activeList)
					{
						var listHeight = activeList.offsetHeight;
						unitWrapper.style.height = listHeight + 20 + 'px'
					}
				}
			});
		});
	}
		
})(document);
/**
*	Page: Product Results.
*/
(function(document) {

	if (!document.querySelector('.body_page_product_results'))
		return;

	var results = document.querySelector('.page_product_results_results_outer');
	var layout_buttons = document.querySelectorAll('.page_product_results_layout_button');
	for (var i = 0; i < layout_buttons.length; i++)
	{
		var layout_button = layout_buttons[i];
		layout_button.addEventListener('click', function() {
			results.setAttribute('data-layout', this.getAttribute('data-layout'));
		});
	}
  
})(document);
/**
 * Licence selection flow for Purchase Annual Licences page
 * Site licence - shows subtotal and form to submit to basket
 * Performance licence -
 *   Search and add product functionality
 *   Shows subtotal and form to submit to basket on product selection
 */
(function(document) {

  var songInfoBtns = document.querySelectorAll('.js-song-info-btn');
  for (var i = 0; i < songInfoBtns.length; i++) {
    songInfoBtns[i].addEventListener('click', function() {
      var songRow = Utils.find(this, '.js-song');
      var songInfoRow = songRow.nextSibling;
      songInfoRow.classList.add('is-active');
    });
  }

  var songInfoCloseBtns = document.querySelectorAll('.js-song-info-close');
  for (var i = 0; i < songInfoCloseBtns.length; i++) {
    songInfoCloseBtns[i].addEventListener('click', function() {
      var songInfoRow = Utils.find(this, '.js-song-info');
      songInfoRow.classList.remove('is-active');
    });
  }

})(document);

/**
*	Shows/hides content on the account licences page.
*
*	@returns {Boolean} Always false.
*/
function oota_account_licences_showhide(p_grouping_id, p_show)
{
	if (p_show)
	{
		document.getElementById('page_account_licences_grouping_'+p_grouping_id+'_hidden').style.display = 'none';
		document.getElementById('page_account_licences_grouping_'+p_grouping_id+'_shown').style.display = 'block';
	}
	else
	{
		document.getElementById('page_account_licences_grouping_'+p_grouping_id+'_hidden').style.display = 'block';
		document.getElementById('page_account_licences_grouping_'+p_grouping_id+'_shown').style.display = 'none';
	}
	return false;
}


/**
*	@returns {Boolean} True if the county is required for the given country.
*/
function oota_address_requires_county(country_id)
{
	for (var i = 0; i < oota_sys_country_ids_require_county.length; i++)
		if (oota_sys_country_ids_require_county[i] == country_id)
			return true;
	return false;
}


/**
*	@returns {Boolean} True if the postcode is required for the given country.
*/
function oota_address_requires_postcode(country_id)
{
	for (var i = 0; i < oota_sys_country_ids_require_postcode.length; i++)
		if (oota_sys_country_ids_require_postcode[i] == country_id)
			return true;
	return false;
}


/**
*	Creates an "Are you sure?" dialogue.
*/
function oota_areyousure_link(message, link)
{
	if (confirm(message))
		document.location = link;
	return false;
}


/**
*	@returns {Boolean} True if the company is required for a user with the given category.
*/
function oota_category_requires_company(category)
{
	for (var i = 0; i < oota_sys_user_categories_require_company.length; i++)
		if (oota_sys_user_categories_require_company[i] == category)
			return true;
	return false;
}


/**
*	Switches location.
*/
function oota_change_location(p_url)
{
	window.location = p_url;
}


/**
*	Called when a licence option is selected.
*/
function oota_checkout_licence(p_prefix, p_default)
{
	document.getElementById("page_checkout_checkout4_"+p_prefix+"_nodates").style.display = "none";
	document.getElementById("page_checkout_checkout4_"+p_prefix+"_dates1").style.display = "none";
	document.getElementById("page_checkout_checkout4_"+p_prefix+"_dates2").style.display = "none";
	if (p_default)
	{
		document.getElementById("page_checkout_checkout4_"+p_prefix+"_nodates").style.display = "inline-block";
	}
	else
	{
		document.getElementById("page_checkout_checkout4_"+p_prefix+"_dates1").style.display = "inline-block";
		document.getElementById("page_checkout_checkout4_"+p_prefix+"_dates2").style.display = "block";
	}
	return true;
}


/**
*	Called when the payment method is switched on the checkout form.
*/
function oota_checkout_payment_method()
{
	try
	{
		document.getElementById('page_checkout_checkout5_user').style.display = 'none';
		document.getElementById('page_checkout_checkout5_card').style.display = 'none';
		document.getElementById("page_checkout_checkout5_user_purchase_order_label").className = "";
		document.getElementById("page_checkout_checkout5_user_purchase_order").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_type").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_number_label").className = "";
		document.getElementById("page_checkout_checkout5_card_number").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_name_label").className = "";
		document.getElementById("page_checkout_checkout5_card_name").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_end_month_label").className = "";
		document.getElementById("page_checkout_checkout5_card_end_month").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_end_year").removeAttribute("required");
		document.getElementById("page_checkout_checkout5_card_cvv_label").className = "";
		document.getElementById("page_checkout_checkout5_card_cvv").removeAttribute("required");
		
		for (var i = 0; i < document.getElementById('page_checkout_checkout5_form_num_payment_methods').value; i++)
		{
			if (document.getElementById('page_checkout_checkout5_form_payment_method_'+i).checked)
			{
				if (document.getElementById('page_checkout_checkout5_form_payment_method_'+i).value == 'user')
				{
					document.getElementById('page_checkout_checkout5_user').style.display = 'block';
					document.getElementById("page_checkout_checkout5_user_purchase_order_label").className = "required";
					document.getElementById("page_checkout_checkout5_user_purchase_order").setAttribute("required", "required");
				}
				else if (document.getElementById('page_checkout_checkout5_form_payment_method_'+i).value == 'card')
				{
					document.getElementById('page_checkout_checkout5_card').style.display = 'block';
					document.getElementById("page_checkout_checkout5_card_type").setAttribute("required", "required");
					document.getElementById("page_checkout_checkout5_card_number_label").className = "required";
					document.getElementById("page_checkout_checkout5_card_number").setAttribute("required", "required");
					document.getElementById("page_checkout_checkout5_card_name_label").className = "required";
					document.getElementById("page_checkout_checkout5_card_name").setAttribute("required", "required");
					document.getElementById("page_checkout_checkout5_card_end_month_label").className = "required";
					document.getElementById("page_checkout_checkout5_card_end_month").setAttribute("required", "required");
					document.getElementById("page_checkout_checkout5_card_end_year").setAttribute("required", "required");
					document.getElementById("page_checkout_checkout5_card_cvv_label").className = "required";
					document.getElementById("page_checkout_checkout5_card_cvv").setAttribute("required", "required");
				}
			}
		}
	}
	catch (e)
	{
		// No payment methods.
	}
	return true;
}


/**
*	Called during the checkout process to submit the checkout redirect form.
*/
function oota_checkout_submit()
{
	document.getElementById('page_checkout_checkout6_form').submit();
	return true;
}


/**
*	Adapts the address form.
*
*	@returns {Boolean} Always false.
*/
function oota_form_address_selected(p_form_name_prefix, p_form_dom_id_prefix)
{
	var existing_selected = false;

	var elements = document.getElementsByName(p_form_name_prefix+"_id");
	for (var i = 0; i < elements.length; i++)
	{
		if (elements[i].checked && elements[i].value != "new")
			existing_selected = true;
	}
	
	if (existing_selected)
	{
		document.getElementById(p_form_dom_id_prefix+'_id_new').checked = false;
		document.getElementById(p_form_dom_id_prefix+'_new').style.display = 'none';
		document.getElementById(p_form_dom_id_prefix+"_new_firstname_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_firstname").removeAttribute("required");
		document.getElementById(p_form_dom_id_prefix+"_new_surname_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_surname").removeAttribute("required");
		document.getElementById(p_form_dom_id_prefix+"_new_address_1_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_address_1").removeAttribute("required");
		document.getElementById(p_form_dom_id_prefix+"_new_town_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_town").removeAttribute("required");
		document.getElementById(p_form_dom_id_prefix+"_new_country_id_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_country_id").removeAttribute("required");
		document.getElementById(p_form_dom_id_prefix+"_new_phone_label").className = "";
		document.getElementById(p_form_dom_id_prefix+"_new_phone").removeAttribute("required");
		oota_form_country_selected(p_form_dom_id_prefix+"_new", false);
	}
	else
	{
		document.getElementById(p_form_dom_id_prefix+'_id_new').checked = true;
		document.getElementById(p_form_dom_id_prefix+'_new').style.display = 'block';
		document.getElementById(p_form_dom_id_prefix+"_new_firstname_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_firstname").setAttribute("required", "required");
		document.getElementById(p_form_dom_id_prefix+"_new_surname_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_surname").setAttribute("required", "required");
		document.getElementById(p_form_dom_id_prefix+"_new_address_1_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_address_1").setAttribute("required", "required");
		document.getElementById(p_form_dom_id_prefix+"_new_town_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_town").setAttribute("required", "required");
		document.getElementById(p_form_dom_id_prefix+"_new_country_id_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_country_id").setAttribute("required", "required");
		document.getElementById(p_form_dom_id_prefix+"_new_phone_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_new_phone").setAttribute("required", "required");
		oota_form_country_selected(p_form_dom_id_prefix+"_new", true);
	}
	
	return true;
}


/**
*	@returns {Boolean} True if the current category selection requires a company.
*/
function oota_form_category_company_required(p_form_dom_id_prefix)
{
	if (oota_category_requires_company(document.getElementById(p_form_dom_id_prefix+"_category").value))
		return true;
	return false;
}


/**
*	@returns {Boolean} True if the current country selection requires a county.
*/
function oota_form_country_county_required(p_form_dom_id_prefix)
{
	if (oota_address_requires_county(document.getElementById(p_form_dom_id_prefix+"_country_id").value))
		return true;
	return false;
}


/**
*	@returns {Boolean} True if the current country selection requires a postcode.
*/
function oota_form_country_postcode_required(p_form_dom_id_prefix)
{
	if (oota_address_requires_postcode(document.getElementById(p_form_dom_id_prefix+"_country_id").value))
		return true;
	return false;
}


/**
*	Adapts a form based on the current category.
*
*	@returns {Boolean} Always true.
*/
function oota_form_category_selected(p_form_dom_id_prefix)
{
	document.getElementById(p_form_dom_id_prefix+"_company_label").className = "";
	document.getElementById(p_form_dom_id_prefix+"_company").removeAttribute("required");
	if (oota_form_category_company_required(p_form_dom_id_prefix))
	{
		document.getElementById(p_form_dom_id_prefix+"_company_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_company").setAttribute("required", "required");
	}
	document.getElementById(p_form_dom_id_prefix+"_advice").style.display = "none";
	if (document.getElementById(p_form_dom_id_prefix+"_category").value.substr(0, 3) == "eu_")
	{
		document.getElementById(p_form_dom_id_prefix+"_advice").innerHTML = "If you are based in the European Union (EU) VAT area, and have an EU VAT number for VAT exemption, please contact us via the &quot;EU VAT Status&quot; area of &quot;My Account&quot; before placing your order.";
		document.getElementById(p_form_dom_id_prefix+"_advice").style.display = "block";
	}
	return true;
}


/**
*	Adapts the county and postcode required field indicators based on the
*	current country selection.
*
*	@returns {Boolean} Always true.
*/
function oota_form_country_selected(p_form_dom_id_prefix, p_allow_required)
{
	document.getElementById(p_form_dom_id_prefix+"_county_label").className = "";
	document.getElementById(p_form_dom_id_prefix+"_county").removeAttribute("required");
	if (p_allow_required && oota_form_country_county_required(p_form_dom_id_prefix))
	{
		document.getElementById(p_form_dom_id_prefix+"_county_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_county").setAttribute("required", "required");
	}
	document.getElementById(p_form_dom_id_prefix+"_postcode_label").className = "";
	document.getElementById(p_form_dom_id_prefix+"_postcode").removeAttribute("required");
	if (p_allow_required && oota_form_country_postcode_required(p_form_dom_id_prefix))
	{
		document.getElementById(p_form_dom_id_prefix+"_postcode_label").className = "required";
		document.getElementById(p_form_dom_id_prefix+"_postcode").setAttribute("required", "required");
	}
	return true;
}


/**
*	Wipes an input if the text matches the given string.
*/
function oota_input_wipe(p_input, p_if_text_is)
{
	if (p_input.value == p_if_text_is)
		p_input.value = "";
	return false;
}

/**
*	Populates an input with the given string it is blank.
*/
function oota_input_unwipe(p_input, p_if_blank_use)
{
	if (p_input.value == "")
		p_input.value = p_if_blank_use;
	return false;
}


/**
*	Supports the buy licences page.
*/
function oota_licences_list_select(p_type)
{
	if (page_licences_list_type[p_type].length == 1)
	{
		window.location = page_licences_list_type[p_type][0]['buy'];
	}
	else
	{
		document.getElementById('page_licences_list_type_button_'+p_type).style.display = "none";
		document.getElementById('page_licences_list_search_'+p_type).style.display = "block";
		document.getElementById('page_licences_list_search_'+p_type+'_input').value = "Search Products";
		document.getElementById('page_licences_list_search_'+p_type+'_results').innerHTML = "";
	}
	return false;
}
function oota_licences_list_blur(p_type)
{
	if (document.getElementById('page_licences_list_search_'+p_type+'_input').value == "")
		document.getElementById('page_licences_list_search_'+p_type+'_input').value = "Search Products";
	return true;
}
function oota_licences_list_focus(p_type)
{
	if (document.getElementById('page_licences_list_search_'+p_type+'_input').value == "Search Products")
		document.getElementById('page_licences_list_search_'+p_type+'_input').value = "";
	return true;
}
function oota_licences_list_keyup(p_type)
{
	document.getElementById('page_licences_list_search_'+p_type+'_results').innerHTML = "";
	if (document.getElementById('page_licences_list_search_'+p_type+'_input').value != "")
	{
		for (var i = 0; i < page_licences_list_type[p_type].length; i++)
		{
			if (page_licences_list_type[p_type][i]['details'].toLowerCase().indexOf(document.getElementById('page_licences_list_search_'+p_type+'_input').value.toLowerCase()) != -1)
			{
				var result = "";
				result += "<div class=\"page_licences_list_result\">";
					result += "<div>"+page_licences_list_type[p_type][i]['details']+"</div>";
					result += "<div>"+page_licences_list_type[p_type][i]['duration']+"</div>";
					result += "<div>"+page_licences_list_type[p_type][i]['price']+"</div>";
					result += "<div><a class=\"btn-success\" href=\""+page_licences_list_type[p_type][i]['buy']+"\">Buy</a></div>";
				result += "</div>";
				document.getElementById('page_licences_list_search_'+p_type+'_results').innerHTML += result;
			}
		}
	}
	return true;
}
function oota_licences_list_showhide(p_grouping_id, p_show)
{
	if (p_show)
	{
		document.getElementById('page_licences_list_grouping_description_'+p_grouping_id+'_hidden').style.display = 'none';
		document.getElementById('page_licences_list_grouping_description_'+p_grouping_id+'_shown').style.display = 'block';
	}
	else
	{
		document.getElementById('page_licences_list_grouping_description_'+p_grouping_id+'_hidden').style.display = 'block';
		document.getElementById('page_licences_list_grouping_description_'+p_grouping_id+'_shown').style.display = 'none';
	}
	return false;
}


/**
*	Gets addresses based on a postcode from PA and presents them to the user.
*/
var oota_panywhere_current_prefix = null;
function oota_panywhere_get(p_prefix)
{
	oota_panywhere_current_prefix = p_prefix;
	
	var script = document.createElement("script");
	var head = document.getElementsByTagName("head")[0];

	var url = oota_panywhere_url+"FindByPostcode/v1.00/json.ws";
	url += "?Key="+encodeURI(oota_panywhere_key);
	url += "&Postcode="+encodeURI(document.getElementById(p_prefix+'_new_lookup_lookup').value);
	url += "&UserName=";
	url += "&CallbackFunction="+encodeURI("oota_panywhere_get_helper");

	script.src = url;

	script.onload = script.onreadystatechange = function ()
	{
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
		{
			script.onload = script.onreadystatechange = null;
			if (head && script.parentNode)
			{
				head.removeChild(script);
			}
		}
	}

	head.insertBefore(script, head.firstChild);
	
	return false;
}
function oota_panywhere_get_helper(response)
{
	if (response.length == 1 && typeof(response[0].Error) != "undefined")
	{
		alert(response[0].Description+"\n\nPlease contact us if you need assistance checking out.");
	}
	else
	{
		if (response.length == 0)
		{
			alert("Sorry, there were no results\n\nPlease contact us if you need assistance checking out.");
		}
		else
		{
			var contents = "";
			contents += "Please select your address from the list below.";
			contents += "<br />";
			for (var i = 0; i < response.length; i ++)
			{
				contents += "<br />";
				contents += "<a href=\"#\" onclick=\"return oota_panywhere_select('"+response[i].Id+"');\">"+response[i].StreetAddress+", "+response[i].Place+"</a>";
			}
			document.getElementById(oota_panywhere_current_prefix+'_new_selection').innerHTML = contents;
			document.getElementById(oota_panywhere_current_prefix+'_new_selection').style.display = 'block';
		}
	}
}

/**
*	Gets an address based on its PA reference and autofills the appropriate form.
*/
function oota_panywhere_select(p_address_id)
{
	var script = document.createElement("script");
	var head = document.getElementsByTagName("head")[0];

	var url = oota_panywhere_url+"RetrieveById/v1.20/json.ws";
	url += "?Key="+encodeURI(oota_panywhere_key);
	url += "&Id="+encodeURI(p_address_id);
	url += "&UserName=";
	url += "&CallbackFunction="+encodeURI("oota_panywhere_select_helper");

	script.src = url;

	script.onload = script.onreadystatechange = function ()
	{
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
		{
			script.onload = script.onreadystatechange = null;
			if (head && script.parentNode)
			{
				head.removeChild(script);
			}
		}
	}

	head.insertBefore(script, head.firstChild);
	
	return false;
}
function oota_panywhere_select_helper(response)
{
	if (response.length == 1 && typeof(response[0].Error) != "undefined")
	{
		alert(response[0].Description+"\n\nPlease contact us if you need assistance checking out.");
	}
	else
	{
		if (response.length == 0)
		{
			alert("Sorry, there were no results\n\nPlease contact us if you need assistance checking out.");
		}
		else
		{
			document.getElementById(oota_panywhere_current_prefix+'_new_selection').style.display = 'none';
			document.getElementById(oota_panywhere_current_prefix+'_new_address_1').value = response[0].Line1;
			document.getElementById(oota_panywhere_current_prefix+'_new_address_2').value = response[0].Line2;
			document.getElementById(oota_panywhere_current_prefix+'_new_town').value = response[0].PostTown;
			document.getElementById(oota_panywhere_current_prefix+'_new_county').value = response[0].County;
			document.getElementById(oota_panywhere_current_prefix+'_new_postcode').value = response[0].Postcode;
			if (document.getElementById(oota_panywhere_current_prefix+'_new_country_id').value != oota_sys_country_id_gb)
			{
				document.getElementById(oota_panywhere_current_prefix+'_new_country_id').value = oota_sys_country_id_gb;
				setTimeout(document.getElementById(oota_panywhere_current_prefix+'_new_country_id').onchange, 0);
			}
			document.getElementById(oota_panywhere_current_prefix+'_new_phone').value = '';
			document.getElementById(oota_panywhere_current_prefix+'_new_fax').value = '';
		}
	}
}


/**
*	Updates the number of results to show per page on the search results
*	page.
*/
function oota_per_page(p_url, p_per_page)
{
	window.location = p_url+'per_page='+p_per_page;
	return true;
}


/**
*	Clears the current filter selections in the product search results.
*/
function oota_product_results_clear(p_url)
{
	window.location = p_url;
	
	return false;
}


/**
*	Updates the product search results based on the current filter
*	selections.
*/
function oota_product_results_filter(p_url)
{
	var url = p_url;
	
	var params = "";
	
	var elems = document.getElementsByTagName("input");
	for (var i = 0; i < elems.length; i++)
	{
		if (elems[i].type == "checkbox" && elems[i].id.substring(0, 28) == "page_product_results_filter_")
		{
			if (elems[i].checked)
			{
				if (params != "")
					params += "&";
				params += elems[i].name+"=true";
			}
		}
	}
	
	if (params != "")
	{
		if (url.indexOf("?") != -1)
			url += "&"+params;
		else
			url += "?"+params;
	}
	
	window.location = url;
	
	return false;
}


/**
*	Records a product view.
*/
function oota_product_view(p_product_id)
{
	oota_request_async(oota_url_use+'product_view.json', 'product_id='+p_product_id, null);
	return false;
}


/**
*	Sends an asynchronous HTTP request and calls the specified handler.
*/
function oota_request_async(url, parameters, handler)
{
	// Send the HTTP request.
	if (window.XMLHttpRequest) 
	{
		var request = new XMLHttpRequest();
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.onreadystatechange = handler;
		request.send(parameters);
	}
	else if (window.ActiveXObject) 
	{
		var request = new ActiveXObject("Microsoft.XMLHTTP");
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.onreadystatechange = handler;
		request.send(parameters);
	}
}


/**
*	Reserved (do not remove).  Opens a tab on the product details page.
*/
function oota_reserved_page_product_details_tab(p_tab_reference)
{
	var tab = document.querySelector(".page_product_details_tab_"+p_tab_reference);
	if (tab)
		tab.click();
	return false;
}


/**
*	Handles rotation.
*/
var oota_rotate_timeout = 4000;
var oota_rotate_counts = [];
function oota_rotate_init()
{
	var rotates = document.getElementsByClassName('rotate');
	for (var rotate_index = 0; rotate_index < rotates.length; rotate_index++)
	{
		var rotate_images = rotates[rotate_index].getElementsByClassName('rotate_image');
		oota_rotate_counts[rotate_index] = rotate_images.length;
		if (oota_rotate_counts[rotate_index] > 0)
			oota_rotate_next(rotate_index, -1);
	}
}
function oota_rotate_next(p_rotate_index, p_image_index)
{
	p_image_index++;
	if (p_image_index >= oota_rotate_counts[p_rotate_index])
		p_image_index = 0;
	oota_rotate_show(p_rotate_index, p_image_index);
	setTimeout('oota_rotate_next('+p_rotate_index+', '+p_image_index+')', oota_rotate_timeout);
}
function oota_rotate_show(p_rotate_index, p_image_index)
{
	var rotates = document.getElementsByClassName('rotate');
	for (var rotate_index = 0; rotate_index < rotates.length; rotate_index++)
	{
		if (rotate_index == p_rotate_index)
		{
			var rotate_images = rotates[rotate_index].getElementsByClassName('rotate_image');
			for (var i = 0; i < rotate_images.length; i ++)
				rotate_images[i].style.display = 'none';
			rotate_images[p_image_index].style.display = 'block';
		}
	}
}


/**
*	Opens the externally-hosted S!ngchronize player.
*/
function oota_singchronize_init_external()
{
	var window_params = "";
	window_params += "fullscreen=yes";
	//window_params += ",height="+window.screen.availHeight;
	//window_params += ",width="+window.screen.availWidth;
	window_params += ",location=no";
	window_params += ",menubar=no";
	window_params += ",resizable=yes";
	window_params += ",scrollbars=no";
	window_params += ",status=no";
	window_params += ",titlebar=no";
	window_params += ",toolbar=no";
	var oota_singchronize_window = window.open(oota_url_ssl+'singchronize.do','oota_singchronize_window',window_params);
	
	return false;
}


/**
*	Opens the internally-hosted S!ngchronize player.
*/
function oota_singchronize_init_internal()
{
	var window_params = "";
	window_params += "fullscreen=yes";
	//window_params += ",height="+window.screen.availHeight;
	//window_params += ",width="+window.screen.availWidth;
	window_params += ",location=no";
	window_params += ",menubar=no";
	window_params += ",resizable=yes";
	window_params += ",scrollbars=no";
	window_params += ",status=no";
	window_params += ",titlebar=no";
	window_params += ",toolbar=no";
	var oota_singchronize_window = window.open(oota_url_ssl+'singchronize.htm','oota_singchronize_window',window_params);
	
	return false;
}


/**
*	Subscribes an e-mail address to blog notifications.
*/
function oota_subscribe_blog(p_email)
{
	if (p_email == '')
	{
		alert('Please enter your e-mail address.');
	}
	else
	{
		alert('Thank you for subscribing to our blog notifications.');
		oota_request_async(oota_url_use+'subscriber_blog.json', 'email='+p_email, null);
	}
	return false;
}
