import {ObjectProperty} from "@/ig-template/tools/tiled/types/objects/ObjectProperty";

export interface TiledObject {
    height: number;
    id: number;
    name: string;
    properties?: ObjectProperty[];
    text?: {
        color?: string;
        fontfamily?: string;
        italic?: boolean;
        pixelsize?: number;
        halign?: string;
        text: string;
        valign?: string;
        wrap?: boolean;
    };
    rotation: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}
