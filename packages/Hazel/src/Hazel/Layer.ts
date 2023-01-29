import { Event } from "./Events/Event";

export class Layer {
    constructor(name = "Layer") {
        this.m_debugName = name;
    }

    onAttach(): void {
        throw new Error("Method not implemented.");
    }

    onDetach(): void {
        throw new Error("Method not implemented.");
    }

    onUpdate(): void {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    onEvent(event: Event): void {
        throw new Error("Method not implemented.");
    }

    protected m_debugName: string;
}