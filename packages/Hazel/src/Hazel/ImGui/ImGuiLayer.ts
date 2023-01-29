import { Event, EventDispatcher } from "../Events/Event";
import { Layer } from "../Layer";
import * as ImGui from "@hazel/imgui";
import * as ImGui_Impl from "../../Platform/OpenGL/imgui_impl";
import { AddFontFromFileTTF } from "./utils";
import fontURL from "../../assets/fonts/Roboto-Medium.ttf";
import { ShowDemoWindow } from "../../Platform/OpenGL/imgui_demo";
import { MemoryEditor } from "../../Platform/OpenGL/imgui_memory_editor";
import { MouseButtonPressedEvent, MouseButtonReleasedEvent, MouseMovedEvent, MouseScrolledEvent } from "../Events/MouseEvent";
import { KeyPressedEvent, KeyReleasedEvent, KeyTypedEvent } from "../Events/KeyEvent";
import { WindowResizeEvent } from "../Events/ApplicationEvent";
import { key2Num } from "@hazel/share";

let font: ImGui.Font | null = null;
// Our state
let show_demo_window: boolean = true;
let show_another_window: boolean = false;
const clear_color: ImGui.Vec4 = new ImGui.Vec4(0.45, 0.55, 0.6, 1.0);

const memory_editor: MemoryEditor = new MemoryEditor();
memory_editor.Open = false;

/* static */ let f: number = 0.0;
/* static */ let counter: number = 0;
let done: boolean = false;
let isInit = false;

export class ImGuiLayer extends Layer {
    constructor(name: string = "ImGuiLayer") {
        super(name);
    }

    async onAttach() {
        await ImGui.default();
        isInit = true;

        const EMSCRIPTEN_VERSION = `${ImGui.bind.__EMSCRIPTEN_major__}.${ImGui.bind.__EMSCRIPTEN_minor__}.${ImGui.bind.__EMSCRIPTEN_tiny__}`;
        console.log("Emscripten Version", EMSCRIPTEN_VERSION);

        console.log(
            "Total allocated space (uordblks) @ _init:",
            ImGui.bind.mallinfo().uordblks
        );

        // Setup Dear ImGui context
        ImGui.CHECKVERSION();
        ImGui.CreateContext();
        const io: ImGui.IO = ImGui.GetIO();
        //io.ConfigFlags |= ImGui.ConfigFlags.NavEnableKeyboard;     // Enable Keyboard Controls
        //io.ConfigFlags |= ImGui.ConfigFlags.NavEnableGamepad;      // Enable Gamepad Controls

        // Setup Dear ImGui style
        ImGui.StyleColorsDark();
        //ImGui.StyleColorsClassic();

        // Load Fonts
        // - If no fonts are loaded, dear imgui will use the default font. You can also load multiple fonts and use ImGui::PushFont()/PopFont() to select them.
        // - AddFontFromFileTTF() will return the ImFont* so you can store it if you need to select the font among multiple.
        // - If the file cannot be loaded, the function will return NULL. Please handle those errors in your application (e.g. use an assertion, or display an error and quit).
        // - The fonts will be rasterized at a given size (w/ oversampling) and stored into a texture when calling ImFontAtlas::Build()/GetTexDataAsXXXX(), which ImGui_ImplXXXX_NewFrame below will call.
        // - Read 'docs/FONTS.md' for more instructions and details.
        // - Remember that in C/C++ if you want to include a backslash \ in a string literal you need to write a double backslash \\ !
        io.Fonts.AddFontDefault();
        font = await AddFontFromFileTTF(fontURL, 16.0);
        // font = await AddFontFromFileTTF("../imgui/misc/fonts/Cousine-Regular.ttf", 15.0);
        // font = await AddFontFromFileTTF("../imgui/misc/fonts/DroidSans.ttf", 16.0);
        // font = await AddFontFromFileTTF("../imgui/misc/fonts/ProggyTiny.ttf", 10.0);
        // font = await AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
        // font = await AddFontFromFileTTF("https://raw.githubusercontent.com/googlei18n/noto-cjk/master/NotoSansJP-Regular.otf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
        ImGui.ASSERT(font !== null);

        // Setup Platform/Renderer backends
        // ImGui_ImplSDL2_InitForOpenGL(window, gl_context);
        // ImGui_ImplOpenGL3_Init(glsl_version);
        if (typeof window !== "undefined") {
            const output: HTMLElement =
                document.getElementById("output") || document.body;
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            output.appendChild(canvas);
            canvas.tabIndex = 1;
            canvas.style.position = "absolute";
            canvas.style.left = "0px";
            canvas.style.right = "0px";
            canvas.style.top = "0px";
            canvas.style.bottom = "0px";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.userSelect = "none";
            ImGui_Impl.Init(canvas);
        } else {
            ImGui_Impl.Init(null);
        }
    }

