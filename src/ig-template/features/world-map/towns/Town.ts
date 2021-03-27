import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {FacilityType} from "@/ig-template/features/world-map/FacilityType";

export class Town extends WorldLocation {
    tier: TownTier;


    constructor(identifier: TownLocationIdentifier, displayName: string, tier: TownTier, possibleActions: ActionId[] = [], facilities: FacilityType[] = [], requirement: Requirement = new NoRequirement()) {
        super(identifier, displayName, possibleActions, facilities, requirement);
        this.tier = tier;
    }
}
