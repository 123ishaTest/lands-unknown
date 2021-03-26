import {AbstractItem} from "@/ig-template/features/items/AbstractItem";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {ItemType} from "@/ig-template/features/items/ItemType";

export class Stone extends AbstractItem {
    constructor() {
        super('Stone', "Don't eat it", ItemId.Stone, ItemType.Default);
    }
}
