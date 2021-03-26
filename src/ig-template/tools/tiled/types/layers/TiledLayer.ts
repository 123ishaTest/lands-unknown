import {LayerType} from "@/ig-template/tools/tiled/types/layers/LayerType";

export interface TiledLayer {
    height: number;
    id: number;
    name: string;
    opacity: number;
    type: LayerType;
    visible: true;
    width: number;
    x: number;
    y: number;
}
