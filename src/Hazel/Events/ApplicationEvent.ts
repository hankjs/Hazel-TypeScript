import { EventCategory, eventClassCategory, eventClassType, Event } from "./Event";

@eventClassCategory(EventCategory.EventCategoryApplication)
@eventClassType("WindowResize")
export class WindowResizeEvent extends Event {
    constructor(
        private width: number,
        private height: number
    ) { super(); }

    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

    toString(): string {
        return `WindowResizeEvent: ${this.width}, ${this.height}`;
    }
}

@eventClassCategory(EventCategory.EventCategoryApplication)
@eventClassType("WindowClose")
export class WindowCloseEvent extends Event {
}

@eventClassCategory(EventCategory.EventCategoryApplication)
@eventClassType("AppTick")
export class AppTickEvent extends Event {
}

@eventClassCategory(EventCategory.EventCategoryApplication)
@eventClassType("AppUpdate")
export class AppUpdateEvent extends Event {
}

@eventClassCategory(EventCategory.EventCategoryApplication)
@eventClassType("AppRender")
export class AppRenderEvent extends Event {
}
