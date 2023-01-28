import { PLATFORM } from "src/share/env";
import * as _Application from "./Hazel/Application";
import * as _Log from "./Hazel/Log";
import * as Web from "./Platform/web/index";

export * from "./Hazel/Log";

export namespace Hazel {
    export class Log extends _Log.Log {};

    let BaseApplication = _Application.Application;
    if (PLATFORM === "Web") {
        BaseApplication = Web.Application;
    }

    console.log("BaseApplication", BaseApplication);
    export class Application extends BaseApplication {};
}