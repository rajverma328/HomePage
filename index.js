const platform = document.getElementById("platform");
const background = document.getElementById("background");
const hills = document.getElementById("hills");
const platformSmallTall = document.getElementById("platformSmallTall");
// console.log(platform)

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const bottom_offset = 100  

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
        this.width = 30
        this.height = 30
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    update(){
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
    new Platform({x : 700, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),//small top platfroms
    new Platform({x : 1200, y : canvas.height-bottom_offset-100, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 1500, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 2900, y : canvas.height-bottom_offset-100, image : PTimg, widd : 300, hdd : 200}),
    new Platform({x : 3200, y : canvas.height-bottom_offset-200, image : PTimg, widd : 300, hdd : 200}),
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

// const small_platforms = [new Platform({x : 700, y : canvas.height-bottom_offset-60, image : PTimg, widd : 250, hdd : 227}),
//                 // new Platform({x : 500-1, y : canvas.height-bottom_offset, image : PTimg}),
//                 // new Platform({x : 1000-2, y : canvas.height-bottom_offset, image : PTimg}),
//                 // new Platform({x : 1500-3, y : canvas.height-bottom_offset, image : PTimg}),
//                 // new Platform({x : 1500-3, y : canvas.height-bottom_offset, image : PTimg}),
//                 // new Platform({x : 1500-3, y : canvas.height-bottom_offset, image : PTimg}),
//                 new Platform({x : 5900-7, y : canvas.height-bottom_offset, image : PTimg, widd : 250, hdd : 227})]

const genericobjects = [
    new GenericObject({x : 0, y : 0, image : createImage(background)}),
    new GenericObject({x : 0, y : 100, image : createImage(hills)}),
    new GenericObject({x : 3000, y : 0, image : createImage(background)}),
    new GenericObject({x : 3000, y : 100, image : createImage(hills)})
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

    console.log(platforms[1].position.x)
    if(keys.right.pressed && player.position.x < 600){
        player.velocity.x = 5
    }else if (keys.left.pressed && player.position.x > 200){
        player.velocity.x = -5
    }else {
        player.velocity.x = 0
        if(keys.right.pressed == true && platforms[1].position.x > -5000){
            platforms.forEach((platform) => {
                platform.position.x -= 5
                genericobjects.forEach(genericobject_c => {
                    genericobject_c.position.x -= 0.5 
                })
            }) 
        }else if(keys.left.pressed == true && platforms[1].position.x < 700){
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

    player.update()

    //collision detection 
    platforms.forEach((platform) => {
    if((player.position.y + player.height <= platform.position.y) && 
       (player.position.y + player.velocity.y +player.height >= platform.position.y) && 
       (player.position.x + player.width >= platform.position.x) &&
       (player.position.x <= platform.position.x + platform.width)){    
            player.velocity.y = 0
        }
    })

    if(player.position.y >= canvas.height-player.height){
        player.position.x = 100
        player.position.y = 100 
        player.velocity.y = 0
    }
    // console.log(platforms[1].position.x)
}

animate()

window.addEventListener('keydown', ({ key }) => {    
    // console.log(key)
    if(key == 'a' || key =='A' || key =='ArrowLeft') 
        keys.left.pressed = true
    if(key == 'd' || key =='D' || key =='ArrowRight') 
        keys.right.pressed = true
    if((key == 'w' || key =='W' || key =='ArrowUp') && player.velocity.y == 0 && keys.up.pressed == false){
        keys.up.pressed = true
        player.velocity.y -= 15
    }
    if(key == 's' || key =='S' || key =='ArrowDown') 
        keys.down.pressed = true
    }
)
window.addEventListener('keyup', ({ key }) => {    
    if(key == 'a' || key =='A' || key =='ArrowLeft') 
        keys.left.pressed = false
    if(key == 'd' || key =='D' || key =='ArrowRight') 
        keys.right.pressed = false
    if(key == 'w' || key =='W' || key =='ArrowUp')
        keys.up.pressed = false
    if(key == 's' || key =='S' || key =='ArrowDown') 
        keys.down.pressed = false
    }
)