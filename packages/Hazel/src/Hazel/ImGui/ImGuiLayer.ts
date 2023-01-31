import { Layer } from "../Layer";
import * as ImGui from "@hazel/imgui";
import * as ImGui_Impl from "../../Platform/WebGL2/imgui_impl";
import { AddFontFromFileTTF } from "./utils";
import fontURL from "../../assets/fonts/Roboto-Medium.ttf";
import { Application } from "../../Platform/Web";
import { Event } from "../Events";
import { ShowDemoWindow } from "../../Platform/WebGL2/imgui_demo";

let show_demo_window: boolean = true;
let done: boolean = false;
let font: ImGui.Font | null = null;
const clear_color: ImGui.Vec4 = new ImGui.Vec4(0.45, 0.55, 0.60, 1.00);
let isInit = false;

export class ImGuiLayer extends Layer {
    constructor(name: string = "ImGuiLayer") {
        super(name);
    }

    setContext(context: HTMLCanvasElement | WebGL2RenderingContext | WebGLRenderingContext | CanvasRenderingContext2D) {
        this.#context = context;
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
        io.ConfigFlags |= ImGui.ConfigFlags.NavEnableKeyboard;     // Enable Keyboard Controls
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
        if (this.#context) {
            ImGui_Impl.Init(this.#context);
        } else if (typeof window !== "undefined") {
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

    onDetach(): void {
        ImGui_Impl.Shutdown();
        ImGui.DestroyContext();
    }

    begin() {
        if (!isInit) {
            return
        }
        ImGui_Impl.NewFrame(Date.now());
        ImGui.NewFrame();
    }

    end() {
        if (!isInit) {
            return
        }
        const io = ImGui.GetIO();
        const { container } = Application.getInstance() as Application;
        io.DisplaySize.x = container.scrollWidth;
        io.DisplaySize.y = container.scrollHeight;

        ImGui.EndFrame();
        ImGui.Render();
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
    }

    onEvent(event: Event): void { }

    onUpdate(): void { }

    onImGuiRender(): void {
        if (!isInit) {
            return
        }
        if (!done && show_demo_window) {
            done = /*ImGui.*/ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
        }
    }

    #context?: HTMLCanvasElement | WebGL2RenderingContext | WebGLRenderingContext | CanvasRenderingContext2D;
}
