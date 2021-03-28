import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {Town} from "@/ig-template/features/world-map/towns/Town";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";

export class CrossRoads extends Town {
    constructor(id: WorldLocationId, displayName: string, worldPosition: WorldPosition) {
        super(new TownLocationIdentifier(id), displayName, TownTier.Village, worldPosition, [], []);
    }
}
