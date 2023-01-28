import chalk from "chalk";
import { DEV } from "src/share/env";

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

function format(color: "blue" | "red" | "yellow" | "green", type: string) {
    if (DEV) {
        return chalk[color](type);
    }

    return type;
}

export const HZ_CORE_TRACE = (...args: [formatter: any, ...other: any[]]) =>
    Log.getCoreLogger().trace(format("green", "[TRACE]"), ...args);
export const HZ_CORE_WARN = (...args: [formatter: any, ...other: any[]]) =>
    Log.getCoreLogger().warn(format("yellow", "[WARN]"), ...args);
export const HZ_CORE_INFO = (...args: [formatter: any, ...other: any[]]) =>
    Log.getCoreLogger().trace(format("blue", "[INFO]"), ...args);
export const HZ_CORE_ERROR = (...args: [formatter: any, ...other: any[]]) =>
    Log.getCoreLogger().error(format("red", "[ERROR]"), ...args);
export const HZ_CORE_FATAL = (...args: [formatter: any, ...other: any[]]) =>
    Log.getCoreLogger().error(format("red", "[FATAL]"), ...args);

export const HZ_TRACE = (...args: [formatter: any, ...other: any[]]) =>
    Log.getClientLogger().trace(format("green", "[TRACE]"), ...args);
export const HZ_WARN = (...args: [formatter: any, ...other: any[]]) =>
    Log.getClientLogger().warn(format("yellow", "[WARN]"), ...args);
export const HZ_INFO = (...args: [formatter: any, ...other: any[]]) =>
    Log.getClientLogger().trace(format("blue", "[INFO]"), ...args);
export const HZ_ERROR = (...args: [formatter: any, ...other: any[]]) =>
    Log.getClientLogger().error(format("red", "[ERROR]"), ...args);
export const HZ_FATAL = (...args: [formatter: any, ...other: any[]]) =>
    Log.getClientLogger().error(format("red", "[FATAL]"), ...args);
