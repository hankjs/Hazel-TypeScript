import { PLATFORM } from "@hazel/share";
import * as _Application from "./Hazel/Application";
import * as Web from "./Platform/Web/index";
import * as _Layer from "./Hazel/Layer";
import * as _LayerStack from "./Hazel/LayerStack";
import * as _Event from "./Hazel/Events/Event";
import * as _ImGuiLayer from "./Hazel/ImGui/ImGuiLayer";

export namespace Hazel {

    let BaseApplication = _Application.Application;
    if (PLATFORM === "Web") {
        BaseApplication = Web.Application;
    }

    export class Application extends BaseApplication {};

    export class Layer extends _Layer.Layer {};
    export class LayerStack extends _LayerStack.LayerStack {};

    export class Event extends _Event.Event {};
    export class ImGuiLayer extends _ImGuiLayer.ImGuiLayer {};
}