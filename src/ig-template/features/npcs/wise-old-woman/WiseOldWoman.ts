import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {WiseOldWomanDialog} from "@/ig-template/features/npcs/wise-old-woman/WiseOldWomanDialog";
import {Skills} from "@/lands-unknown/features/skills/Skills";
import {SkillLevelRequirement} from "@/lands-unknown/features/skills/SkillLevelRequirement";
import {SaveableNpc} from "@/ig-template/features/npcs/SaveableNpc";
import {NpcSaveData} from "@/ig-template/features/npcs/NpcSaveData";
import {ItemList} from "@/ig-template/features/items/ItemList";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";

export class WiseOldWoman extends SaveableNpc {

    _skills: Skills;
    _inventory: Inventory;
    _itemList: ItemList;
    dialog: DialogTree<WiseOldWomanDialog>;

    alreadyGivenFish = false;

    constructor(skills: Skills, inventory: Inventory, itemList: ItemList) {
        super(NpcId.WiseOldWoman)
        this._skills = skills;
        this._inventory = inventory;
        this._itemList = itemList;
        this.dialog = new DialogTree(
            WiseOldWomanDialog.Intro,
            [
                new Dialog(WiseOldWomanDialog.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi"),
                    ],
                    WiseOldWomanDialog.Question
                ),
                new Dialog(WiseOldWomanDialog.GiveFish,
                    [
                        new DialogText(NpcId.Player, "Yes please"),
                        new DialogText(NpcId.WiseOldWoman, "Here it is", () => {
                            this._inventory.gainItem(this._itemList.rawFish);
                            this.alreadyGivenFish = true;
                        })],
                ),
                new Dialog(WiseOldWomanDialog.AlreadyGivenFish,
                    [
                        new DialogText(NpcId.Player, "Oh wow, I would love to get a fish for the first time"),
                        new DialogText(NpcId.WiseOldWoman, "Nice try, I've already given you a fish")],
                ),
                new Dialog(WiseOldWomanDialog.BragAboutCooking,
                    [
                        new DialogText(NpcId.Player, "No thanks, I'm something of a master chef myself"),
                        new DialogText(NpcId.WiseOldWoman, "Pff...")],
                ),
                new Dialog(WiseOldWomanDialog.NoFish,
                    [
                        new DialogText(NpcId.Player, "No thanks, I don't like fish"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure??"),
                        new DialogText(NpcId.Player, "Yes?"),
                        new DialogText(NpcId.WiseOldWoman, "Hmm... you sure?"),
                    ],
                    WiseOldWomanDialog.Question,
                ),
            ],
            [
                new DialogDecision(WiseOldWomanDialog.Question,
                    new DialogText(NpcId.WiseOldWoman, "Hello young man, would you like a Fish?"),
                    [
                        new DialogOption("Yes", WiseOldWomanDialog.YesFish),
                        new DialogOption("Yuck no", WiseOldWomanDialog.NoFish),
                        new DialogOption("Pff, I bet I can make them more delicious (3 cooking)", WiseOldWomanDialog.BragAboutCooking, new SkillLevelRequirement(skills.cooking, 3)),
                    ])
            ],
            [
                new NpcDecision(WiseOldWomanDialog.YesFish, () => {
                    return this.alreadyGivenFish ? WiseOldWomanDialog.AlreadyGivenFish : WiseOldWomanDialog.GiveFish;
                })
            ],
        );
    }

    save(): NpcSaveData {
        return {
            id: this.id,
            data: {
                alreadyGivenFish: this.alreadyGivenFish,
            }
        }
    }

    load(data: NpcSaveData): void {
        this.alreadyGivenFish = data.data.alreadyGivenFish ?? this.alreadyGivenFish;
    }
}
