//setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

ctx.strokeStyle = 'white';
ctx.linewidth = 15;
console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.25, 'Indigo');
gradient.addColorStop(0.5, 'cyan');
gradient.addColorStop(0.75, 'magenta');
gradient.addColorStop(1, 'navy');
ctx.fillStyle = 'red'; 
ctx.fillStyle = gradient;

class Particle{
    constructor(effect){
        this.effect= effect;
        this.radius = Math.random() * 10 + 5;
        this.x = this.radius + Math.random() * (this.effect.width- this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect. height - this.radius * 2);
        this.vx = Math.random() * 3;
        this.vy = Math.random() * 3;
        this.gravity =1;
        this.bouncefactor = -0.8
        this.time=0
    }
    draw(context){
        //context.fillStyle = "hsl(" + this.x * 0.5 + ", 90%, 50%"; //color
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *4);
        context.fill();
        context.stroke();
    }
    update(){
        
        this.x += this.vx;
        if (this.x > this.effect.width || this.x < 0) this.vx *= -1;
  
        this.y += this.vy;
        this.vy += this.gravity;
        //if (this.y > this.effect.height || this.y < 0) this.vy += this.gravity;

        if (this.y > this.effect.height-this.radius){ this.vy *= this.bouncefactor;
     
       
    }
    }

    
}
class Effect{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 80;
        this.createParticles();
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context){
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
}

const effect = new Effect(canvas);

function animate(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
	requestAnimationFrame(animate);
};
animate();