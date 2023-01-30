import { Event } from "./Events/Event";
import { Lifecycle } from "./Lifecycle";

export interface WindowProps {
    title: string;
    width: number;
    height: number;
    el?: Element;
}

export const noop = () => {};

export type EventCallBackFn = (e: Event) => void;
export abstract class Window extends Lifecycle {

    getWidth(): number {
        throw new Error("Method not implemented.");
    }
    getHeight(): number {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    setEventCallback(callback: EventCallBackFn): void {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    setVSync(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }

    isVSync(): boolean {
        throw new Error("Method not implemented.");
    }

    // @ts-ignore abstract methods props use in implement.
    static create(props: WindowProps): Window {
        throw new Error("Method not implemented.");
    }

    /** Private */
    protected m_data = {
        title: "",
        width: 0,
        height: 0,
        eventCallback: noop as (event: Event) => void,
    };

}