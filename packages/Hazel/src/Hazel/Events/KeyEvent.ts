import { key2Num } from "@hazel/share/src";
import { EventCategory, eventClassCategory, eventClassType, Event } from "./Event";

@eventClassCategory(EventCategory.EventCategoryKeyboard | EventCategory.EventCategoryInput)
export class KeyEvent extends Event {
    constructor(
        protected code: string
    ) { super(); }

    getKeyCode() {
        return key2Num(this.code);
    }
}

@eventClassType("KeyPressed")
export class KeyPressedEvent extends KeyEvent {
    constructor(
        code: string,
        private m_repeat: boolean
    ) {
        super(code);
    }

    getRepeatCount() {
        return this.m_repeat;
    }

    toString(): string {
        return `KeyPressedEvent: ${this.code} (${this.m_repeat} repeats)`;
    }
}

@eventClassType("KeyReleased")
export class KeyReleasedEvent extends KeyEvent {
    constructor(
        code: string,
    ) {
        super(code);
    }

    toString(): string {
        return `KeyReleasedEvent: ${this.code}`;
    }
}

@eventClassType("KeyTyped")
export class KeyTypedEvent extends KeyEvent {
    constructor(
        code: string,
    ) {
        super(code);
    }

    toString(): string {
        return `KeyTypedEvent: ${this.code}`;
    }
}

