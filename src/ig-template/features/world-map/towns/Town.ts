import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";

export class Town extends WorldLocation {
    tier: TownTier;


    constructor(identifier: TownLocationIdentifier, displayName: string, tier: TownTier, requirement: Requirement) {
        super(identifier, displayName, requirement);
        this.tier = tier;
    }
}
