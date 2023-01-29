import { listenElementRemove } from "@hazel/share";
import { WindowCloseEvent, WindowResizeEvent } from "../../Hazel/Events/ApplicationEvent";
import { KeyPressedEvent, KeyReleasedEvent, KeyTypedEvent } from "../../Hazel/Events/KeyEvent";
import {
    MouseButtonPressedEvent,
    MouseButtonReleasedEvent,
    MouseMovedEvent,
    MouseScrolledEvent,
} from "../../Hazel/Events/MouseEvent";
import { EventCallBackFn, Window as _Window, WindowProps } from "../../Hazel/Window";

const defaultProps = (): WindowProps => ({
    title: "Hazel",
    width: 300,
    height: 300,
});

export class Window extends _Window {
    container: Element = document.body;
    isOutside = false;

    static create(props?: WindowProps): _Window {
        return new Window(props);
    }

    constructor(props?: WindowProps) {
        super();
        this.init(props);
    }

    init(props: WindowProps = defaultProps()) {
        if (props.el) {
            this.container = props.el;
        }
        this.m_data.title = props.title;
        this.m_data.width = props.width;
        this.m_data.height = props.height;

        console.info(
            `Creating window ${props.title} ${props.width} ${props.height}`
        );

        const resizeHandler = () => {
            const rect = this.container.getBoundingClientRect();
            const event = new WindowResizeEvent(rect.width, rect.height);
            this.m_data.eventCallback(event);
        };
        window.addEventListener("resize", resizeHandler);

        const keydownHandler = (event: KeyboardEvent) => {
            if (this.isOutside) return;
            this.m_data.eventCallback(
                new KeyPressedEvent(event.code, event.repeat)
            );
        };
        window.addEventListener("keydown", keydownHandler);

        const keypressHandler = (event: KeyboardEvent) => {
            console.log("event", event);
            if (this.isOutside) return;
            this.m_data.eventCallback(new KeyTypedEvent(event.code));
        };
        window.addEventListener("keypress", keypressHandler);

        const keyupHandler = (event: KeyboardEvent) => {
            if (this.isOutside) return;
            this.m_data.eventCallback(new KeyReleasedEvent(event.code));
        };
        window.addEventListener("keyup", keyupHandler);

        const mousedownHandler = (event: MouseEvent) => {
            if (this.isOutside) return;
            this.m_data.eventCallback(
                new MouseButtonPressedEvent(event.button)
            );
        };
        window.addEventListener("mousedown", mousedownHandler);

        const contextmenuHandler = (event: MouseEvent) => {
            if (this.isOutside) return;
            event.preventDefault();
            event.stopPropagation();
        };
        window.addEventListener("contextmenu", contextmenuHandler);

        const mouseupHandler = (event: MouseEvent) => {
            if (this.isOutside) return;
            this.m_data.eventCallback(
                new MouseButtonReleasedEvent(event.button)
            );
        };
        window.addEventListener("mouseup", mouseupHandler);

        const wheelHandler = (event: WheelEvent) => {
            if (this.isOutside) return;
            event.preventDefault();
            event.stopPropagation();
            this.m_data.eventCallback(
                new MouseScrolledEvent(event.deltaX, event.deltaY)
            );
        };
        window.addEventListener("wheel", wheelHandler, {
            passive: false,
        });

        const mousemoveHandler = (event: MouseEvent) => {
            const { left, top, width, height } =
                this.container.getBoundingClientRect();

            const elementPositionX = left + window.pageXOffset;
            const elementPositionY = top + window.pageYOffset;

            const elX = event.pageX - elementPositionX;
            const elY = event.pageY - elementPositionY;

            this.isOutside =
                width === 0 ||
                height === 0 ||
                elX < 0 ||
                elY < 0 ||
                elX > width ||
                elY > height;
            if (this.isOutside) return;
            this.m_data.eventCallback(new MouseMovedEvent(elX, elY));
        };
        window.addEventListener("mousemove", mousemoveHandler);

        listenElementRemove(this.container, () => {
            const event = new WindowCloseEvent();
            this.m_data.eventCallback(event);

            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keypress", keypressHandler);
            window.removeEventListener("keyup", keyupHandler);
            window.removeEventListener("mousedown", mousedownHandler);
            window.removeEventListener("contextmenu", contextmenuHandler);
            window.removeEventListener("mouseup", mouseupHandler);
            window.removeEventListener("wheel", wheelHandler, {
                passive: false,
            } as EventListenerOptions);
            window.removeEventListener("mousemove", mousemoveHandler);
        });
    }

    onUpdate(): void {
    }

    setEventCallback(callback: EventCallBackFn) {
        this.m_data.eventCallback = callback;
    }
}
