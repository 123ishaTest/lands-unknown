import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Quest} from "@/lands-unknown/quests/Quest";
import {Features} from "@/ig-template/Features";
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {QuestId} from "@/lands-unknown/quests/QuestId";

export class Quests extends Feature {

    list: Quest[] = [];

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
