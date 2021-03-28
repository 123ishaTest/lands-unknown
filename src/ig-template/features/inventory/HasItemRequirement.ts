import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {Inventory} from "@/ig-template/features/inventory/Inventory";

export class HasItemRequirement extends Requirement {
    _inventory: Inventory;

    item: ItemId;
    amount: number;

    constructor(item: ItemId, amount: number, inventory: Inventory) {
        super();
        this.item = item;
        this.amount = amount;

        this._inventory = inventory;
    }

    get actualValue(): number {
        return this._inventory.getTotalAmount(this.item);
    }

    get hint(): string {
        return `Requires ${this.amount} ${this.item}`;
    }

    get targetValue(): number {
        return this.amount;
    }

}
