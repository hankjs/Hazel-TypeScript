export abstract class Shader {
    constructor(
       protected vertexSrc: string,
       protected fragmentSrc: string
    ) {};

    bind() {
        throw new Error("Method not implemented.");
    }
    unbind() {
        throw new Error("Method not implemented.");
    }

    protected m_RendererID!: WebGLProgram;
}