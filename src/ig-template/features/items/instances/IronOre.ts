import {AbstractItem} from "@/ig-template/features/items/AbstractItem";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {ItemType} from "@/ig-template/features/items/ItemType";

export class IronOre extends AbstractItem {
    constructor() {
        super('Iron Ore', "Smithing skill when?", ItemId.IronOre, ItemType.Default);
    }
}
