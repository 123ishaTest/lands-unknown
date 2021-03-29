import {QuestId} from "@/lands-unknown/quests/QuestId";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {Saveable} from "@/ig-template/tools/saving/Saveable";
import {QuestStep} from "@/lands-unknown/quests/QuestStep";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {QuestSaveData} from "@/lands-unknown/quests/QuestSaveData";
import {QuestStatus} from "@/lands-unknown/quests/QuestStatus";
import {Features} from "@/ig-template/Features";

export abstract class Quest implements Saveable {
    _features: Features;

    id: QuestId;
    description: string;
    requirement: Requirement;

    steps: QuestStep[];
    currentIndex: number = -1;
    isStarted: boolean = false;

    saveKey: string;

    protected constructor(id: QuestId, description: string, steps: QuestStep[], requirement: Requirement, features: Features) {
        this._features = features;
        this.id = id;
        this.description = description;
        this.steps = steps;
        this.requirement = requirement;

        this.saveKey = id;
    }

    /**
     * Run before this quest is even active.
     * Use to inject starting dialog.
     */
    abstract before(): void;

    /**
     * This method will only run once. You can give rewards in here.
     */
    abstract completion(): void

    completeStep(id: QuestStepId) {
        if (this.currentStep.id !== id) {
            console.warn(`Cannot complete step ${id} if we're currently at ${this.currentStep.id}`);
        }
        this.nextStep();
    }

    private nextStep() {
        this.currentStep.after(this._features);
        this.currentIndex++;
        this.currentStep.before(this._features);
    }

    start() {
        if (!this.requirement.isCompleted || this.isStarted) {
            console.warn(`Cannot start quest ${this.id}`);
            return;
        }
        this.isStarted = true;
        this.nextStep();
    }

    get currentStep() {
        return this.steps[this.currentIndex];
    }

    get status(): QuestStatus {
        if (!this.isStarted) {
            return QuestStatus.NotStarted;
        }
        return this.currentIndex < this.steps.length ? QuestStatus.Started : QuestStatus.Finished;
    }

    load(data: QuestSaveData): void {
        this.currentIndex = data.currentIndex;
    }

    // TODO save id of step so changing the amount of steps doesn't mess anything up.
    save(): QuestSaveData {
        return {
            id: this.id,
            currentIndex: this.currentIndex,
        };
    }
}