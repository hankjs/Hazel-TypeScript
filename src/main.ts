import { Sandbox } from "@hazel/sandbox";
import { PLATFORM } from "@hazel/share";

export function main() {
    console.log(`Hazel init Platform: ${PLATFORM}`)
    
    const app = Sandbox.createApplication(document.querySelector("#canvas")!);
    app.run();

    return 0;
}