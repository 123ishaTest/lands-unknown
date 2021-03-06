import {Feature} from "@/ig-template/features/Feature";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {MoneyPouch} from "@/ig-template/features/items/instances/MoneyPouch";
import {Features} from "@/ig-template/Features";
import {ItemWithData} from "@/ig-template/features/items/instances/ItemWithData";
import {EmptyItem} from "@/ig-template/features/items/instances/EmptyItem";
import {RawFish} from "@/ig-template/features/items/instances/RawFish";
import {CookedFish} from "@/ig-template/features/items/instances/CookedFish";
import {Wood} from "@/ig-template/features/items/instances/Wood";
import {Stone} from "@/ig-template/features/items/instances/Stone";
import {IronOre} from "@/ig-template/features/items/instances/IronOre";
import {IronBar} from "@/ig-template/features/items/instances/IronBar";

export class ItemList extends Feature {

    _features = undefined as unknown as Features

    constructor() {
        super('item-list');
    }


    initialize(features: Features) {
        super.initialize(features);
        this._features = features;
    }

    get empty(): EmptyItem {
        return new EmptyItem();
    }

    get moneyPouch(): MoneyPouch {
        return new MoneyPouch(this._features.wallet)
    }

    get itemWithData(): ItemWithData {
        return new ItemWithData();
    }

    get rawFish(): RawFish {
        return new RawFish();
    }

    get wood(): Wood {
        return new Wood();
    }

    get stone(): Stone {
        return new Stone();
    }

    get ironOre(): IronOre {
        return new IronOre();
    }

    get ironBar(): IronBar {
        return new IronBar();
    }

    get cookedFish(): CookedFish {
        return new CookedFish();
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {}
    }
}
