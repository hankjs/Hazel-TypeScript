import { PLATFORM } from "@hazel/share";
import * as Web from "./Platform/Web/index";
import * as _Hazel from "./Hazel/index";

export namespace Hazel {

    let BaseApplication = _Hazel.Application;
    if (PLATFORM === "Web") {
        BaseApplication = Web.Application;
    }

    export class Application extends BaseApplication {};

    export class Layer extends _Hazel.Layer {};
    export class LayerStack extends _Hazel.LayerStack {};

    export class Event extends _Hazel.Event {};
    export class ImGuiLayer extends _Hazel.ImGuiLayer {};
}