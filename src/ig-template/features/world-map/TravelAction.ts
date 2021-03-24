import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {Road} from "@/ig-template/features/world-map/roads/Road";

export class TravelAction extends AbstractAction {
    _worldMap: WorldMap;
    road: Road;

    reverse: boolean;

    constructor(road: Road, reverse: boolean, worldMap: WorldMap) {
        super(``, 10, 1);
        this._worldMap = worldMap;
        this.road = road;
        this.reverse = reverse;
        this.description = `Travel from ${this.from} to ${this.to}`
    }

    gainReward(): boolean {
        this._worldMap.setLocation(this.to);
        return true;
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
