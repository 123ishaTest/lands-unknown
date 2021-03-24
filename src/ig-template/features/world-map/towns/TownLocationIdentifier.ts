import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {TownId} from "@/ig-template/features/world-map/towns/TownId";
import {WorldLocationType} from "@/ig-template/features/world-map/WorldLocationType";

export class TownLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: TownId) {
        super(WorldLocationType.Town, id)
    }
}
