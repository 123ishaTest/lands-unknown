import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {QuestSaveData} from "@/lands-unknown/quests/QuestSaveData";

export interface QuestsSaveData extends SaveData {
    list: QuestSaveData[];
}
