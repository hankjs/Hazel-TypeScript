import { HZ_CORE_INFO } from "Hazel/Hazel/Log";
import { Window as _Window, WindowProps } from "src/Hazel/Hazel/Window";

const defaultProps = (): WindowProps => ({
    title: "Hazel",
    width: 300,
    height: 300
})

export class Window extends _Window {
    static create(props?: WindowProps): _Window {
        return new Window(props);
    }

    constructor(props?: WindowProps) {
        super();
        this.init(props);
    }

    init(props: WindowProps = defaultProps()) {
        this.m_data.title = props.title;
        this.m_data.width = props.width;
        this.m_data.height = props.height;

        HZ_CORE_INFO(`Creating window ${props.title}`);
    }

    onUpdate(): void {
        HZ_CORE_INFO("Window Update");
    }
}