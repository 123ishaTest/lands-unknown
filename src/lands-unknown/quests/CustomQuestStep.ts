import {AbstractQuestStep} from "@/lands-unknown/quests/AbstractQuestStep";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";

export class CustomQuestStep extends AbstractQuestStep {
    beforeFunc: () => void;
    afterFunc: () => void;


    constructor(id: QuestStepId, beforeFunc: () => void, afterFunc: () => void) {
        super(id);
        this.beforeFunc = beforeFunc;
        this.afterFunc = afterFunc;
    }

    before(): void {
        this.afterFunc()
    }

    after(): void {
        this.afterFunc();
    }


}
