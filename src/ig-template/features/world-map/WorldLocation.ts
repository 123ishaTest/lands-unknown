import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    requirement: Requirement;
    protected constructor(identifier: WorldLocationIdentifier, displayName: string, requirement = new NoRequirement()) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;

    }
}
