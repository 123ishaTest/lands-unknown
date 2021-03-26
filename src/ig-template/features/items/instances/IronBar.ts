import {AbstractItem} from "@/ig-template/features/items/AbstractItem";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {ItemType} from "@/ig-template/features/items/ItemType";

export class IronBar extends AbstractItem {
    constructor() {
        super('Iron Bar', "Smithing skill now?", ItemId.IronBar, ItemType.Default);
    }
}
