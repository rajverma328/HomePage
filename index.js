const platform = document.getElementById("platform");
const background = document.getElementById("background");
const hills = document.getElementById("hills");
const platformSmallTall = document.getElementById("platformSmallTall");

const spriteRunLeft = document.getElementById("spriteRunLeft");
const spriteRunRight = document.getElementById("spriteRunRight");
const spriteStandLeft = document.getElementById("spriteStandLeft");
const spriteStandRight = document.getElementById("spriteStandRight");

const pi_name = document.getElementById("name"); 
const st = document.getElementById("start");
const branch = document.getElementById("branch");
const inst = document.getElementById("inst");
const interest = document.getElementById("interest");
const contact = document.getElementById("contact");
const yoda = document.getElementById("yoda");
const githp = document.getElementById("gith");
const tunnel = document.getElementById("tunnel");
// console.log(interest)

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var touchco = 0
var audio = new Audio();
audio.src = "./sound/Pix - Lava monsters.mp3";
audio.volume = 0.2
audio.loop = true

var lvlup = new Audio();
lvlup.src = "./sound/Level Up Sound Effect.mp3"

var lmao_ded = new Audio();
lmao_ded.src = "./sound/died.mp3"
lmao_ded.playbackRate = 2

var warp = new Audio();
warp.src = "./sound/warp.mp3"
warp.playbackRate = 1

var jumpso = new Audio();
jumpso.src = "./sound/Jump.mp3"
jumpso.volume = 0.8
jumpso.playbackRate = 2.5

var link_check = false

canvas.width = screen.width
canvas.height = screen.height
if(canvas.width > 1024)
    canvas.width = 1024
if(canvas.height > 576)
    canvas.height = 576
const bottom_offset = 100  
const scw = canvas.width 

const gravity = 0.4

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc.src
    return image
}

