import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";

/**
 * Permanently adds an action to a location
 */
export class PermanentlyAddActionInjection extends AbstractInjection {
    location: WorldLocationIdentifier
    actionId: ActionId;

    constructor(location: WorldLocationIdentifier, actionId: ActionId) {
        super();
        this.location = location;
        this.actionId = actionId;
    }

    inject(features: Features): void {
        const location = features.worldMap.getLocation(this.location);
        if (!location) {
            console.warn(`Could not inject action into location with id ${this.location}`);
            return;
        }
        location.possibleActions.push(features.actionList[this.actionId]);
    }

    eject(): void {
        // Empty
    }

}