    onDetach(): void {}

    onUpdate(): void {
        if (!isInit) {
            return;
        }
        // Poll and handle events (inputs, window resize, etc.)
        // You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
        // - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application.
        // - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application.
        // Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.

        // Start the Dear ImGui frame
        ImGui_Impl.NewFrame(Date.now());
        ImGui.NewFrame();

        // 1. Show the big demo window (Most of the sample code is in ImGui::ShowDemoWindow()! You can browse its code to learn more about Dear ImGui!).
        if (!done && show_demo_window) {
            done = /*ImGui.*/ ShowDemoWindow(
                (value = show_demo_window) => (show_demo_window = value)
            );
        }

        // 2. Show a simple window that we create ourselves. We use a Begin/End pair to created a named window.
        {
            // static float f = 0.0f;
            // static int counter = 0;

            ImGui.Begin("Hello, world!"); // Create a window called "Hello, world!" and append into it.

            ImGui.Text("This is some useful text."); // Display some text (you can use a format strings too)
            ImGui.Checkbox(
                "Demo Window",
                (value = show_demo_window) => (show_demo_window = value)
            ); // Edit bools storing our windows open/close state
            ImGui.Checkbox(
                "Another Window",
                (value = show_another_window) => (show_another_window = value)
            );

            ImGui.SliderFloat("float", (value = f) => (f = value), 0.0, 1.0); // Edit 1 float using a slider from 0.0f to 1.0f
            ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats representing a color

            if (ImGui.Button("Button"))
                // Buttons return true when clicked (NB: most widgets return true when edited/activated)
                counter++;
            ImGui.SameLine();
            ImGui.Text(`counter = ${counter}`);

            ImGui.Text(
                `Application average ${(
                    1000.0 / ImGui.GetIO().Framerate
                ).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(
                    1
                )} FPS)`
            );

            ImGui.Checkbox(
                "Memory Editor",
                (value = memory_editor.Open) => (memory_editor.Open = value)
            );
            if (memory_editor.Open)
                memory_editor.DrawWindow(
                    "Memory Editor",
                    ImGui.bind.HEAP8.buffer
                );
            const mi: ImGui.Bind.mallinfo = ImGui.bind.mallinfo();
            // ImGui.Text(`Total non-mmapped bytes (arena):       ${mi.arena}`);
            // ImGui.Text(`# of free chunks (ordblks):            ${mi.ordblks}`);
            // ImGui.Text(`# of free fastbin blocks (smblks):     ${mi.smblks}`);
            // ImGui.Text(`# of mapped regions (hblks):           ${mi.hblks}`);
            // ImGui.Text(`Bytes in mapped regions (hblkhd):      ${mi.hblkhd}`);
            ImGui.Text(`Max. total allocated space (usmblks):  ${mi.usmblks}`);
            // ImGui.Text(`Free bytes held in fastbins (fsmblks): ${mi.fsmblks}`);
            ImGui.Text(`Total allocated space (uordblks):      ${mi.uordblks}`);
            ImGui.Text(`Total free space (fordblks):           ${mi.fordblks}`);
            // ImGui.Text(`Topmost releasable block (keepcost):   ${mi.keepcost}`);
            if (font) {
                ImGui.PushFont(font);
                ImGui.Text(`${font.GetDebugName()}`);
                if (font.FindGlyphNoFallback(0x5929)) {
                    ImGui.Text(`U+5929: \u5929`);
                }
                ImGui.PopFont();
            }

            ImGui.End();
        }

        // 3. Show another simple window.
        if (show_another_window) {
            ImGui.Begin(
                "Another Window",
                (value = show_another_window) => (show_another_window = value),
                ImGui.WindowFlags.AlwaysAutoResize
            );
            ImGui.Text("Hello from another window!");
            if (ImGui.Button("Close Me")) show_another_window = false;
            ImGui.End();
        }

        ImGui.EndFrame();

        // Rendering
        ImGui.Render();
        const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
        if (gl) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(
                clear_color.x,
                clear_color.y,
                clear_color.z,
                clear_color.w
            );
            gl.clear(gl.COLOR_BUFFER_BIT);
            //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
        }

