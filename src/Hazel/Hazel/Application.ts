import { Loop } from "./Loop";
import { Window } from "./Window";

export class Application {
    // @ts-ignore abstract methods props use in implement.
    constructor(el?: HTMLElement) { }

    run() {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    static createApplication(el?: HTMLElement): Application {
        throw new Error("Method not implemented.");
    }

    protected m_Window!: Window;
    protected m_running = true;
    protected m_Loop!: Loop;
}
