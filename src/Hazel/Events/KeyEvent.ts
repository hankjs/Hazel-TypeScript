import { EventCategory, eventClassCategory, eventClassType, Event } from "./Event";

@eventClassCategory(EventCategory.EventCategoryKeyboard | EventCategory.EventCategoryInput)
export class KeyEvent extends Event {
    constructor(
        protected m_keyCode: number
    ) { super(); }

    getKeyCode() {
        return this.m_keyCode;
    }
}

@eventClassType("KeyPressed")
export class KeyPressedEvent extends KeyEvent {
    constructor(
        keycode: number,
        private m_repeatCount: number
    ) {
        super(keycode);
    }

    getRepeatCount() {
        return this.m_repeatCount;
    }

    toString(): string {
        return `KeyPressedEvent: ${this.m_keyCode} (${this.m_repeatCount} repeats)`;
    }
}

@eventClassType("KeyReleased")
export class KeyReleasedEvent extends KeyEvent {
    constructor(
        keycode: number,
    ) {
        super(keycode);
    }

    toString(): string {
        return `KeyReleasedEvent: ${this.m_keyCode}`;
    }
}
