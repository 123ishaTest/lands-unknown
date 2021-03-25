import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";

export class TownLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: WorldLocationId) {
        super(WorldLocationType.Town, id)
    }

    public toString(): string {
        return `${WorldLocationType[this.type]}: ${this.id};`
    }
}
