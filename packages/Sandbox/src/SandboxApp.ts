import { Hazel } from "@hazel/hazel";

class ExampleLayer extends Hazel.Layer {
    constructor(name: string = "Example") {
        super(name);
    }

    onAttach(): void { }
    onUpdate(): void { }

    onEvent(event: Hazel.Event): void {
        console.trace(`${this.m_debugName}::Event`, event);
    }
}

export class Sandbox extends Hazel.Application {
    constructor(el?: Element) {
        super(el);

        this.pushLayer(new ExampleLayer());
        this.pushOverlay(new Hazel.ImGuiLayer());
    }

    static createApplication(el?: Element): Hazel.Application {
        return new Sandbox(el);
    }
}