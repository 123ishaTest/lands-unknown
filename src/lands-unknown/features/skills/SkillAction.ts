import {Experience} from "@/lands-unknown/features/skills/Experience";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {RecipeAction} from "@/ig-template/tools/actions/RecipeAction";

export class SkillAction extends RecipeAction {
    icon: string;
    id: ActionId
    _skills: Skills;
    expRewards: Experience[];


    constructor(id: ActionId, description: string, duration: number,  icon: string, skills: Skills, inventory: Inventory, itemList: ItemList, input: ItemAmount[], output: ItemAmount[], expRewards: Experience[], requirement: Requirement = new NoRequirement()) {
        super(description, duration, input, output, inventory, itemList, requirement);
        this.id = id;
        this.icon = icon;
        this._skills = skills;
        this.expRewards = expRewards;
    }

    gainReward(): boolean {
        this.expRewards.forEach(expReward => {
            this._skills.gainExperience(expReward.skill, expReward.exp);
        });

        super.gainReward();
        // Check if we can still perform this recipe again
        return this.canPerform()
    }

}
