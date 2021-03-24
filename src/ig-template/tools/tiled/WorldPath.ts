import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";

export class WorldPath {
    points: WorldPosition[];

    constructor(points: WorldPosition[]) {
        this.points = points;
    }

    getWorldPosition(progress: number): WorldPosition {
        progress = Math.min(0.999, Math.max(0, progress));
        const startIndex = Math.floor(progress * this.points.length)
        return this.points[startIndex];
    }
}
