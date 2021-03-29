import {InjectionQuestStep} from "@/lands-unknown/quests/steps/InjectionQuestStep";
import {Adventurer} from "@/ig-template/features/adventurer/Adventurer";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";
import {SkillAction} from "@/lands-unknown/features/skills/SkillAction";

/**
 * Subscribes to the adventurers actionQueue and counts how often the actionId is completed
 */
export class CompleteSkillActionQuestStep extends InjectionQuestStep {
    _adventurer: Adventurer;
    actionId: ActionId;
    target: number;

    actual: number = 0;

    unsubscribe: () => void;

    constructor(id: QuestStepId, actionId: ActionId, target: number, injections: AbstractInjection[], adventurer: Adventurer,) {
        super(id, injections);
        this.actionId = actionId;
        this.target = target;
        this._adventurer = adventurer;
        this.unsubscribe = () => {
            // Empty
        };
    }


    before(features: Features) {
        this.unsubscribe = this._adventurer.onActionCompletion.subscribe(action => {
            if (action instanceof SkillAction) {
                if (action?.id === this.actionId) {
                    this.actual++;
                    if (this.actual >= this.target) {
                        this._onStepCompleted.dispatch(this);
                    }
                }
            }
        })
        super.before(features);
    }

    after(features: Features) {
        this.unsubscribe();
        super.after(features);
    }
}
