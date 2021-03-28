import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";

export class TravelAction extends AbstractAction {
    icon = "fa-route";
    _worldMap: WorldMap;
    road: Road;

    reverse: boolean;

    constructor(road: Road, reverse: boolean, worldMap: WorldMap) {
        super(``, road.duration, 0);
        this._worldMap = worldMap;
        this.road = road;
        this.reverse = reverse;
        this.description = `${this.from.id} to ${this.to.id}.`
    }

    gainReward(): boolean {
        this._worldMap.setLocation(this.to);
        return false;
    }

    getWorldPosition(): WorldPosition {
        if (this.reverse) {
            return this.road.getWorldPosition(1 - this.getProgress().getPercentage());
        } else {
            return this.road.getWorldPosition(this.getProgress().getPercentage());
        }
    }

    getRemainingPoints(): WorldPosition[] {
        const index = Math.floor(this.getProgress().getPercentage() * this.road.points.length);
        if (this.reverse) {
            return this.road.points.slice(0, this.road.points.length - index);
        } else {
            return this.road.points.slice(index, this.road.points.length);
        }
    }

    get from() {
        if (this.reverse) {
            return this.road.to;
        } else {
            return this.road.from;
        }
    }

    get to() {
        if (this.reverse) {
            return this.road.from;
        } else {
            return this.road.to;
        }
    }

}
