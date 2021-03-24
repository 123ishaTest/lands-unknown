import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";
import {RoadId} from "@/ig-template/features/world-map/roads/RoadId";
import {TownId} from "@/ig-template/features/world-map/towns/TownId";

export abstract class WorldLocationIdentifier {
    type: WorldLocationType;
    id: RoadId | TownId;

    protected constructor(type: WorldLocationType, id: RoadId | TownId) {
        this.type = type;
        this.id = id;
    }

    public toString(): string {
        return `${WorldLocationType[this.type]}: ${this.id};`
    }

    public equals(other: WorldLocationIdentifier): boolean {
        if (other == null) {
            console.warn(`Comparing ${this.toString()} to null`);
            return false;
        }
        return this.type === other.type && this.id == other.id;
    }
}
