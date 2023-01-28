import { HZ_CORE_INFO } from "Hazel/Hazel/Log";
import { Application as _Application } from "Hazel/Hazel/Application";
import { Window } from "./Window";
import { Loop } from "./Loop";

export class Application extends _Application {
    container: HTMLElement;

    constructor(el: HTMLElement) {
        super();
        this.container = el;
        const rect = this.containerRect();
        this.m_Window = Window.create({
            title: "Hazel",
            width: rect.width,
            height: rect.height
        });
        this.m_Loop = Loop.create();
    }

    containerRect() {
        return this.container.getBoundingClientRect()
    }

    run(): void {
        HZ_CORE_INFO("Application running...", this.m_Window);

        this.m_Loop.while(() => {
            this.m_Window.onUpdate();
        });
    }

    static createApplication(el: HTMLElement = document.body): _Application {
        return new Application(el);
    }
}

