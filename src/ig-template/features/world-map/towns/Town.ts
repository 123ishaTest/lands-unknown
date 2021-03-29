import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {FacilityType} from "@/ig-template/features/world-map/FacilityType";
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";
import {NpcId} from "@/ig-template/features/npcs/NpcId";

export class Town extends WorldLocation {
    tier: TownTier;


    constructor(identifier: TownLocationIdentifier, displayName: string, tier: TownTier, worldPosition: WorldPosition, possibleActions: ActionId[] = [], npcs: NpcId[] = [], facilities: FacilityType[] = [], requirement: Requirement = new NoRequirement()) {
        super(identifier, displayName, worldPosition, possibleActions, npcs, facilities, requirement);
        this.tier = tier;
    }
}
