import { Color } from './structures.js';

const linear = (t) => t;
const ease_in = (t, _pow = 3) => Math.pow(t, _pow);
const ease_out = (t, _pow = 3) => 1 - Math.pow(1 - t, _pow);
const ease_in_out = (t, _pow = 3) => {
	if (t < 0.5) return 0.5 * Math.pow(t * 2.0, _pow);
	else return 1.0 - 0.5 * Math.pow(2.0 * (1.0 - t), _pow);
}
const back_in = (t, _pow = 1) => {
	var s = _pow * 1.70158;
	return t * t * ((s + 1) * t - s);
}
const back_out = (t, _pow = 1) => {
	var s = _pow * 1.70158;
	var t1 = t - 1;
	return (t1 * t1 * ((s + 1) * t1 + s) + 1);
}
const back_in_out = (t, _pow = 1) => {
	var s = _pow * 1.70158;
	if (t < 0.5) {
		var t1 = 2 * t;
		return 0.5 * (t1 * t1 * ((s + 1) * t1 - s));
    } else {
		var t1 = 2 * t - 2;
		return 0.5 * (t1 * t1 * ((s + 1) * t1 + s) + 2);
    }
}
const bounce_in = (t, _pow = 3) => 1.0 - bounce_out(1.0 - t, _pow);
const bounce_out = (t, _pow = 3) => {
	if (t < 0.75) return 1 - Math.pow(1 - t, _pow);
	else return 1 - Math.pow(1 - t, _pow) + (sin((t - 0.75) * PI * 4) * 0.1 * (1 - t));
}
const bounce_in_out = (t, _pow = 3) => {
	if (t < 0.5) return 0.5 * bounce_in(t * 2.0, _pow);
	else return 0.5 * bounce_out(t * 2.0 - 1.0, _pow) + 0.5;
}
const exponential_in = (t, _pow = 1) => t > 0 ? Math.pow(2, (_pow * (t - 1))) : 0;
const exponential_out = (t, _pow = 1) => t < 1 ? 1.0 - Math.pow(2, -_pow * t) : 1.0;
const sine_in = (t, _pow = 1) => 1.0 - Math.cos(t * PI * 0.5);
const sine_out = (t, _pow = 1) => Math.sin(t * PI * 0.5);

export const Easing = Object.freeze({
    LINEAR: linear,
    EASE_IN: ease_in,
    EASE_OUT: ease_out,
    EASE_IN_OUT: ease_in_out,
    BACK_IN: back_in,
    BACK_OUT: back_out,
    BACK_IN_OUT: back_in_out,
    BOUNCE_IN: bounce_in,
    BOUNCE_OUT: bounce_out,
    BOUNCE_IN_OUT: bounce_in_out,
    EXPONENTIAL_IN: exponential_in,
    EXPONENTIAL_OUT: exponential_out,
    SINE_IN: sine_in,
    SINE_OUT: sine_out
})

/* Supports Number and Color */
export class Lerp {
    #runId = 0;
    value = 0;
    setter = () => {};
    #from = 0;

    async run(to, timeSeconds, easing = null, easingPow = null) {
        this.#runId++;
        this.#from = this.value.duplicate();
        const currentRunId = this.#runId;
        const loopLength = Math.max(1, Math.floor(timeSeconds * 100));

        for (let i = 0; i <= loopLength; i++) {
        if (currentRunId !== this.#runId) return false;

        let t = i / loopLength;
        if (easing) {
            if (easingPow) {
            t = easing(t, easingPow);
            } else {
            t = easing(t);
            }
        }

        const isFromToInstanceOf = variant =>
        (variant === Number ? typeof this.#from === 'number' && typeof to === 'number' 
                            : this.#from instanceof variant && to instanceof variant);

        if (isFromToInstanceOf(Color)) {
            this.value.r = this.#lerp(this.#from.r, to.r, t);
            this.value.g = this.#lerp(this.#from.g, to.g, t);
            this.value.b = this.#lerp(this.#from.b, to.b, t);
            if (to.a != null) this.value.a = this.#lerp(this.#from.a, to.a, t);
        } else if (isFromToInstanceOf(Number)) {
            this.value = this.#lerp(this.#from, to, t);
        }

        if (this.setter) this.setter(this.value);

        await new Promise(resolve =>
            setTimeout(resolve, (timeSeconds / loopLength) * 1000)
        );
        }

        return true;
    }

    apply(value) {
        this.#runId++;
        this.value = value;
        this.setter(value);
    }

    #lerp(a, b, t) {
        return a + (b - a) * t;
    }
}

export default { Easing, Lerp }