import { EventCategory, eventClassCategory, eventClassType, Event } from "./Event";

@eventClassCategory(EventCategory.EventCategoryKeyboard | EventCategory.EventCategoryInput)
export class KeyEvent extends Event {
    constructor(
        protected m_keyCode: string
    ) { super(); }

    getKeyCode() {
        return this.m_keyCode;
    }
}

@eventClassType("KeyPressed")
export class KeyPressedEvent extends KeyEvent {
    constructor(
        keycode: string,
        private m_repeat: boolean
    ) {
        super(keycode);
    }

    getRepeatCount() {
        return this.m_repeat;
    }

    toString(): string {
        return `KeyPressedEvent: ${this.m_keyCode} (${this.m_repeat} repeats)`;
    }
}

@eventClassType("KeyReleased")
export class KeyReleasedEvent extends KeyEvent {
    constructor(
        keycode: string,
    ) {
        super(keycode);
    }

    toString(): string {
        return `KeyReleasedEvent: ${this.m_keyCode}`;
    }
}
