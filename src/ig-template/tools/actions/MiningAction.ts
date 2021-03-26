import {GainItemAction} from "@/ig-template/tools/actions/GainItemAction";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {SkillId} from "@/lands-unknown/features/skills/SkillId";

export class MiningAction extends GainItemAction {
    icon = "fa-gem";
    _skills: Skills;
    exp: number

    constructor(itemId: ItemId, description: string, duration: number, exp: number, inventory: Inventory, itemList: ItemList, skills: Skills) {
        super(itemId, description, duration, inventory, itemList);
        this.exp = exp;
        this._skills = skills;
    }


    gainReward(): boolean {
        this._skills.gainExperience(SkillId.Mining, 10);
        return super.gainReward();
    }
}