        const ctx: CanvasRenderingContext2D | null = ImGui_Impl.ctx;
        if (ctx) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = `rgba(${clear_color.x * 0xff}, ${
                clear_color.y * 0xff
            }, ${clear_color.z * 0xff}, ${clear_color.w})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
    }

    onEvent(event: Event): void {
        const dispatcher = new EventDispatcher(event);
        dispatcher.dispatch(
            MouseButtonPressedEvent,
            this.onMouseButtonPressedEvent.bind(this)
        );
        dispatcher.dispatch(
            MouseButtonReleasedEvent,
            this.onMouseButtonReleasedEvent.bind(this)
        );
        dispatcher.dispatch(MouseMovedEvent, this.onMouseMovedEvent.bind(this));
        dispatcher.dispatch(
            MouseScrolledEvent,
            this.onMouseScrolledEvent.bind(this)
        );
        dispatcher.dispatch(KeyPressedEvent, this.onKeyPressedEvent.bind(this));
        dispatcher.dispatch(
            KeyReleasedEvent,
            this.onKeyReleasedEvent.bind(this)
        );
        dispatcher.dispatch(KeyTypedEvent, this.onKeyTypedEvent.bind(this));
        dispatcher.dispatch(
            WindowResizeEvent,
            this.onWindowResizeEvent.bind(this)
        );
    }

    onMouseButtonPressedEvent(event: MouseButtonPressedEvent): boolean {
        const io = ImGui.GetIO();
        io.MouseDown[event.getMouseButton()] = true;

        return false;
    }
    onMouseButtonReleasedEvent(event: MouseButtonReleasedEvent): boolean {
        const io = ImGui.GetIO();
        io.MouseDown[event.getMouseButton()] = false;

        return false;
    }
    onMouseMovedEvent(event: MouseMovedEvent): boolean {
        const io = ImGui.GetIO();
        io.MousePos.x = event.getX();
        io.MousePos.y = event.getY();

        return false;
    }
    onMouseScrolledEvent(event: MouseScrolledEvent): boolean {
        const io = ImGui.GetIO();
        io.MouseWheelH += event.getXOffset();
        io.MouseWheel += event.getYOffset();

        return false;
    }
    onKeyPressedEvent(event: KeyPressedEvent): boolean {
        const io = ImGui.GetIO();
        io.KeysDown[event.getKeyCode()] = true;

        return false;
    }
    onKeyReleasedEvent(event: KeyReleasedEvent): boolean {
        const io = ImGui.GetIO();
        io.KeysDown[event.getKeyCode()] = false;

        return false;
    }
    onKeyTypedEvent(event: KeyTypedEvent): boolean {
        const io = ImGui.GetIO();
        const keyCode = event.getKeyCode();
        if (keyCode > 0 && keyCode < 0x10000) {
            io.AddInputCharacter(keyCode);
        }

        return false;
    }
    onWindowResizeEvent(event: WindowResizeEvent): boolean {
        const io = ImGui.GetIO();
        io.DisplaySize.x = event.getWidth();
        io.DisplaySize.y = event.getHeight();
        io.DisplayFramebufferScale.x = 1;
        io.DisplayFramebufferScale.y = 1;

        return false;
    }
}
