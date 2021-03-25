import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";

export class RoadLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: WorldLocationId) {
        super(WorldLocationType.Road, id)
    }
}
