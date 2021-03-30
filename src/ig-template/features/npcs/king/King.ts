import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {KingDialog} from "@/ig-template/features/npcs/king/KingDialog";
import {Npc} from "@/ig-template/features/npcs/Npc";

export class King extends Npc {
    _inventory: Inventory;
    _keyItems: KeyItems;
    dialog: DialogTree<KingDialog>;

    constructor(inventory: Inventory, keyItems: KeyItems) {
        super(NpcId.King, "King")
        this._inventory = inventory;
        this._keyItems = keyItems;
        this.dialog = new DialogTree(
            KingDialog.Intro,
            [
                new Dialog(KingDialog.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi there"),
                        new DialogText(NpcId.King, "I am very busy, what do you want"),
                    ],
                    KingDialog.IntroQuestion
                ),
                new Dialog(KingDialog.AskAboutCrown,
                    [
                        new DialogText(NpcId.Player, "Where is your crown?"),
                        new DialogText(NpcId.King, "Not sure, I lost it somewhere"),
                        new DialogText(NpcId.Player, "Do you need me to go find it?"),
                        new DialogText(NpcId.King, "Ah, another adventurer looking for a quest"),
                        new DialogText(NpcId.Player, "At your service sir"),
                        new DialogText(NpcId.King, "Well tough luck, that quest isn't implemented yet, better luck next time"),
                        new DialogText(NpcId.Player, "Oh..."),
                    ],
                    KingDialog.IntroQuestion
                ),
                new Dialog(KingDialog.Goodbye,
                    [
                        new DialogText(NpcId.Player, "Have a nice day"),
                        new DialogText(NpcId.King, "..."),
                    ],
                ),
            ],
            [
                new DialogDecision(KingDialog.IntroQuestion,
                    new DialogText(NpcId.King, "What do you want?"),
                    [
                        new DialogOption("Where is your crown?", KingDialog.AskAboutCrown),
                        new DialogOption("Nevermind", KingDialog.Goodbye),
                    ]),

            ],
        );
    }
}
