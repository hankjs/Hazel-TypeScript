import { Loop as _Loop } from "../../Hazel/Loop";

export class Loop extends _Loop {

    segment!: CallableFunction;

    constructor() {
        super();
    }

    while(segment: CallableFunction) {
        this.segment = segment;
        window.requestAnimationFrame(this.tick.bind(this));
    }

    async tick() {
        if (this.m_stop) {
            return;
        }
        await this.segment();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    static create() {
        return new Loop();
    }
}
