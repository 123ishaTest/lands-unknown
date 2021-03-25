import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";

export abstract class WorldLocationIdentifier {
    type: WorldLocationType;
    id: WorldLocationId;

    protected constructor(type: WorldLocationType, id: WorldLocationId) {
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
