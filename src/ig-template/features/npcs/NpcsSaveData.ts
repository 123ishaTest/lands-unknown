import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {NpcSaveData} from "@/ig-template/features/npcs/NpcSaveData";

export interface NpcsSaveData extends SaveData {
    npcs: NpcSaveData[];
}
