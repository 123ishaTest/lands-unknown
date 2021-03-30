import {Features} from "@/ig-template/Features";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export abstract class AbstractQuestStep {
    id: number;

    protected _onStepCompleted = new SimpleEventDispatcher<AbstractQuestStep>();

    protected constructor(id: number) {
        this.id = id;
    }

    abstract before(features: Features): void;

    abstract after(features: Features): void;

    public get onStepCompleted(): ISimpleEvent<AbstractQuestStep> {
        return this._onStepCompleted.asEvent();
    }

}
