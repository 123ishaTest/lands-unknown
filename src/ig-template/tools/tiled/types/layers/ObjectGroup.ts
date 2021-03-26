import {TiledObject} from "@/ig-template/tools/tiled/types/objects/TiledObject";
import {TiledLayer} from "@/ig-template/tools/tiled/types/layers/TiledLayer";

export interface ObjectGroup extends TiledLayer {
    draworder: string;
    objects: TiledObject[];
}
