import { HZ_CORE_INFO } from "Hazel/Hazel/Log";
import { Application as _Application } from "Hazel/Hazel/Application";
import { Window } from "./Window";
import { Loop } from "./Loop";
import { WindowCloseEvent } from "src/Hazel/Hazel/events/ApplicationEvent";
import { Event, EventDispatcher } from "src/Hazel/Hazel/events/Event";
import { Layer } from "src/Hazel/Hazel/Layer";

export class Application extends _Application {
    container: Element ;

    constructor(el: Element ) {
        super();
        this.m_Loop = Loop.create();

        this.container = el;
        const rect = this.containerRect();

        this.m_Window = Window.create({
            el,
            title: "Hazel",
            width: rect.width,
            height: rect.height,
        });
        this.m_Window.setEventCallback(this.onEvent.bind(this));
    }

    containerRect() {
        return this.container.getBoundingClientRect()
    }

    run(): void {
        HZ_CORE_INFO("Application running...");

        this.m_Loop.while(() => {
            for (const layer of this.m_LayerStack) {
                layer.onUpdate();
            }
            this.m_Window.onUpdate();
        });
    }

    pushLayer(layer: Layer): void {
        this.m_LayerStack.push(layer);
    }

    pushOverlay(layer: Layer): void {
        this.m_LayerStack.push(layer);
    }

    onEvent(event: Event): void {
        if (!(event instanceof WindowCloseEvent)) {
            return;
        }
        const dispatcher = new EventDispatcher(event)
        dispatcher.dispatch(WindowCloseEvent, this.onWindowClose.bind(this))

        for (const layer of this.m_LayerStack) {
            layer.onEvent(event);
            if (event.m_Handled) {
                break;
            }
        }
    }

    protected onWindowClose() {
        this.m_running = false;
        this.m_Loop.stop();
        return true;
    }

    static createApplication(el: Element  = document.body): _Application {
        return new Application(el);
    }
}

