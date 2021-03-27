import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {Skill} from "@/lands-unknown/features/skills/Skill";

export class SkillLevelRequirement extends Requirement {
    skill: Skill
    level: number;

    constructor(skill: Skill, level: number) {
        super();
        this.skill = skill;
        this.level = level;
    }

    get actualValue(): number {
        return this.skill.getLevel();
    }

    get hint(): string {
        return `Reach Lvl. ${this.level} ${this.skill.name}`;
    }

    get targetValue(): number {
        return this.level;
    }

}
