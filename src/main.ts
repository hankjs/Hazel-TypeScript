import { Hazel, HZ_CORE_INFO } from "Hazel/index";
import { Sandbox } from "Sandbox/SandboxApp";
import { PLATFORM } from "share/env";

export function main() {
    Hazel.Log.init();
    HZ_CORE_INFO(`Hazel init Platform: ${PLATFORM}`)
    
    const app = Sandbox.createApplication();
    app.run();

    return 0;
}