import {AbstractQuestStep} from "@/lands-unknown/quests/AbstractQuestStep";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {Features} from "@/ig-template/Features";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";

export class DialogQuestStep<T> extends AbstractQuestStep {

    dialogInjections: DialogInjection<T>[]

    constructor(id: QuestStepId, dialogInjections: DialogInjection<T>[]) {
        super(id);
        this.dialogInjections = dialogInjections;
    }

    before(features: Features): void {
        this.dialogInjections.forEach(injection => {
            injection.inject(features);
        })
    }

    after(features: Features): void {
        this.dialogInjections.forEach(injection => {
            injection.eject(features);
        })
    }


}
