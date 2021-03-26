import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {ActionList} from "@/lands-unknown/features/action-list/ActionList";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    _possibleActions: ActionId[];
    possibleActions: AbstractAction[] = [];
    requirement: Requirement;

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, possibleActions: ActionId[] = [], requirement = new NoRequirement()) {
        this.identifier = identifier;
        this._possibleActions = possibleActions;
        this.displayName = displayName;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
    }

    initializeActions(actionList: ActionList){
        this.possibleActions = this._possibleActions.map(id => {
            return actionList[id];
        })
    }
}
