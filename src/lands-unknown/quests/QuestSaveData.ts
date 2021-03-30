import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {QuestId} from "@/lands-unknown/quests/QuestId";

export interface QuestSaveData extends SaveData {
    id: QuestId;
    steps: {
        step: number;
        data: any;
    }[];
    currentIndex: number;
}
