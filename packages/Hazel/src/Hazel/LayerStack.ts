import { Layer } from "./Layer";

export class LayerStack {
    constructor() {
        this.m_layers = [];
    }

    push(layer: Layer) {
        this.m_layers.push(layer);
    }
    pushOverlay(overlay: Layer) {
        this.m_layers[this.m_layers.length - 1] = overlay;
    }

    pop() {
        return this.m_layers.pop();
    }

    get begin() {
        return this.m_layers.at(0);
    }
    get end() {
        return this.m_layers.at(-1);
    }

    [Symbol.iterator]() {
        let i = -1;
        return {
            next: () => {
                i++;
                if (i === this.m_layers.length) {
                    return { done: true, value: this.m_layers[i] };
                }

                return { done: false, value: this.m_layers[i] };
            },
        };
    }

    protected m_layers: Layer[];
}
