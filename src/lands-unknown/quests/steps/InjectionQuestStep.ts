import {AbstractQuestStep} from "@/lands-unknown/quests/AbstractQuestStep";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";

export class InjectionQuestStep extends AbstractQuestStep {
    injections: AbstractInjection[];

    constructor(id: number, injections: AbstractInjection[]) {
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
