import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {SkillId} from "@/lands-unknown/features/skills/SkillId";

export interface SkillsSaveData extends SaveData {
    skills: {
        id: SkillId;
        exp: number;
    }[];
}
