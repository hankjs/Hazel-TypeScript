import { Loop as _Loop } from "Hazel/Hazel/Loop";

export class Loop extends _Loop {
    #stop = false;

    constructor() {
        super();
    }

    start() {
        this.#stop = false;
    }

    stop() {
        this.#stop = true;
    }

    while(segment: CallableFunction) {
        this.tick(segment);
    }

    async tick(fn: CallableFunction) {
        if (this.#stop) {
            return;
        }
        await fn();
        window.requestAnimationFrame(() => {
            this.tick(fn);
        });
    }

    static create() {
        return new Loop();
    }
}
