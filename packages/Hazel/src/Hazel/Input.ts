import { Lifecycle } from "./Lifecycle";

let s_Instance: Input;

export abstract class Input extends Lifecycle {
    static create(): Input {
        throw new Error("Method not implemented.");
    }
    static isKeyPressed(keycode: string): boolean {
        return s_Instance.isKeyPressedImpl(keycode);
    }

    // @ts-ignore abstract methods props use in implement.
    static isMouseButtonPressed(button: number): boolean {
        return s_Instance.isMouseButtonPressedImpl(button);
    }

    static getMousePosition(): [x: number, y: number] {
        return s_Instance.getMousePositionImpl();
    }

    static getMouseX(): number {
        return s_Instance.getMouseXImpl();
    }

    static getMouseY(): number {
        return s_Instance.getMouseYImpl();
    }

    static getInstance() {
        return s_Instance;
    }
    static setInstance(instance: Input): void {
        s_Instance = instance;
    }

    // @ts-ignore abstract methods props use in implement.
    isKeyPressedImpl(keycode: string): boolean {
        throw new Error("Method not implemented.");
    }
    // @ts-ignore abstract methods props use in implement.
    isMouseButtonPressedImpl(button: number): boolean {
        throw new Error("Method not implemented.");
    }

    getMousePositionImpl(): [x: number, y: number] {
        throw new Error("Method not implemented.");
    }
    getMouseXImpl(): number {
        throw new Error("Method not implemented.");
    }
    getMouseYImpl(): number {
        throw new Error("Method not implemented.");
    }

}