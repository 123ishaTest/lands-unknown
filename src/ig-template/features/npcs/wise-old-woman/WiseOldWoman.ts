import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {WiseOldWomanDialogId} from "@/ig-template/features/npcs/wise-old-woman/WiseOldWomanDialogId";
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
    dialog: DialogTree<WiseOldWomanDialogId>;

    alreadyGivenFish = false;

    constructor(skills: Skills, inventory: Inventory, itemList: ItemList) {
        super(NpcId.WiseOldWoman, 'wise-old-woman')
        this._skills = skills;
        this._inventory = inventory;
        this._itemList = itemList;
        this.dialog = new DialogTree(
            WiseOldWomanDialogId.Intro,
            [
                new Dialog(WiseOldWomanDialogId.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi"),
                    ],
                    WiseOldWomanDialogId.Question
                ),
                new Dialog(WiseOldWomanDialogId.GiveFish,
                    [
                        new DialogText(NpcId.Player, "Yes please"),
                        new DialogText(NpcId.WiseOldWoman, "Here it is", () => {
                            this._inventory.gainItem(this._itemList.rawFish);
                            this.alreadyGivenFish = true;
                        })],
                ),
                new Dialog(WiseOldWomanDialogId.AlreadyGivenFish,
                    [
                        new DialogText(NpcId.Player, "Oh wow, I would love to get a fish for the first time"),
                        new DialogText(NpcId.WiseOldWoman, "Nice try, I've already given you a fish")],
                ),
                new Dialog(WiseOldWomanDialogId.BragAboutCooking,
                    [
                        new DialogText(NpcId.Player, "No thanks, I'm something of a master chef myself"),
                        new DialogText(NpcId.WiseOldWoman, "Pff...")],
                ),
                new Dialog(WiseOldWomanDialogId.NoFish,
                    [
                        new DialogText(NpcId.Player, "No thanks, I don't like fish"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure??"),
                        new DialogText(NpcId.Player, "Yes?"),
                        new DialogText(NpcId.WiseOldWoman, "Hmm... you sure?"),
                    ],
                    WiseOldWomanDialogId.Question,
                ),
            ],
            [
                new DialogDecision(WiseOldWomanDialogId.Question,
                    new DialogText(NpcId.WiseOldWoman, "Hello young man, would you like a Fish?"),
                    [
                        new DialogOption("Yes", WiseOldWomanDialogId.YesFish),
                        new DialogOption("Yuck no", WiseOldWomanDialogId.NoFish),
                        new DialogOption("Pff, I bet I can make them more delicious (3 cooking)", WiseOldWomanDialogId.BragAboutCooking, new SkillLevelRequirement(skills.cooking, 3)),
                    ])
            ],
            [
                new NpcDecision(WiseOldWomanDialogId.YesFish, () => {
                    return this.alreadyGivenFish ? WiseOldWomanDialogId.AlreadyGivenFish : WiseOldWomanDialogId.GiveFish;
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
