import { BIT } from "../utils";

export enum EventType {
    None = 0,
    WindowClose, WindowResize, WindowFocus, WindowLostFocus, WindowMoved,
    AppTick, AppUpdate, AppRender,
    KeyPressed, KeyReleased,
    MouseButtonPressed, MouseButtonReleased, MouseMoved, MouseScrolled
}

export enum EventCategory {
    None = 0,
    EventCategoryApplication = BIT(0),
    EventCategoryInput = BIT(1),
    EventCategoryKeyboard = BIT(2),
    EventCategoryMouse = BIT(3),
    EventCategoryMouseButton = BIT(4)
};

/**
 * Descriptor
 * @param eventType 
 * @returns 
 */
export function eventClassType(eventType: keyof typeof EventType) {
    return function (target: any) {
        Object.assign(target, {
            getStaticType() {
                return EventType[eventType];
            }
        });
        Object.assign(target.prototype, {
            getEventType() {
                return target.getStaticType();
            },
            getName() {
                return eventType;
            }
        });
    }
}

/**
 * Descriptor
 * @param eventCategory 
 * @returns 
 */
export function eventClassCategory(eventCategory: EventCategory) {
    return function (target: any) {
        Object.assign(target.prototype, {
            getCategoryFlags() {
                return eventCategory;
            }
        });
    }
}
export abstract class Event {
    getEventType(): EventType {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getCategoryFlags(): EventCategory {
        throw new Error("Method not implemented.");
    }
    static getStaticType(): EventType {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        return this.toString();
    }

    isInCategory(category: EventCategory) {
        return Boolean(this.getCategoryFlags() & category);
    }

    m_Handled = false;
}

export class EventDispatcher {

    constructor(event: Event) {
        this.m_Event = event;
    }

    dispatch(event: typeof Event, func: (event: Event) => boolean) {
        if (this.m_Event.getEventType() === event.getStaticType()) {
            this.m_Event.m_Handled = func(this.m_Event);
        }
    }

    private m_Event: Event;
}
