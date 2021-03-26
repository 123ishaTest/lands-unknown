import {GainItemAction} from "@/ig-template/tools/actions/GainItemAction";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {ItemList} from "@/ig-template/features/items/ItemList";

export class FishingAction extends GainItemAction {
    icon = "fa-fish";

    constructor(itemId: ItemId, description: string, duration: number, inventory: Inventory, itemList: ItemList) {
        super(itemId, description, duration, inventory, itemList);
    }
}
