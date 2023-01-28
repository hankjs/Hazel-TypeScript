import { Loop as _Loop } from "Hazel/Hazel/Loop";

export class Loop extends _Loop {

    constructor() {
        super();
    }

    while(segment: CallableFunction) {
        this.tick(segment);
    }

    async tick(fn: CallableFunction) {
        if (this.m_stop) {
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
