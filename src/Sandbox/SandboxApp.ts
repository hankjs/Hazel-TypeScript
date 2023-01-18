import { Hazel } from "src/Hazel/Application";

export class Sandbox extends Hazel.Application {
    static createApplication(): Hazel.Application {
        return new Sandbox();
    }
}