import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {Experience} from "@/lands-unknown/features/skills/Experience";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";

export class SkillAction extends AbstractAction {
    icon: string;
    id: ActionId
    _skills: Skills;
    _inventory: Inventory;
    _itemList: ItemList;

    input: ItemAmount[];
    output: ItemAmount[];
    expRewards: Experience[];


    constructor(id: ActionId, description: string, duration: number,  icon: string, skills: Skills, inventory: Inventory, itemList: ItemList, input: ItemAmount[], output: ItemAmount[], expRewards: Experience[], requirement: Requirement = new NoRequirement()) {
        super(description, duration, 0, requirement);
        this.id = id;
        this.icon = icon;
        this._skills = skills;
        this._inventory = inventory;
        this._itemList = itemList;
        this.input = input;
        this.output = output;
        this.expRewards = expRewards;
    }

    canPerform(): boolean {
        if (!this._inventory.hasItemAmounts(this.input)) {
            return false;
        }
        if (!this._inventory.canTakeItemAmounts(this.output)) {
            return false
        }

        return super.canPerform();
    }

    gainReward(): boolean {
        if (!this.canPerform()) {
            return false;
        }

        this.input.forEach(itemAmount => {
            this._inventory.loseItemAmount(itemAmount.id, itemAmount.amount);
        });

        this.output.forEach(itemAmount => {
            this._inventory.gainItem(this._itemList[itemAmount.id], itemAmount.amount);
        });

        this.expRewards.forEach(expReward => {
            this._skills.gainExperience(expReward.skill, expReward.exp);
        });

        // Check if we can still perform this recipe again
        return this.canPerform()
    }

}
