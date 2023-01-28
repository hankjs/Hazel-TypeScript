import { Hazel } from "Hazel/index";

export class Sandbox extends Hazel.Application {
    static createApplication(el?: Element): Hazel.Application {
        return Hazel.Application.createApplication(el);
    }
}