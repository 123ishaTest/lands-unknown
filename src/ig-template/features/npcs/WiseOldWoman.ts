import {Npc} from "@/ig-template/features/npcs/Npc";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {Features} from "@/ig-template/Features";
import {WiseOldWomanDialogId} from "@/ig-template/features/npcs/wise-old-woman/WiseOldWomanDialogId";

export class WiseOldWoman extends Npc {
    dialog: DialogTree<WiseOldWomanDialogId>;

    constructor() {
        super(NpcId.WiseOldWoman)
        this.dialog = new DialogTree(
            [
                new Dialog(WiseOldWomanDialogId.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi"),
                    ],
                    WiseOldWomanDialogId.Question
                ),
                new Dialog(WiseOldWomanDialogId.YesBagel,
                    [
                        new DialogText(NpcId.Player, "Yes please"),
                        new DialogText(NpcId.WiseOldWoman, "Here it is", function () {
                            console.log("Here is a bagel")
                        })],
                ),
                new Dialog(WiseOldWomanDialogId.NoBagel,
                    [
                        new DialogText(NpcId.Player, "No thanks, cutting down on carbs"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes?"),
                        new DialogText(NpcId.WiseOldWoman, "I'll ask one more time?"),
                    ],
                    WiseOldWomanDialogId.Question,
                ),
            ],
            [
                new DialogDecision(WiseOldWomanDialogId.Question,
                    new DialogText(NpcId.WiseOldWoman, "Hello young man, would you like a bagel?"),
                    [
                        new DialogOption("Yes", WiseOldWomanDialogId.YesBagel),
                        new DialogOption("Yuck no", WiseOldWomanDialogId.NoBagel),
                        // new DialogOption("I'll make them myself (3 cooking)", DialogId.WiseOldWomanBragAboutCooking, new SkillLevelRequirement(features.skills.cooking, 3)),
                    ])
            ],
            WiseOldWomanDialogId.Intro
        );
    }

    initialize(features: Features): void {
        // this.dialog = new DialogTree(
        //     [
        //         new Dialog(
        //             DialogId.WiseOldWomanIntro,
        //             [
        //                 new DialogText(NpcId.Player, "Hi"),
        //                 new DialogText(NpcId.WiseOldWoman, "Hello young man, would you like a bagel?")
        //             ],
        //             DialogDecisionId.WiseOldWomanQuestion
        //         ),
        //         new Dialog(
        //             DialogId.WiseOldWomanYesBagel,
        //             [new DialogText(NpcId.Player, "Yes please"), new DialogText(NpcId.WiseOldWoman, "Here it is", function () {
        //                 console.log("Here is a bagel")
        //             })],
        //         ),
        //         new Dialog(
        //             DialogId.WiseOldWomanNoBagel,
        //             [
        //                 new DialogText(NpcId.Player, "No thanks, cutting down on carbs"),
        //                 new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
        //                 new DialogText(NpcId.Player, "Yes"),
        //                 new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
        //                 new DialogText(NpcId.Player, "Yes?"),
        //                 new DialogText(NpcId.WiseOldWoman, "I'll ask one more time?"),
        //             ],
        //             DialogDecisionId.WiseOldWomanQuestion,
        //         ),
        //     ],
        //     [
        //         new DialogDecision(DialogDecisionId.WiseOldWomanQuestion, [
        //             new DialogOption("Yes", DialogId.WiseOldWomanYesBagel),
        //             new DialogOption("Yuck no", DialogId.WiseOldWomanNoBagel),
        //             new DialogOption("I'll make them myself (3 cooking)", DialogId.WiseOldWomanBragAboutCooking, new SkillLevelRequirement(features.skills.cooking, 3)),
        //         ])
        //     ],
        //     DialogId.WiseOldWomanIntro
        // );
    }
}
