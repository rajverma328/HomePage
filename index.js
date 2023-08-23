// import platform from './img/platform.png'
// console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.4

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

class Platform {
    constructor({x, y}) {
        this.position = {
            x : x,
            y : y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
// const platform = new Platform()
const platforms = [new Platform({x : 200, y : 500}),
                new Platform({x : 500, y : 400}),
                new Platform({x : 1000, y : 500}),
                new Platform({x : 1200, y : 400})]

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
    c.clearRect(0,0,canvas.width,canvas.height)

    if(keys.right.pressed && player.position.x < 600){
        player.velocity.x = 5
    }else if (keys.left.pressed && player.position.x > 200){
        player.velocity.x = -5
    }else {
        player.velocity.x = 0
        if(keys.right.pressed == true){
            platforms.forEach((platform) => {
                platform.position.x -= 5
            }) 
        }else if(keys.left.pressed == true && platforms[1].position.x < 1590){
            platforms.forEach((platform) => {
                platform.position.x += 5
            }) 
        }
    }

    player.update()
    platforms.forEach((platform) => { // name of variable 
        platform.draw()
    }) 


    //collision detection 
    platforms.forEach((platform) => {
    if((player.position.y + player.height <= platform.position.y) && 
       (player.position.y + player.velocity.y +player.height >= platform.position.y) && 
       (player.position.x + player.width >= platform.position.x) &&
       (player.position.x <= platform.position.x + platform.width)){    
            player.velocity.y = 0
        }
    })
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