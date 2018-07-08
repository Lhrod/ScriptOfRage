function Sprite(x, y, parent, state = IDLE, orientation = 1, life = 6, name = 'nameless', cssClassesNames = ['walk', 'idle', 'punch', 'kicked', 'dying'])
{
  this.name = name;
  this.cssClassesNames = cssClassesNames;
  this.element = document.createElement("div");
  this.parent = parent;
  parent.appendChild(this.element);
  this.element.classList.add("sprite");
  this.element.classList.add(this.name.toLowerCase());
  this.element.classList.add(cssClassesNames[state]);
  this.element.classList.add("hidden");
  this.area = {};
  this.area.x = x;
  this.area.y = y;
  this.area.right = x + this.element.offsetWidth;
  this.area.bottom = y + this.element.offsetHeight;
  this.orientation = orientation;
  this.state = state;
  this.life = life;
  this.collisions = [];
  this.hitter = this;
  this.time4SubstractLife = 0;
  this.stepX = 0;
  this.stepY = 0;

  this.lookAtOrientation = function () {
    if (this.orientation < 0)
      this.element.classList.add("LeftOrientation");
    else {
      this.element.classList.remove("LeftOrientation");
    }
  }

  this.updatePositionElement = function () {
    this.element.style.left = this.area.x + 'px';
    this.element.style.top = this.area.y + 'px';
  }

  this.update = function () {
    if (this.state < PUNCH) {
      this.updatePosition();
    }
    else {
      this.updateStates();
    }
    this.lookAtOrientation();
    this.updateAnim();
    this.updatePositionElement();
  }

  this.detectHitterCollisions = function () {
    this.collisions.length = 0;
    var i = 0, punching = false;
    for (var sprite of sprites) {
      if ((sprite !== this) && (intersect(this.area, sprite.area)))
      {
        this.collisions[i++] = sprite;
        punching |= (sprite.state == PUNCH);
      }
    }
    return punching;
  }

  this.updateAnim = function () {
    for (var className of this.cssClassesNames)
    {
      this.element.classList.remove(className);
    }
    this.element.classList.add(this.cssClassesNames[this.state]);
  }

  this.updateStates = function () {
    switch (this.state)
    {
      case DYE:
        soundEffect.dye.play();
        addEventListener("animationend", this.dye());
        break;
      case DYING:
        var dye = this;
        addEventListener("animationend", function (e) { dye.state = DYE; });
        break;
      case KICKED:
        this.updateLife();
        break;
      case PUNCH:
        this.detectHitterCollisions()
        var hitter = this;

        this.collisions.forEach(function (e) { e.kicked(hitter); });
        break;
    }
  }

  this.updatePosition = function () {
    this.area.x += this.stepX * SPEED_WALK;
    if (this.area.x < 0)
    {
      this.area.x = 0;
      this.stepX = 0;
      this.area.right = this.element.offsetWidth;
    }
    else {
      this.area.right = this.area.x + this.element.offsetWidth;
      if (this.area.right >= MAX_X_RESOLUTION)
      {
        this.area.right = MAX_X;
        this.stepX = 0;
        this.area.x = this.area.right - this.element.offsetWidth;
      }
    }
    this.area.y += this.stepY * SPEED_WALK;
    this.area.bottom = this.area.y + this.element.offsetHeight;
    if (this.area.bottom < MIN_Y)
    {
      this.area.bottom = MIN_Y;
      this.area.y = MIN_Y - this.element.offsetHeight;
      this.stepY = 0;
    } else if (this.area.bottom > MAX_Y) {
      this.area.bottom = MAX_Y;
      this.area.y = MAX_Y - this.element.offsetHeight;
      this.stepY = 0;
    }
    // Orientation
    if (this.stepX > 0)
    {
      this.state = WALK;
      this.orientation = 1;
    } else if (this.stepX < 0) {
      this.state = WALK;
      this.orientation = -1;
    } else {
      this.state = (this.stepY) ? WALK : IDLE;
    }
  }

  this.kicked = function (hitter) {
    if (this.state < KICKED)
    {
      time4SubstractLife = Date.now() + TIME_BETWEEN_HITS;
      soundEffect.slap.play();
      this.state = KICKED;
      this.hitter = hitter;
    }
  }

  this.updateLife = function () {
    if (this.detectHitterCollisions()){
      if (time4SubstractLife <= Date.now())
      {
        time4SubstractLife = Date.now() + TIME_BETWEEN_HITS;
        soundEffect.slap.play();
        if (--this.life <= 0)
        {
          this.state = DYING;
        }
      }
    } else {
      this.state = IDLE;
    }
  }

  this.dye = function () {
    _.remove(sprites, function(e) { return e.state == DYE; });
    this.element.classList.add("hidden");
  }
}

var hero = new Sprite(40, MAX_Y/2, charLayer, IDLE, 1, 12, 'Manz', cssClass4Hero);
hero.try2Hit = function () {
  if (this.state < PUNCH)
  {
    this.state = PUNCH;
  }
}
hero.try2StopHit = function () {
  if (this.state <= PUNCH)
  {
    this.state = (this.stepX || this.stepY) ? WALK : IDLE;
  }
}
