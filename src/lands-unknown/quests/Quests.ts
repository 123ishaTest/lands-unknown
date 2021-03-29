import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Quest} from "@/lands-unknown/quests/Quest";
import {Features} from "@/ig-template/Features";
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export class Quests extends Feature {

    list: Quest[] = [];

    protected _onQuestCompleted = new SimpleEventDispatcher<Quest>();

    public get onQuestCompleted(): ISimpleEvent<Quest> {
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
            quest.before();
        })
    }

    load(data: SaveData): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}
