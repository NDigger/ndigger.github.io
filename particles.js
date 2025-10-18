import { Vector2, Anchor } from "./utils.js";

class Particle {
    anchor = Anchor.TOP_LEFT;
    id = 0;
    element = null;
    container = null;
    position = new Vector2(0, 0);
    speed = 1;
    lifetime = 1;
    angle = 0;

    insertIntoHTML() {
        this.element.id = this.id.toString();
        this.container.appendChild(this.element);
    }

    removeFromHTML() {
        document.getElementById(this.id.toString())?.remove();
    }

    move(vec2) {
        this.position.x += vec2.x;
        this.position.y += vec2.y;
        if (this.anchor === Anchor.TOP_LEFT || this.anchor === Anchor.TOP || this.anchor === Anchor.TOP_RIGHT)
            this.element.style.top = `${this.position.y}px`
        if (this.anchor === Anchor.TOP_RIGHT || this.anchor === Anchor.RIGHT || this.anchor === Anchor.BOTTOM_RIGHT)
            this.element.style.right = `${this.position.x}px`
        if (this.anchor === Anchor.BOTTOM_RIGHT || this.anchor === Anchor.BOTTOM || this.anchor === Anchor.BOTTOM_LEFT)
            this.element.style.bottom = `${this.position.y}px`
        if (this.anchor === Anchor.BOTTOM_LEFT || this.anchor === Anchor.LEFT || this.anchor === Anchor.TOP_LEFT)
            this.element.style.left = `${this.position.x}px`
    }
}

export class ParticleEmitter {
    element = null; // ELEMENT MUST HAVE AN ABSOLUTE POSITION IN ORDER TO WORK
    container = null;
    emissionEnabled = false;
    particles = [];
    offset = new Vector2(0, 0);
    speed = 1;
    lifetime = 1;
    emission = 30;
    angle = 0;
    angleVariation = 0;
    
    #currentParticleId = 0;
    #emissionTimer = 0;
    #afId = null;

    constructor() {
        requestAnimationFrame(() => this.#update())
    }
    
    #update() {
        this.#afId = requestAnimationFrame(() => this.#update());
        this.#emissionTimer -= 1/60;
        if (this.#emissionTimer < 0 && this.emissionEnabled) { 
            this.#emissionTimer = this.lifetime / this.emission;
            this.emit(1)
        }
        this.particles.forEach(p => {
            p.move(new Vector2(Math.cos(p.angle) * p.speed, Math.sin(p.angle) * p.speed));
            p.lifetime -= 1/60;
        })
        this.particles = this.particles.filter(p => {
            if (p.lifetime < 0) {
                p.removeFromHTML();
                return false;
            }
            return true;
        });
    }

    emit(count) {
        for (let i = 0; i < count; i++) {
            const p = new Particle()
            p.angle = this.angle + (Math.random()-.5) * this.angleVariation;
            p.speed = this.speed;
            p.position = this.offset.duplicate();
            p.id = this.#currentParticleId++;
            p.element = this.element.cloneNode(false);
            p.container = this.container;
            p.anchor = Anchor.TOP_RIGHT;
            p.lifetime = this.lifetime;
            p.insertIntoHTML();
            this.particles.push(p);
        }
    }
}
