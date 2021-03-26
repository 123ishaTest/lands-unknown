import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {Experience} from "@/lands-unknown/features/skills/Experience";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export class SkillAction extends AbstractAction {
    icon: string;
    _skills: Skills;
    expRewards: Experience[];


    constructor(description: string, duration: number, repeat: number, icon: string, expRewards: Experience[], skills: Skills, requirement: Requirement = new NoRequirement()) {
        super(description, duration, repeat, requirement);
        this.icon = icon;
        this._skills = skills;
        this.expRewards = expRewards;
    }

    gainReward(): boolean {
        this.expRewards.forEach(expReward => {
            this._skills.gainExperience(expReward.skill, expReward.exp);
        })
        return true;
    }


}
