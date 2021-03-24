import {TiledLayer} from "@/ig-template/tools/tiled/types/layers/TiledLayer";

export interface TileLayer extends TiledLayer {
    data: number[];
}
