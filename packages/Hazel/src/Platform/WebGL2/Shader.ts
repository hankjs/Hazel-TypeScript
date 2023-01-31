import { Shader as _Shader } from "../../Hazel/Renderer/Shader";
import { gl } from "./WebGL2Context";

export class Shader extends _Shader{
    gl: WebGL2RenderingContext;

    constructor(vertexSrc: string, fragmentSrc: string) {
        super(vertexSrc, fragmentSrc);
        this.gl = gl;
        try {
            this.compile();
        } catch (error) {
            console.error(error);
        }
    };

    compile() {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;

        gl.shaderSource(vertexShader, this.vertexSrc);
        gl.compileShader(vertexShader);
        this.checkCompileErrors(vertexShader, "VERTEX");

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, this.fragmentSrc);
        gl.compileShader(fragmentShader);
        this.checkCompileErrors(fragmentShader, "FRAGMENT")

        this.m_RendererID = gl.createProgram()!;

        gl.attachShader(this.m_RendererID, vertexShader);
        gl.attachShader(this.m_RendererID, fragmentShader);
        gl.linkProgram(this.m_RendererID);

        this.checkCompileErrors(this.m_RendererID, "PROGRAM")

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    }

    createShaderFromSource(type: number, source: string) {
        const shader = this.gl.createShader(type)!;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        return shader;
    }
    
    createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = this.gl.createProgram()!;
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
    
        return program;
    }

    bind(): void {
        if (!this.m_RendererID) {
            return;
        }
        gl.useProgram(this.m_RendererID);
    }
    unbind() {
        gl.useProgram(0);
    }

    private checkCompileErrors(shader: WebGLShader , type: "VERTEX" | "FRAGMENT" | "PROGRAM") {
        const infoLog = type === "PROGRAM" ? this.gl.getProgramInfoLog(shader): this.gl.getShaderInfoLog(shader);

        if (infoLog && infoLog.length > 0) {
            /* message may be an error or a warning */
            throw `ERROR::SHADER::${type}::COMPILATION_FAILED\n` + infoLog;
        }
    };
}