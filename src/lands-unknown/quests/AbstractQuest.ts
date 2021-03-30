import {QuestId} from "@/lands-unknown/quests/QuestId";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {isSaveable, Saveable} from "@/ig-template/tools/saving/Saveable";
import {AbstractQuestStep} from "@/lands-unknown/quests/AbstractQuestStep";
import {QuestSaveData} from "@/lands-unknown/quests/QuestSaveData";
import {QuestStatus} from "@/lands-unknown/quests/QuestStatus";
import {Features} from "@/ig-template/Features";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export abstract class AbstractQuest implements Saveable {
    _features: Features;

    id: QuestId;
    name: string;
    requirement: Requirement;

    steps: AbstractQuestStep[];
    currentIndex: number = -1;
    isStarted: boolean = false;
    isCompleted: boolean = false;

    saveKey: string;

    protected _onQuestCompleted = new SimpleEventDispatcher<AbstractQuest>();
    protected _onQuestStarted = new SimpleEventDispatcher<AbstractQuest>();

    public get onQuestCompleted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestCompleted.asEvent();
    }

    public get onQuestStarted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestStarted.asEvent();
    }


    protected constructor(id: QuestId, name: string, steps: AbstractQuestStep[], requirement: Requirement, features: Features) {
        this._features = features;
        this.id = id;
        this.name = name;
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

    completeStep(id: number) {
        if (this.currentStep.id !== id) {
            console.warn(`Cannot complete step ${id} if we're currently at ${this.currentStep.id}`);
            return;
        }
        this.nextStep();
    }

    private nextStep() {
        if (this.currentStep) {
            this.currentStep.after(this._features);
        }

        if (this.currentIndex == this.steps.length - 1) {
            this.completeQuest();
            return;
        }
        this.currentIndex++;

        this.currentStep.before(this._features);

        // In case the step wants to mark itself as completed
        this.currentStep.onStepCompleted.one((step) => {
            this.completeStep(step.id);
        })

    }

    private completeQuest() {
        this.isCompleted = true;
        this.completion();
        this._onQuestCompleted.dispatch(this);
    }

    start(notify: boolean = true) {
        if (!this.requirement.isCompleted || this.isStarted) {
            console.warn(`Cannot start quest ${this.id}`);
            return;
        }
        this.isStarted = true;

        if (notify) {
            this._onQuestStarted.dispatch(this);
        }
        this.nextStep();
    }

    get currentStep() {
        return this.steps[this.currentIndex];
    }

    get status(): QuestStatus {
        if (!this.isStarted) {
            return QuestStatus.NotStarted;
        }
        if (this.isCompleted) {
            return QuestStatus.Finished;
        }
        return QuestStatus.Started;
    }

    load(data: QuestSaveData): void {
        this.start(false);
        for (let i = 0; i < data.currentIndex; i++) {
            this.completeStep(i);
        }

        data.steps?.forEach(stepData => {
            const step = this.steps[stepData.step];

            if (isSaveable(step)) {
                step.load(stepData.data);
            }
        })
    }

    save(): QuestSaveData {
        return {
            id: this.id,
            currentIndex: this.currentIndex,
            steps: this.steps.flatMap(step => {
                if (isSaveable(step)) {
                    return [{
                        step: step.id,
                        data: step.save(),
                    }]
                }
                return [];
            })
        };
    }
}
