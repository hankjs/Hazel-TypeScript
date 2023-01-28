import { WindowCloseEvent } from "./events/ApplicationEvent";
import { Event } from "./events/Event";
import { Layer } from "./Layer";
import { LayerStack } from "./LayerStack";
import { Loop } from "./Loop";
import { Window } from "./Window";

export class Application {
    // @ts-ignore abstract methods props use in implement.
    constructor(el?: Element) {
        this.m_LayerStack = new LayerStack();
    }

    run() {
        throw new Error("Method not implemented.");
    }
    
    // @ts-ignore abstract methods props use in implement.
    onEvent(event: Event) {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    pushLayer(layer: Layer) {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    pushOverlay(layer: Layer) {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    static createApplication(el?: Element): Application {
        throw new Error("Method not implemented.");
    }

    protected m_Window!: Window;
    protected m_running = true;
    protected m_Loop!: Loop;
    protected m_LayerStack: LayerStack;

    // @ts-ignore abstract methods props use in implement.
    protected onWindowClose(event: WindowCloseEvent) {
        throw new Error("Method not implemented.");
    }
}
