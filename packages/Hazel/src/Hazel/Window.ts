import { Event } from "./Events/Event";
import { Lifecycle } from "./Lifecycle";

export interface WindowProps<E = Element> {
    title: string;
    width: number;
    height: number;
    el?: E;
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
    static create<P extends WindowProps<any>>(props: P): Window {
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