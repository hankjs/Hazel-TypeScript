export namespace Hazel {
    export class Log {
        static init() {
            Log.#coreLogger = console;
            Log.#clientLogger = console;
        }

        static #coreLogger: Console;
        static #clientLogger: Console;

        static getCoreLogger(): Console {
            return Log.#coreLogger;
        }

        static getClientLogger(): Console {
            return Log.#clientLogger;
        }
    }
}

export const HZ_CORE_TRACE = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getCoreLogger().trace("[TRACE]", ...args);
export const HZ_CORE_WARN = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getCoreLogger().warn("[WARN]", ...args);
export const HZ_CORE_INFO = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getCoreLogger().info("[INFO]", ...args);
export const HZ_CORE_ERROR = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getCoreLogger().error("[ERROR]", ...args);
export const HZ_CORE_FATAL = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getCoreLogger().error("[FATAL]", ...args);

export const HZ_TRACE = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getClientLogger().trace("[TRACE]", ...args);
export const HZ_WARN = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getClientLogger().warn("[WARN]", ...args);
export const HZ_INFO = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getClientLogger().info("[INFO]", ...args);
export const HZ_ERROR = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getClientLogger().error("[ERROR]", ...args);
export const HZ_FATAL = (...args: [formatter: any, ...other: any[]]) => Hazel.Log.getClientLogger().error("[FATAL]", ...args);
