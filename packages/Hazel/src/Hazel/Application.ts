import { WindowCloseEvent } from "./Events/ApplicationEvent";
import { Event } from "./Events/Event";
import { Layer } from "./Layer";
import { LayerStack } from "./LayerStack";
import { Loop } from "./Loop";
import { Window } from "./Window";

let s_Instance: Application | null = null;
export class Application {

    static getInstance(): Application {
        return s_Instance!;
    }

    // @ts-ignore abstract methods props use in implement.
    constructor(el?: Element) {
        console.assert(!Application.getInstance(), "Application already exists!");
        s_Instance = this;
        this.m_LayerStack = new LayerStack();
    }

    run() {
        throw new Error("Method not implemented.");
    }
    
    // @ts-ignore abstract methods props use in implement.
    onEvent(event: Event) {
        throw new Error("Method not implemented.");
    }

    pushLayer(layer: Layer): void {
        this.m_LayerStack.push(layer);
		layer.onAttach();
    }

    pushOverlay(layer: Layer): void {
        this.m_LayerStack.push(layer);
		layer.onAttach();
    }

    // @ts-ignore abstract methods props use in implement.
    static createApplication(el?: Element): Application {
        throw new Error("Method not implemented.");
    }

    protected m_Window!: Window;
    getWindow() {
        return this.m_Window
    }
    protected m_running = true;
    protected m_Loop!: Loop;
    protected m_LayerStack: LayerStack;

    // @ts-ignore abstract methods props use in implement.
    protected onWindowClose(event: WindowCloseEvent) {
        throw new Error("Method not implemented.");
    }
}
