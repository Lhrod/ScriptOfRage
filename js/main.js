var scrolls = document.getElementsByClassName("scroll");
var scene = document.getElementById("scene");
var general = document.getElementById("general");
var charLayer = document.getElementById("charLayer");
var enemiesOnLevel = [
              [
                new Sprite(220, 100, charLayer, IDLE, -1, 6, 'Vice', ['vice_walk', 'vice_idle', 'vice_punch', 'vice_kicked', 'vice_dying', 'vice_dye']),
                new Sprite(150, 150, charLayer, IDLE, -1, 6, 'Vice', ['vice_walk', 'vice_idle', 'vice_punch', 'vice_kicked', 'vice_dying', 'vice_dye']),
              ],
            ];
var sprites = [];
var updateSpritesId;
var music = new Audio("sound/music/01 Fuze.mp3");
var soundEffect = {
  slap: new Audio("sound/Slap.wav"),
  dye: new Audio("sound/Eargh!!.wav"),
};

window.addEventListener('load', function ()
{
  /*setTimeout(function () {
    general.classList.remove('hidden');
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    loadCharScreen(0);

    music.loop = true;
    music.play();
  }, 4000);/**/
  general.classList.remove('hidden');
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  loadCharScreen(0);/**/
  updateSprites();
  updateSpritesId = setInterval(updateSprites, 30);

});

function loadCharScreen(num)
{
  sprites = [hero];
  sprites[0].element.classList.remove("hidden");
  enemiesOnLevel[num].forEach(function (e, i) {
      e.element.classList.remove("hidden");
      sprites[i+1] = e;
  });
  charLayer.appendChild(hero.element);

}

function updateSprites()
{
  for (var sprite of sprites) {
    sprite.update();
  }
}

var keyDown = function (keyEvent)
{
  switch (keyEvent.keyCode) {
    case 65:  // a
    case 37:  // cursor left
      hero.stepX = -1;
      break;
    case 68:  // d
    case 39:  // right
      hero.stepX = 1;
      break;
    case 87:  // w
    case 38:  // up
      hero.stepY = -1;
      break;
    case 83:  // s
    case 40:  // down
      hero.stepY = 1;
      break;
    case 97:  // 1 on numeric keypad
    case 16:  // shift
      break;
    case 98:  // 2 on numeric keypad
    case 17:  // ctrl
      hero.try2Hit();
      break;
    case 99:
    case 32:  // space
      break;
    default:
      console.log("Down tecla desconocida: " + keyEvent.keyCode);
  }
}

var keyUp = function (keyEvent)
{
  switch (keyEvent.keyCode) {
    case 65:  // a
    case 37:  // cursor left
      hero.stepX = 0;
      break;
    case 68:  // d
    case 39:  // right
      hero.stepX = 0;
      break;
    case 87:  // w
    case 38:  // up
      hero.stepY = 0;
      break;
    case 83:  // s
    case 40:  // down
      hero.stepY = 0;
      break;
    case 97:  // 1 on numeric keypad
    case 16:  // shift

      break;
    case 98:  // 2 on numeric keypad
    case 17:  // ctrl
      hero.try2StopHit();
      break;
    case 99:
    case 32:  // space
      break;
    default:
      console.log("Up tecla desconocida: " + keyEvent.keyCode);
  }
}

function forwardScroll()
{
  for (var e of scrolls) {
    e.style.backgroundPositionX = (parseInt(e.style.backgroundPositionX) - MAX_X_RESOLUTION) + 'px';
  };
}

function intersect(a, b) {
  return Math.max(a.x, b.x) < Math.min(a.right, b.right) &&
          Math.max(a.y, b.y) < Math.min(a.bottom, b.bottom);
}
