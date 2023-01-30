import { Hazel } from "@hazel/hazel";
import { KeyCodes } from "@hazel/share/src";

class ExampleLayer extends Hazel.Layer {
    constructor(name: string = "Example") {
        super(name);
    }

    onAttach(): void { }
    onUpdate(): void {
        if (Hazel.Input.isKeyPressed(KeyCodes.KeyA)) {
            console.info("KeyA key is pressed (poll)!")
        }
    }

    onEvent(event: Hazel.Event): void {
        if (event.getEventType() === Hazel.EventType.KeyPressed) {
            const e = event as Hazel.KeyEvent;
            if (e.getKeyCode() === KeyCodes.KeyS) {
                console.info("KeyS key is pressed (event)!")
            }
        }
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