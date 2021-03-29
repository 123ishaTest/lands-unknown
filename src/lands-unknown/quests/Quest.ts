import {QuestId} from "@/lands-unknown/quests/QuestId";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {Saveable} from "@/ig-template/tools/saving/Saveable";
import {QuestStep} from "@/lands-unknown/quests/QuestStep";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {QuestSaveData} from "@/lands-unknown/quests/QuestSaveData";

export abstract class Quest implements Saveable {
    id: QuestId;
    description: string;
    requirement: Requirement;

    steps: QuestStep[];
    currentIndex: number = 0;
    isStarted: boolean = false;

    saveKey: string;

    protected constructor(id: QuestId, description: string, steps: QuestStep[], requirement: Requirement,) {
        this.id = id;
        this.description = description;
        this.steps = steps;
        this.requirement = requirement;

        this.saveKey = id;
    }

    completeStep(id: QuestStepId) {
        if (this.currentStep.id !== id) {
            console.warn(`Cannot complete step ${id} if we're currently at ${this.currentStep.id}`);
        }
    }


    get currentStep() {
        return this.steps[this.currentIndex];
    }


    load(data: QuestSaveData): void {
        this.currentIndex = data.currentIndex;
    }

    save(): QuestSaveData {
        return {
            id: this.id,
            currentIndex: this.currentIndex,
        };
    }
}
