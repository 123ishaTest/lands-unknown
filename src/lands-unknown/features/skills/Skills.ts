import {Feature} from "@/ig-template/features/Feature";
import {SkillsSaveData} from "@/lands-unknown/features/skills/SkillsSaveData";
import {SkillId} from "@/lands-unknown/features/skills/SkillId";
import {Skill} from "@/lands-unknown/features/skills/Skill";

export class Skills extends Feature {

    skills: Skill[];

    constructor() {
        super('skills');
        this.skills = [
            new Skill("Mining", SkillId.Mining, 'bg-gray-600'),
            new Skill("Woodcutting", SkillId.Woodcutting, 'bg-green-600'),
            new Skill("Fishing", SkillId.Fishing, 'bg-blue-600'),
        ];
    }

    getSkill(id: SkillId) {
        return this.skills.find(skill => {
            return skill.id === id;
        })
    }

    gainExperience(id: SkillId, amount: number) {
        this.getSkill(id)?.gainExperience(amount);
    }

    load(data: SkillsSaveData): void {
        if (data.skills) {
            data.skills.forEach(savedSkill => {
                const skill = this.getSkill(savedSkill.id);
                if (skill) {
                    skill.exp = savedSkill.exp;
                }
            })
        }
    }

    save(): SkillsSaveData {
        const skills = this.skills.map(skill => {
            return {
                id: skill.id,
                exp: skill.exp,
            }
        });
        return {
            skills: skills
        }
    }
}
