import {SkillId} from "@/lands-unknown/features/skills/SkillId";

export class Experience {
    skill: SkillId;
    exp: number;

    constructor(skill: SkillId, exp: number) {
        this.skill = skill;
        this.exp = exp;
    }
}
