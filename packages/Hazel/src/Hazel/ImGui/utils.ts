import * as ImGui from "@hazel/imgui";

export async function AddFontFromFileTTF(url: string, size_pixels: number, font_cfg: ImGui.FontConfig | null = null, glyph_ranges: number | null = null): Promise<ImGui.Font> {
    font_cfg = font_cfg || new ImGui.FontConfig();
    font_cfg.Name = font_cfg.Name || `${url.split(/[\\\/]/).pop()}, ${size_pixels.toFixed(0)}px`;
    return ImGui.GetIO().Fonts.AddFontFromMemoryTTF(await LoadArrayBuffer(url), size_pixels, font_cfg, glyph_ranges);
}

export async function LoadArrayBuffer(url: string): Promise<ArrayBuffer> {
    const response: Response = await fetch(url);
    return response.arrayBuffer();
}