import { PLATFORM } from "src/share/env";
import * as _Application from "./Hazel/Application";
import * as _Log from "./Hazel/Log";
import * as Web from "./Platform/web/index";
import * as _Layer from "./Hazel/Layer";
import * as _LayerStack from "./Hazel/LayerStack";

export * from "./Hazel/Log";

export namespace Hazel {
    export class Log extends _Log.Log {};

    let BaseApplication = _Application.Application;
    if (PLATFORM === "Web") {
        BaseApplication = Web.Application;
    }

    export class Application extends BaseApplication {};

    export class Layer extends _Layer.Layer {};
    export class LayerStack extends _LayerStack.LayerStack {};
}