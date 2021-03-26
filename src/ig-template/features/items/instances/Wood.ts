import {AbstractItem} from "@/ig-template/features/items/AbstractItem";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {ItemType} from "@/ig-template/features/items/ItemType";

export class Wood extends AbstractItem {
    constructor() {
        super('Wood', 'Firemaking is not a real skill', ItemId.Wood, ItemType.Default);
    }
}
