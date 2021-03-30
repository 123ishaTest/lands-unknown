import {Feature} from "@/ig-template/features/Feature";
import {AbstractQuest} from "@/lands-unknown/quests/AbstractQuest";
import {Features} from "@/ig-template/Features";
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {QuestsSaveData} from "@/lands-unknown/quests/QuestsSaveData";

export class Quests extends Feature {

    list: AbstractQuest[] = [];

    protected _onQuestCompleted = new SimpleEventDispatcher<AbstractQuest>();

    public get onQuestCompleted(): ISimpleEvent<AbstractQuest> {
        return this._onQuestCompleted.asEvent();
    }

    constructor() {
        super('quests');
    }

    getQuest(id: QuestId) {
        return this.list.find(quest => {
            return quest.id === id;
        })
    }

    initialize(features: Features) {
        super.initialize(features);
        this.list = [
            new LumberjackQuest(features),
        ]

        this.list.forEach(quest => {
            quest.onQuestCompleted.one(quest => {
                this._onQuestCompleted.dispatch(quest);
            })
        })
    }

    start() {
        this.list.forEach(quest => {
            if (!quest.isStarted) {
                quest.before();
            }
        })
    }

    load(data: QuestsSaveData): void {
        data.list?.forEach(questData => {
            const quest = this.getQuest(questData.id)
            if (quest) {
                quest.load(questData)
            }
        })
    }

    save(): QuestsSaveData {
        return {
            list: this.list.filter(quest => {
                return quest.isStarted;
            }).map(quest => {
                return quest.save();
            })
        };
    }
}
