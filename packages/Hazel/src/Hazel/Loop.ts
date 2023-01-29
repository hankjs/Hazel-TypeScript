export class Loop {
    // @ts-ignore abstract methods props use in implement.
    while(segment: CallableFunction) {
        throw new Error("Method not implemented.");
    }

    start() {
        this.m_stop = false;
    }

    stop() {
        this.m_stop = true;
    }

    static create(): Loop {
        throw new Error("Method not implemented.");
    }

    protected m_stop = false;
}
