import {AbstractQuestStep} from "@/lands-unknown/quests/AbstractQuestStep";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";

export class InjectionQuestStep extends AbstractQuestStep {
    injections: AbstractInjection[];

    constructor(id: QuestStepId, injections: AbstractInjection[]) {
        super(id);
        this.injections = injections;
    }

    before(features: Features): void {
        this.injections.forEach(injection => {
            injection.inject(features)
        })
    }

    after(features: Features): void {
        this.injections.forEach(injection => {
            injection.eject(features)
        })
    }


}
