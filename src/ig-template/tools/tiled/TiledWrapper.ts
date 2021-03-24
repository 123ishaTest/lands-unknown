import {ClickBox} from "@/ig-template/tools/tiled/ClickBoxes/ClickBox";
import {LayerType} from "@/ig-template/tools/tiled/types/layers/LayerType";
import * as TileSets from "@/assets/tiled/tilesets";
import * as Images from "@/assets/tiled/images";
import {TiledMap} from "@/ig-template/tools/tiled/types/TiledMap";
import {TileSet} from "@/ig-template/tools/tiled/types/TileSet";
import {TileLayer} from "@/ig-template/tools/tiled/types/layers/TileLayer";
import {TiledLayer} from "@/ig-template/tools/tiled/types/layers/TiledLayer";
import {ObjectGroup} from "@/ig-template/tools/tiled/types/layers/ObjectGroup";

export class TiledWrapper {
    worldMap: TiledMap;
    clickBoxes: ClickBox[] = [];
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D;

    tileHeight: number;
    tileWidth: number;

    tileSets: TileSet[] = [];

    isHoveringOverClickBox: boolean = false;

    constructor(worldMap: TiledMap, canvas: HTMLCanvasElement) {
        this.worldMap = worldMap;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        console.log(this.ctx)

        this.tileHeight = this.worldMap.tileheight;
        this.tileWidth = this.worldMap.tilewidth;
        this.tileSets = worldMap.tilesets.map((tileSet) => {
            const jsonId = this.getJsonId(tileSet.source);

            const imageCache = new Image();

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            imageCache.src = Images[jsonId]

            return {
                imageCache: imageCache,
                firstgid: tileSet.firstgid,
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                ...TileSets[jsonId],
            };
        });

    }

    getJsonId(source: string): string {
        const ending = source.split("/");
        const fileName = ending[ending.length - 1];
        return fileName.split(".json")[0];
    }

    indexToXY(index: number, width: number) {
        const x = index % width;
        const y = Math.floor(index / width)
        return [x, y]
    }

    isPointInRectangle(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
        if (px < rx || px > rx + rw) {
            return false;
        }
        if (py < ry || py > ry + rh) {
            return false;
        }
        return true;
    }

    getCursorPosition(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return [x, y];
    }

    private renderObjectGroup(layer: ObjectGroup) {
        for (let i = 0; i < layer.objects.length; i++) {
            const object = layer.objects[i];

            if (object.text) {
                console.log(`${object.text.pixelsize}px ${object.text.fontfamily}`);

                this.ctx.font = `${object.text.pixelsize}px ${object.text.fontfamily}`;
                this.ctx.textAlign = 'center'
                this.ctx.textBaseline = 'middle'
                this.ctx.fillStyle = object.text.color ?? "black";
                this.ctx.fillText(object.text.text, object.x + object.width / 2, object.y + object.height / 2);
            }
            if (object.properties) {
                this.ctx.beginPath();
                this.ctx.rect(object.x, object.y, object.width, object.height);
                this.ctx.stroke();
                this.clickBoxes.push(object)
            }
        }
    }

    private getTileSetFromGid(id: number) {
        let highestFound = -1;
        let highestIndex = -1;
        for (let i = 0; i < this.tileSets.length; i++) {
            if (id >= this.tileSets[i].firstgid) {
                if (this.tileSets[i].firstgid >= highestFound) {
                    highestFound = this.tileSets[i].firstgid
                    highestIndex = i;
                }
            }
        }
        return this.tileSets[highestIndex];
    }

    private renderTileLayer(layer: TileLayer) {
        const data = layer.data;
        const width = layer.width;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0) {
                continue;
            }
            const [destinationX, destinationY] = this.indexToXY(i, width)

            const tileSet = this.getTileSetFromGid(data[i]);

            const [sourceX, sourceY] = this.indexToXY(data[i] - tileSet.firstgid, tileSet.columns)
            const spacing = tileSet.spacing;
            const sx = sourceX * (this.tileWidth + spacing);
            const sy = sourceY * (this.tileHeight + spacing);
            const dx = destinationX * this.tileWidth;
            const dy = destinationY * this.tileHeight;

            const img = tileSet.imageCache;
            this.ctx.drawImage(img, sx, sy, this.tileWidth, this.tileHeight, dx, dy, this.tileWidth, this.tileHeight);
        }
    }

    renderLayer(layer: TiledLayer) {
        console.log(`Rendering layer ${layer.name} of type ${layer.type}`);
        switch (layer.type as LayerType) {
            case LayerType.TileLayer:
                this.renderTileLayer(layer as TileLayer);
                break;
            case LayerType.ObjectGroup:
                this.renderObjectGroup(layer as ObjectGroup);
                break;
        }
    }


    render() {
        const layerCount = this.worldMap.layers.length;
        for (let i = 0; i < layerCount; i++) {
            this.renderLayer(this.worldMap.layers[i])
        }

        this.canvas.onmousemove = (event: MouseEvent) => {
            const [mouseX, mouseY] = this.getCursorPosition(event);
            for (const clickBox of this.clickBoxes) {
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    this.isHoveringOverClickBox = true;
                    return;
                }
            }
            this.isHoveringOverClickBox = false;
        }

        this.canvas.onmousedown = (event: MouseEvent) => {
            event.preventDefault();

            // get the mouse position
            const [mouseX, mouseY] = this.getCursorPosition(event);
            console.log("mouse", mouseX, mouseY)
            // iterate each shape in the shapes array
            for (let i = 0; i < this.clickBoxes.length; i++) {
                const clickBox = this.clickBoxes[i];

                console.log(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    console.log(clickBox);
                }
            }
        }
    }

}
