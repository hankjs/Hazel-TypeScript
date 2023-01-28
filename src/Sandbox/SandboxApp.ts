import { Hazel, HZ_INFO, HZ_TRACE } from "Hazel/index";
import { Event } from "src/Hazel/Hazel/events/Event";

class ExampleLayer extends Hazel.Layer {
    constructor(name: string = "Example") {
        super(name);
    }

    onUpdate(): void {
        HZ_INFO(`${this.m_debugName}::Update`)
    }

    onEvent(event: Event): void {
        HZ_TRACE(`${this.m_debugName}::Event`, event);
    }
}

export class Sandbox extends Hazel.Application {
    constructor(el?: Element) {
        super(el);

        this.pushLayer(new ExampleLayer());
    }

    static createApplication(el?: Element): Hazel.Application {
        return new Sandbox(el);
    }
}