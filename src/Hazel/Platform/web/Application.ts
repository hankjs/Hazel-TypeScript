import { HZ_CORE_INFO, HZ_CORE_TRACE } from "Hazel/Hazel/Log";
import { Application as _Application } from "Hazel/Hazel/Application";
import { Window } from "./Window";
import { Loop } from "./Loop";
import { WindowCloseEvent } from "src/Hazel/Hazel/events/ApplicationEvent";
import { Event, EventDispatcher } from "src/Hazel/Hazel/events/Event";

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
            this.m_Window.onUpdate();
        });
    }

    onEvent(event: Event): void {
        if (!(event instanceof WindowCloseEvent)) {
            return;
        }
        const dispatcher = new EventDispatcher(event)
        dispatcher.dispatch(WindowCloseEvent, this.onWindowClose.bind(this))

		HZ_CORE_TRACE(event);
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

