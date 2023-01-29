import { EventCategory, eventClassCategory, eventClassType, Event } from "./Event";

@eventClassCategory(EventCategory.EventCategoryMouse | EventCategory.EventCategoryInput)
@eventClassType("MouseMoved")
export class MouseMovedEvent extends Event {
    constructor(
        protected m_MouseX: number,
        protected m_MouseY: number,
    ) { super(); }

    getX() {
        return this.m_MouseX;
    }
    getY() {
        return this.m_MouseY;
    }

    toString(): string {
        return `MouseMovedEvent: ${this.m_MouseX}, ${this.m_MouseY}`;
    }
}

@eventClassCategory(EventCategory.EventCategoryMouse | EventCategory.EventCategoryInput)
@eventClassType("MouseScrolled")
export class MouseScrolledEvent extends Event {
    constructor(
        protected m_XOffset: number,
        protected m_YOffset: number,
    ) { super(); }

    getXOffset() {
        return this.m_XOffset;
    }

    getYOffset() {
        return this.m_YOffset;
    }

    toString(): string {
        return `MouseScrolledEvent: ${this.m_XOffset}, ${this.m_YOffset}`;
    }
}

@eventClassCategory(EventCategory.EventCategoryMouse | EventCategory.EventCategoryInput)
export class MouseButtonEvent extends Event {
    constructor(
        protected m_Button: number,
    ) { super(); }
}

@eventClassType("MouseButtonPressed")
export class MouseButtonPressedEvent extends MouseButtonEvent {
    constructor(
        button: number,
    ) {
        super(button);
    }

    toString(): string {
        return `MouseButtonPressedEvent: ${this.m_Button}`;
    }
}

@eventClassType("MouseButtonReleased")
export class MouseButtonReleasedEvent extends MouseButtonEvent {
    constructor(
        button: number,
    ) {
        super(button);
    }

    toString(): string {
        return `MouseButtonReleasedEvent: ${this.m_Button}`;
    }
}
