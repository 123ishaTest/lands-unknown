import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    possibleActions: AbstractAction[] = [];

    requirement: Requirement;

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, requirement = new NoRequirement()) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
    }

    addAction(action: AbstractAction) {
        this.possibleActions.push(action);
    }
}
