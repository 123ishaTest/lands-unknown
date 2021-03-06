import {Feature} from "@/ig-template/features/Feature";
import {Features} from "@/ig-template/Features";
import {SaveData} from "@/ig-template/tools/saving/SaveData";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {SkillAction} from "@/lands-unknown/features/skills/SkillAction";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {Experience} from "@/lands-unknown/features/skills/Experience";
import {SkillId} from "@/lands-unknown/features/skills/SkillId";
import {SkillLevelRequirement} from "@/lands-unknown/features/skills/SkillLevelRequirement";
import {RecipeAction} from "@/ig-template/tools/actions/RecipeAction";

export class ActionList extends Feature {
    _features = undefined as unknown as Features

    constructor() {
        super('action-list');
    }


    initialize(features: Features) {
        super.initialize(features);
        this._features = features;
    }

    get mineStone(): SkillAction {
        return new SkillAction(ActionId.MineStone, "Mine Stone", 3,
            'fa-gem', this._features.skills, this._features.inventory, this._features.itemList,
            [], [new ItemAmount(ItemId.Stone)], [new Experience(4, SkillId.Mining)]);
    }

    get mineIron(): SkillAction {
        return new SkillAction(ActionId.MineIron, "Mine Iron", 5,
            'fa-gem', this._features.skills, this._features.inventory, this._features.itemList,
            [], [new ItemAmount(ItemId.IronOre)], [new Experience(4, SkillId.Mining)], new SkillLevelRequirement(this._features.skills.mining, 5));
    }

    get smeltIron(): SkillAction {
        return new SkillAction(ActionId.SmeltIron, "Smelt Iron", 5,
            'fa-hammer-war', this._features.skills, this._features.inventory, this._features.itemList,
            [new ItemAmount(ItemId.IronOre)], [new ItemAmount(ItemId.IronBar)], [new Experience(4, SkillId.Smithing)]);
    }

    get fish(): SkillAction {
        return new SkillAction(ActionId.Fish, "Fish", 3,
            'fa-fish', this._features.skills, this._features.inventory, this._features.itemList,
            [], [new ItemAmount(ItemId.RawFish)], [new Experience(4, SkillId.Fishing)]);
    }

    get cookFish(): SkillAction {
        return new SkillAction(ActionId.CookFish, "Cook the fish", 3,
            'fa-fish', this._features.skills, this._features.inventory, this._features.itemList,
            [new ItemAmount(ItemId.RawFish)], [new ItemAmount(ItemId.CookedFish)], [new Experience(4, SkillId.Cooking)]);
    }

    get cutWood(): SkillAction {
        return new SkillAction(ActionId.CutWood, "Chop Wood", 3,
            'fa-tree', this._features.skills, this._features.inventory, this._features.itemList,
            [], [new ItemAmount(ItemId.Wood)], [new Experience(4, SkillId.Woodcutting)]);
    }

    get lootIslandChest(): RecipeAction {
        return new RecipeAction("Loot chest", 10, [new ItemAmount(ItemId.IronBar)], [new ItemAmount(ItemId.MoneyPouch)], this._features.inventory, this._features.itemList)
    }

    // Facilities
    get furnace(): SkillAction[] {
        return [
            this.smeltIron,
        ]
    }

    get cookingRange(): SkillAction[] {
        return [
            this.cookFish,
        ]
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {}
    }
}
