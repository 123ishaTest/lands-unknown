import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {ActionList} from "@/lands-unknown/features/action-list/ActionList";
import {FacilityType} from "@/ig-template/features/world-map/FacilityType";
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";
import {NpcId} from "@/ig-template/features/npcs/NpcId";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    worldPosition: WorldPosition;

    _possibleActions: ActionId[];
    possibleActions: AbstractAction[] = [];

    _facilities: FacilityType[];
    facilities: Record<FacilityType, AbstractAction[]> = {} as Record<FacilityType, AbstractAction[]>;

    npcs: NpcId[];
    requirement: Requirement;

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, worldPosition: WorldPosition, possibleActions: ActionId[] = [], npcs: NpcId[], facilities: FacilityType[], requirement = new NoRequirement()) {
        this.identifier = identifier;
        this.worldPosition = worldPosition;
        this._possibleActions = possibleActions;
        this.npcs = npcs;
        this._facilities = facilities;
        this.displayName = displayName;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
    }

    initializeActions(actionList: ActionList) {
        // Concat in case actions are added in another way (like injected by quests)
        this.possibleActions = this.possibleActions.concat(this._possibleActions.map(id => {
            return actionList[id];
        }));
        this._facilities.forEach(type => {
            this.facilities[type] = actionList[type];
        })
    }
}
