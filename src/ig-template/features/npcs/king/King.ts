import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {SaveableNpc} from "@/ig-template/features/npcs/SaveableNpc";
import {NpcSaveData} from "@/ig-template/features/npcs/NpcSaveData";
import {Inventory} from "@/ig-template/features/inventory/Inventory";
import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {KingDialog} from "@/ig-template/features/npcs/king/KingDialog";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {KeyItemId} from "@/ig-template/features/key-items/KeyItemId";

export class King extends SaveableNpc {
    _inventory: Inventory;
    _keyItems: KeyItems;
    dialog: DialogTree<KingDialog>;

    alreadyGivenFish = false;

    constructor(inventory: Inventory, keyItems: KeyItems) {
        super(NpcId.King)
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
                        new DialogText(NpcId.King, "Well tough luck, Quests aren't implemented yet, better luck next time"),
                        new DialogText(NpcId.Player, "Oh..."),
                    ],
                    KingDialog.IntroQuestion
                ),
                new Dialog(KingDialog.BuyBoatTicket,
                    [
                        new DialogText(NpcId.Player, "I would like a boat ticket"),
                        new DialogText(NpcId.King, "Well everyone wants one, do you think you deserve it?"),
                        new DialogText(NpcId.Player, "Yes.......?"),
                        new DialogText(NpcId.King, "Yes.......?"),
                        new DialogText(NpcId.Player, "Yes!"),
                        new DialogText(NpcId.King, "Ugh fine"),
                    ],
                    KingDialog.BuyBoatTicketQuestion
                ),
                new Dialog(KingDialog.DontBuyBoatTicket,
                    [
                        new DialogText(NpcId.Player, "Hmm I guess I can't afford it"),
                        new DialogText(NpcId.King, "Ugh... thanks for wasting my time"),
                    ],
                ),
                new Dialog(KingDialog.AlreadyHasBoatTicket,
                    [
                        new DialogText(NpcId.King, "You already have a boat ticket..."),
                        new DialogText(NpcId.Player, "Huh, guess I forgot"),
                        new DialogText(NpcId.King, "Get out of my face"),
                        new DialogText(NpcId.Player, "And I thought the customer was king..."),
                    ],
                ),
                new Dialog(KingDialog.BoatTicketBought,
                    [
                        new DialogText(NpcId.Player, "Thanks!"),
                        new DialogText(NpcId.King, "You're welcome, now please leave"),
                    ],
                ),

            ],
            [
                new DialogDecision(KingDialog.IntroQuestion,
                    new DialogText(NpcId.King, "What do you want?"),
                    [
                        new DialogOption("Can I buy a Boat Ticket?", KingDialog.BuyBoatTicket),
                        new DialogOption("Where is your crown?", KingDialog.AskAboutCrown),
                    ]),
                new DialogDecision(KingDialog.BuyBoatTicketQuestion,
                    new DialogText(NpcId.King, "Buy a boat ticket?"),
                    [
                        new DialogOption("Yes (-100 wood)", KingDialog.TryToBuyBoatTicket),
                        new DialogOption("No", KingDialog.DontBuyBoatTicket),
                    ])
            ],
            [
                new NpcDecision(KingDialog.TryToBuyBoatTicket, () => {
                    const cost = new ItemAmount(ItemId.Wood, 100);
                    if (!this._inventory.hasItemAmount(cost)) {
                        return KingDialog.DontBuyBoatTicket;
                    } else {
                        this._inventory.loseItemAmount(cost.id, cost.amount);
                        this._keyItems.gainKeyItem(KeyItemId.BoatTicket);
                        return KingDialog.BoatTicketBought
                    }
                })

            ]
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
