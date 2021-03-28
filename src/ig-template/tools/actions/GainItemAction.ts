import {AbstractAction} from "@/ig-template/tools/actions/AbstractAction";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export class GainItemAction extends AbstractAction {
    icon = "fa-question";
    itemId: ItemId;

    _inventory: Inventory;
    _itemList: ItemList;

    constructor(itemId: ItemId, description: string, duration: number, inventory: Inventory, itemList: ItemList, requirement: Requirement = new NoRequirement()) {
        super(description, duration, 0, requirement);
        this.itemId = itemId;
        this._inventory = inventory;
        this._itemList = itemList;
    }

    gainReward(): boolean {
        this._inventory.gainItem(this._itemList[this.itemId]);
        return true;
    }

}
