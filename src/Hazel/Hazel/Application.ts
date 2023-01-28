import { WindowCloseEvent } from "./events/ApplicationEvent";
import { Event } from "./events/Event";
import { Loop } from "./Loop";
import { Window } from "./Window";

export class Application {
    // @ts-ignore abstract methods props use in implement.
    constructor(el?: Element) {}

    run() {
        throw new Error("Method not implemented.");
    }
    
    // @ts-ignore abstract methods props use in implement.
    onEvent(event: Event) {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    static createApplication(el?: Element): Application {
        throw new Error("Method not implemented.");
    }

    protected m_Window!: Window;
    protected m_running = true;
    protected m_Loop!: Loop;

    // @ts-ignore abstract methods props use in implement.
    protected onWindowClose(event: WindowCloseEvent) {
        throw new Error("Method not implemented.");
    }
}
