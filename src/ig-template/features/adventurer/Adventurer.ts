import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {TravelAction} from "@/ig-template/features/world-map/TravelAction";
import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {Features} from "@/ig-template/Features";
import {clone} from "lodash-es";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export class Adventurer extends Feature {
    _worldMap: WorldMap = {} as unknown as WorldMap;

    actionQueue: AbstractAction[] = [];
    maxActions: number = 10;

    private _onActionCompletion = new SimpleEventDispatcher<AbstractAction>();

    public get onActionCompletion(): ISimpleEvent<AbstractAction> {
        return this._onActionCompletion.asEvent();
    }

    constructor() {
        super('adventurer');
    }

    update(delta: number) {
        if (this.actionQueue.length > 0) {
            if (!this.actionQueue[0].isStarted) {
                const couldStart = this.actionQueue[0].start();
                if (!couldStart) {
                    this.removeFirstAction();
                }
            }
        }
        if (this.actionQueue.length > 0) {
            if (this.actionQueue[0].isFinished) {
                this.removeFirstAction();
            }
        }

        // Check again in case first action is removed
        if (this.actionQueue.length > 0) {
            this.actionQueue[0].perform(delta);
        }
    }

    initialize(features: Features) {
        this._worldMap = features.worldMap;
    }

    cancelAction(index: number) {
        const action = this.actionQueue[index];

        if (action == null) {
            console.error(`Could not find and cancel action at index ${index}`);
            return;

        }
        // Reset the rest if we just canceled a travel
        const cascadeCancel = (action as TravelAction).to != null;
        this.cancelActionsFromIndex(index, cascadeCancel);
    }

    cancelActionsFromIndex(index: number, cascade: boolean) {
        if (!cascade) {
            this.actionQueue[index].stop();
            this.actionQueue.splice(index, 1);
            return;
        }
        for (let i = index; i < this.actionQueue.length; i++) {
            this.actionQueue[i].stop();
        }
        this.actionQueue = this.actionQueue.slice(0, index);
    }

    addAction(a: AbstractAction, repeat: number = -1) {
        // Unfortunately we cannot clone deep as we would lose features
        const action = clone(a);

        // Reset events to avoid cloning issues
        action.resetEvents();

        if (repeat !== -1) {
            action.repeat = repeat;
        }

        // No need to schedule an action for now if we can't perform it.
        if (this.actionQueue.length === 0 && !action.canPerform()) {
            return;
        }

        if (this.actionQueue.length >= this.maxActions) {
            console.log(`You already have ${this.maxActions} actions scheduled.`);
            return;
        }

        const sub = action.onCompletion.subscribe((action) => {
            this._onActionCompletion.dispatch(action);
        })
        action.onFinished.one(() => {
            sub();
        })

        this.actionQueue.push(action);
    }

    // Could be improved to be more bug-safe
    removeFirstAction() {
        this.actionQueue.shift();
    }

    getPlayerLocationAtEndOfQueue(): WorldLocationIdentifier {
        for (let i = this.actionQueue.length - 1; i >= 0; i--) {
            if (this.actionQueue[i] instanceof TravelAction) {
                return (this.actionQueue[i] as TravelAction).to;
            }
        }
        return this._worldMap.playerLocation;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }


}
