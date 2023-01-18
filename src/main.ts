import { Hazel, HZ_CORE_ERROR, HZ_INFO } from "./Hazel/Log";
import { Sandbox } from "./Sandbox/SandboxApp";

export function main() {
    Hazel.Log.init();
    
    HZ_CORE_ERROR("Initialized Log!");
    HZ_INFO("Hello!");

    const app = Sandbox.createApplication();
    app.run();

    return 0;
}