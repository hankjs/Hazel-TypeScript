import { Application as _Application } from "../../Hazel/Application";
import { Window } from "./Window";
import { Loop } from "./Loop";
import { WindowCloseEvent } from "../../Hazel/Events/ApplicationEvent";
import { Event, EventDispatcher } from "../../Hazel/Events/Event";

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
        console.info("Application running...");

        this.m_Loop.while(() => {
            for (const layer of this.m_LayerStack) {
                layer.onUpdate();
            }
            this.m_Window.onUpdate();
        });
    }


    onEvent(event: Event): void {
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