class Platform {
    constructor({x, y, image, widd, hdd}) {
        this.position = {
            x : x,
            y : y
        }
        this.width = widd
        this.height = hdd
        this.image = image
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class Player{
    constructor(){
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = {
            x : 0,
            y : 0
        }
        
        this.frame = 0;
        this.sprites = {
            stand : {
                right : createImage(spriteStandRight),
                left : createImage(spriteStandLeft),
                cropWidth : 177,
                width : 66
            },
            run : {
                right : createImage(spriteRunRight),
                left : createImage(spriteRunLeft),
                cropWidth : 341,
                width : 127.875
            }
        }
        this.width = this.sprites.stand.width
        this.height = 130
        this.image = this.sprites.stand.right
        this.CPW = this.sprites.stand.cropWidth
    }
    draw(){
        c.drawImage(this.image,
            this.CPW*this.frame,
            0,
            this.CPW,
            400, 
            this.position.x,
            this.position.y, 
            this.width, 
            this.height)
    }

    update(){
        this.frame++
        if(this.frame > 28) this.frame = 0
        this.position.x = this.position.x + this.velocity.x 
        this.position.y = this.position.y + this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y = this.velocity.y + gravity
        else
            this.velocity.y = 0

        this.draw()
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x : x-1,
            y : y-1
        }
        this.image = image
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const Pimg = createImage(platform)
const PTimg = createImage(platformSmallTall)
// console.log(Pimg)

const player = new Player()

const platforms = [new Platform({x : 0, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
    new Platform({x : 2000, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),//small top platfroms
    new Platform({x : 1200, y : canvas.height-bottom_offset-100, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 1500, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 2900, y : canvas.height-bottom_offset-100, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 3200, y : canvas.height-bottom_offset-200, image : tunnel, widd : 150, hdd : 200}),//yoda
    // new Platform({x : 4600, y : canvas.height-bottom_offset-200, image : tunnel, widd :150, hdd : 200 }),
    new Platform({x : 5100, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),
                new Platform({x : 500-1, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 1000-2, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 1500-3, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 2000-4, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 2700-5, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 3200-5, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 3700-5, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 4400-5, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 4900-5, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 5400-6, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset}),
                new Platform({x : 5900-7, y : canvas.height-bottom_offset, image : Pimg, widd : 500, hdd : bottom_offset})]


const genericobjects = [
    new GenericObject({x : 0, y : 0, image : createImage(background)}),
    new GenericObject({x : 0, y : 0, image : createImage(st)}),
    new GenericObject({x : 0, y : 100, image : createImage(hills)}),
    new GenericObject({x : 3000, y : 0, image : createImage(background)}),
    new GenericObject({x : 3000, y : 100, image : createImage(hills)}),
    new GenericObject({x : 200, y : 10, image : createImage(pi_name)}),
    new GenericObject({x : 1000, y : 0, image : createImage(branch)}),
    new GenericObject({x : 600, y : 200, image : createImage(inst)}),
    new GenericObject({x : 2500, y : 50, image : createImage(interest)}),
    new GenericObject({x : 7000, y : 0, image : createImage(contact)}),
]

const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    },
    up : {
        pressed : false
    },
    down : {
        pressed : false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0,canvas.width,canvas.height)

    genericobjects.forEach(genericobject_c => {
        genericobject_c.draw()
    })

    // console.log(platforms[1].position.x)
    if(keys.right.pressed && player.position.x < scw/2){
        player.velocity.x = 5
    }else if (keys.left.pressed && player.position.x > scw/5){
        player.velocity.x = -5
    }else {
        player.velocity.x = 0
        if(keys.right.pressed == true && platforms[platforms.length -1].position.x > scw/2-scw/4+10){
            platforms.forEach((platform) => {
                platform.position.x -= 5
                genericobjects.forEach(genericobject_c => {
                    genericobject_c.position.x -= 0.5 
                })
            }) 
        }else if(keys.left.pressed == true && platforms[0].position.x < 0){
            platforms.forEach((platform) => {
                platform.position.x += 5
                genericobjects.forEach(genericobject_c => {
                    genericobject_c.position.x += 0.5
                })
            }) 
        }
    }

    platforms.forEach((platform) => { // name of variable 
        platform.draw()
    }) 

    c.drawImage(yoda, platforms[5].position.x-100, platforms[5].position.y-290)
    c.drawImage(githp, platforms[6].position.x-25, platforms[6].position.y-100)

    player.update()

    var countp = 0;
    //collision detection 
    platforms.forEach((platform) => {
    countp++;
    if((player.position.y + player.height <= platform.position.y) && 
       (player.position.y + player.velocity.y +player.height >= platform.position.y) && 
       (player.position.x + player.width >= platform.position.x) &&
       (player.position.x <= platform.position.x + platform.width)){    
            player.velocity.y = 0
            // console.log(countp)
            if(countp == 6 && link_check == false){ 
                link_check = true
                audio.pause()
                warp.play()
                window.open('https://rajverma328.github.io/img/personal_info/resume.pdf')
            }
            else if(countp == 7 && link_check == false){
                link_check = true
                audio.pause()
                lvlup.play()
                window.open('https://github.com/rajverma328')
            }
            else if(countp != 6 && countp != 7)
                link_check = false
        }
    })

    if(player.position.y >= canvas.height-player.height){
        lmao_ded.play()
        player.position.x = 100
        player.position.y = 100 
        player.velocity.y = 0
    }
    // console.log(platforms[1].position.x)
}

animate()

window.addEventListener('keydown', ({ key }) => {    
    // console.log(key)
    if(touchco == 0)
        audio.play()
    if(key == 'a' || key =='A' || key =='ArrowLeft'){
        keys.left.pressed = true
        player.image = player.sprites.run.left 
        player.CPW = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    if(key == 'd' || key =='D' || key =='ArrowRight'){
        keys.right.pressed = true
        player.image = player.sprites.run.right 
        player.CPW = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
    if((key == 'w' || key =='W' || key =='ArrowUp') && player.velocity.y == 0 && keys.up.pressed == false){
        keys.up.pressed = true
        jumpso.play()
        player.velocity.y -= 15
    }
    if(key == 's' || key =='S' || key =='ArrowDown') 
        keys.down.pressed = true
    }
)
window.addEventListener('keyup', ({ key }) => {    
    if(key == 'a' || key =='A' || key =='ArrowLeft'){
        keys.right.pressed = false
        keys.left.pressed = false
        player.image = player.sprites.stand.left 
        player.CPW = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    if(key == 'd' || key =='D' || key =='ArrowRight'){
        keys.right.pressed = false
        keys.left.pressed = false
        player.image = player.sprites.stand.right 
        player.CPW = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
    if(key == 'w' || key =='W' || key =='ArrowUp')
        keys.up.pressed = false
    if(key == 's' || key =='S' || key =='ArrowDown') 
        keys.down.pressed = false
    }
)
var touchYstart = 0
window.addEventListener('touchstart', function(event) {
    if(touchco == 0)
        audio.play()
    var touchX = event.changedTouches[0].clientX;;
    touchYstart = event.changedTouches[0].clientY;
    if (touchX < window.innerWidth / 2) {
        keys.left.pressed = true
        player.image = player.sprites.run.left 
        player.CPW = player.sprites.run.cropWidth
        player.width = player.sprites.run.width     
    } else {
        keys.right.pressed = true
        player.image = player.sprites.run.right 
        player.CPW = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    }
});
document.addEventListener('touchmove', function(event) {
    var touchEndY = event.touches[0].clientY;
    var swipeDistanceY = touchEndY - touchYstart;
    var minSwipeDistance = 100; // Adjust this threshold as needed
    if (Math.abs(swipeDistanceY) >= minSwipeDistance && player.velocity.y == 0) {
        if (swipeDistanceY < 0) {
            keys.up.pressed = true
            jumpso.play()
            player.velocity.y -= 15
        }
        if (swipeDistanceY > 0) {
            keys.down.pressed = true
        }
    }

});
window.addEventListener('touchend', function(event) {
    var touchX = event.changedTouches[0].clientX;;
    if (touchX < window.innerWidth / 2) {
        keys.left.pressed = false
        keys.right.pressed = false
        player.image = player.sprites.stand.left 
        player.CPW = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    } else {
        keys.right.pressed = false
        keys.left.pressed = false
        player.image = player.sprites.stand.right 
        player.CPW = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }
});

function handleOrientationChange() {
    if (screen.orientation.angle === 0 || screen.orientation.angle === 180) {
        window.location.reload()
        console.log("shit")
      } else if (screen.orientation.angle === 90 || screen.orientation.angle === -90) {
        window.location.reload()
        console.log("shit")
      }
        
  }
  
  // Listen for orientation change events
  window.addEventListener("orientationchange", handleOrientationChange);



