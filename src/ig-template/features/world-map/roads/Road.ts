import {RoadLocationIdentifier} from "@/ig-template/features/world-map/roads/RoadLocationIdentifier";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {WorldLocation} from "@/ig-template/features/world-map/WorldLocation";

export class Road extends WorldLocation {
    from: WorldLocationIdentifier;
    to: WorldLocationIdentifier;
    baseDifficulty: number;

    constructor(identifier: RoadLocationIdentifier, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, requirement: Requirement = new NoRequirement()) {
        super(identifier, displayName, requirement);
        this.from = from;
        this.to = to;
        this.baseDifficulty = baseDifficulty;
    }
}
