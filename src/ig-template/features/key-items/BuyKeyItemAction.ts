import {RecipeAction} from "@/ig-template/tools/actions/RecipeAction";
import {KeyItemId} from "@/ig-template/features/key-items/KeyItemId";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export class BuyKeyItemAction extends RecipeAction {
    _keyItems: KeyItems;
    keyItem: KeyItemId;

    constructor(description: string, duration: number, cost: ItemAmount[], keyItem: KeyItemId, keyItems: KeyItems, inventory: Inventory, itemList: ItemList, requirement: Requirement = new NoRequirement()) {
        super(description, duration, cost, [], inventory, itemList, requirement);
        this.keyItem = keyItem;
        this._keyItems = keyItems;
    }

    hasKeyItem(): boolean {
        return this._keyItems.hasKeyItem(this.keyItem);
    }

    canSee(): boolean {
        return !this.hasKeyItem();
    }

    canSchedule(): boolean {
        return !this.hasKeyItem() && super.canSchedule();
    }

    canPerform(): boolean {
        return !this.hasKeyItem() && super.canPerform();
    }

    gainReward(): boolean {
        this._keyItems.gainKeyItem(this.keyItem);
        super.gainReward();
        return false;
    }
}
