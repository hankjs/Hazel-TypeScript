import { WindowResizeEvent } from "./Events/ApplicationEvent";
import { EventCategory } from "./Events/Event";
import { HZ_TRACE } from "./Log";

export namespace Hazel {
    export class Application {
        constructor() {}

        run() {
            const e = new WindowResizeEvent(1280, 720);
            if (e.isInCategory(EventCategory.EventCategoryApplication)) {
                HZ_TRACE(e);
            }
            if (e.isInCategory(EventCategory.EventCategoryInput)) {
                HZ_TRACE(e);
            }
        }

        static createApplication (): Application {
            throw new Error("Method not implemented.");
        }
    }
}