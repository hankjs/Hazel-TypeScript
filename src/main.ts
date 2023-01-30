import { Sandbox } from "@hazel/sandbox";
import { PLATFORM } from "@hazel/share";

export function main() {
    console.log(`Hazel init Platform: ${PLATFORM}`)
    const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
    if (!canvas) {
        throw new Error("Miss container.");
    }
    
    function resizeHandler() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    
    const app = Sandbox.createApplication(canvas);
    app.run();

    return 0;
}