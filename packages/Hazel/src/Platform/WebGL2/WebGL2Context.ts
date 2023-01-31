export let gl: WebGL2RenderingContext;

function setGL(context: WebGL2RenderingContext) {
    gl = context;
}

export class WebGL2Context {
    constructor(canvas?: HTMLElement) {
        if (!canvas || canvas.tagName !== "CANVAS") {
            canvas = document.createElement("canvas");
        }
        this.#canvas = canvas as HTMLCanvasElement;
    }

    init() {
        const context = this.#canvas.getContext("webgl2");
        if (!context) {
            throw new Error("Failed to initialize WebGLContext: webgl2 not supports.");
        }
        setGL(context);
        this.#context = context;

        console.info("WebGL2 Info:");
        console.info("  Vendor:    ", context.VENDOR);
        console.info("  Renderer:  ", context.RENDERER);
        console.info("  Version:   ", context.VERSION);
    }

    getContext() {
        return this.#context;
    }
    getContainer() {
        return this.#canvas;
    }

    #canvas: HTMLCanvasElement;
    #context: WebGL2RenderingContext | null = null;
}