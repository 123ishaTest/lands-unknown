import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {Quest} from "@/lands-unknown/quests/Quest";
import {Features} from "@/ig-template/Features";
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";

export class Quests extends Feature {

    list: Quest[] = [];
    constructor() {
        super('quests');
    }


    initialize(features: Features) {
        super.initialize(features);
        this.list = [
            new LumberjackQuest(),
        ]
    }

    load(data: SaveData): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }
}
