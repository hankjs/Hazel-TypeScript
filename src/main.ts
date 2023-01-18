import { Sandbox } from "./Sandbox/SandboxApp";

export function main() {
    const app = Sandbox.createApplication();
    app.run();

    return 0;
}