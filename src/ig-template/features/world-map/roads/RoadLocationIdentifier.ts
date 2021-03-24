import {RoadId} from "@/ig-template/features/world-map/roads/RoadId";
import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";

export class RoadLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: RoadId) {
        super(WorldLocationType.Road, id)
    }
}
