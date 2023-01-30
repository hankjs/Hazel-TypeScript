export function listenElementRemove(el: Element, listener: () => void) {
    const config = { attributes: false, childList: true, subtree: false };

    const callback = (mutationList: MutationRecord[]) => {
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                let isRemove = false;
                mutation.removedNodes.forEach((node) => {
                    if (node === el) {
                        isRemove = true;
                    }
                });
                if (isRemove) {
                    listener();
                    observer.disconnect();
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(el.parentElement!, config);
}

export enum KeyCodes {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    PauseBreak = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,

    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,

    Insert = 45,
    Delete = 46,

    Digit0 = 48,
    ClosedParen = Digit0,
    Digit1 = 49,
    ExclamationMark = Digit1,
    Digit2 = 50,
    AtSign = Digit2,
    Digit3 = 51,
    PoundSign = Digit3,
    Hash = PoundSign,
    Digit4 = 52,
    DollarSign = Digit4,
    Digit5 = 53,
    PercentSign = Digit5,
    Digit6 = 54,
    Caret = Digit6,
    Hat = Caret,
    Digit7 = 55,
    Ampersand = Digit7,
    Digit8 = 56,
    Star = Digit8,
    Asterik = Star,
    Digit9 = 57,
    OpenParen = Digit9,

    KeyA = 65,
    KeyB = 66,
    KeyC = 67,
    KeyD = 68,
    KeyE = 69,
    KeyF = 70,
    KeyG = 71,
    KeyH = 72,
    KeyI = 73,
    KeyJ = 74,
    KeyK = 75,
    KeyL = 76,
    KeyM = 77,
    KeyN = 78,
    KeyO = 79,
    KeyP = 80,
    KeyQ = 81,
    KeyR = 82,
    KeyS = 83,
    KeyT = 84,
    KeyU = 85,
    KeyV = 86,
    KeyW = 87,
    KeyX = 88,
    KeyY = 89,
    KeyZ = 90,

    LeftWindowKey = 91,
    RightWindowKey = 92,
    SelectKey = 93,

    Numpad0 = 96,
    Numpad1 = 97,
    Numpad2 = 98,
    Numpad3 = 99,
    Numpad4 = 100,
    Numpad5 = 101,
    Numpad6 = 102,
    Numpad7 = 103,
    Numpad8 = 104,
    Numpad9 = 105,

    Multiply = 106,
    Add = 107,
    Subtract = 109,
    DecimalPoint = 110,
    Divide = 111,

    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,

    NumLock = 144,
    ScrollLock = 145,

    SemiColon = 186,
    Equals = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    UnderScore = Dash,
    PlusSign = Equals,
    ForwardSlash = 191,
    Tilde = 192,
    GraveAccent = Tilde,

    OpenBracket = 219,
    ClosedBracket = 221,
    Quote = 222
}

export enum MouseButtonCodes {
    Button1 = 0,
    ButtonLeft = Button1,
    Button2 = 1,
    ButtonRight = Button2,
    Button3 = 2,
    ButtonMiddle = Button3,
    Button4 = 3,
    Button5 = 4,
    Button6 = 5,
    Button7 = 6,
    Button8 = 7,
    ButtonLast = Button8,
}

export function key2Num(key: string): number {
    return KeyCodes[key as keyof typeof KeyCodes] || -1;
}
