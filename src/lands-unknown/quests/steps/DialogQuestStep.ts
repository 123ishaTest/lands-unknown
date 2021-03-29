import {QuestStep} from "@/lands-unknown/quests/QuestStep";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {Features} from "@/ig-template/Features";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";

export class DialogQuestStep<T> extends QuestStep {

    dialogInjection: DialogInjection<T>

    constructor(id: QuestStepId, dialogInjection: DialogInjection<T>) {
        super(id);
        this.dialogInjection = dialogInjection;
    }

    before(features: Features): void {
        this.dialogInjection.inject(features)

    }

    after(features: Features): void {
        this.dialogInjection.eject(features)
    }


}
