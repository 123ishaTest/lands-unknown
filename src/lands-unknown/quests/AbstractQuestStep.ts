import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {Features} from "@/ig-template/Features";

export abstract class AbstractQuestStep {
    id: QuestStepId;

    protected constructor(id: QuestStepId) {
        this.id = id;
    }

    abstract before(features: Features): void;

    abstract after(features: Features): void;
}
