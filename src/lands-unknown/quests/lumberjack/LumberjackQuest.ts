import {AbstractQuest} from "@/lands-unknown/quests/AbstractQuest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Features} from "@/ig-template/Features";
import {PermanentlyAddActionInjection} from "@/lands-unknown/quests/injections/PermanentlyAddActionInjection";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {CompleteSkillActionQuestStep} from "@/lands-unknown/quests/steps/CompleteSkillActionQuestStep";
import {DialogNpcDecisionInjection} from "@/lands-unknown/quests/injections/DialogNpcDecisionInjection";
import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";
import {InjectionQuestStep} from "@/lands-unknown/quests/steps/InjectionQuestStep";
import {ItemAmount} from "@/ig-template/features/items/ItemAmount";
import {ItemId} from "@/ig-template/features/items/ItemId";
import {KeyItemId} from "@/ig-template/features/key-items/KeyItemId";
import {DialogRootInjection} from "@/lands-unknown/quests/injections/DialogRootInjection";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {LumberjackQuestKingDialog} from "@/lands-unknown/quests/lumberjack/LumberjackQuestKingDialog";
import {LumberjackQuestLumberjackDialog} from "@/lands-unknown/quests/lumberjack/LumberjackQuestLumberjackDialog";
import {LumberjackQuestStepId} from "@/lands-unknown/quests/lumberjack/LumberjackQuestStepId";

export class LumberjackQuest extends AbstractQuest {
    before(): void {
        const introInjection = new DialogRootInjection(
            NpcId.Lumberjack,
            "I need something to do",
            new Dialog(LumberjackQuestLumberjackDialog.QuestIntro, [
                    new DialogText(NpcId.Player, "Hello Lumberjack, are you ok?"),
                    new DialogText(NpcId.Lumberjack, "I'm a Lumberjack and I'm okay!"),
                    new DialogText(NpcId.Player, "I can see that..."),
                    new DialogText(NpcId.Lumberjack, "But to be honest, I could use some help"),
                    new DialogText(NpcId.Lumberjack, "My companion recently went home to visit his sick mother"),
                    new DialogText(NpcId.Lumberjack, "And now I'm 25 wood short of my monthly goal"),
                    new DialogText(NpcId.Lumberjack, "The King will be furious"),
                    new DialogText(NpcId.Player, "Maybe I can help?"),
                    new DialogText(NpcId.Lumberjack, "You can!"),
                    new DialogText(NpcId.Lumberjack, "But you need permissions from the King to chop wood here"),
                    new DialogText(NpcId.Player, "Alright, I'll go and ask him"),
                    new DialogText(NpcId.Lumberjack, "He might be grumpy, so good luck!", () => {
                        this.start();
                        introInjection.eject(this._features);
                    }),
                ],
                LumberjackQuestLumberjackDialog.QuestExplanation
            )
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        this._features.keyItems.gainKeyItem(KeyItemId.BoatTicket);
    }

    constructor(features: Features) {
        super(QuestId.Lumberjack, "Out of the woodworks", [
                new InjectionQuestStep(LumberjackQuestStepId.Intro, [
                        new DialogRootInjection(
                            NpcId.Lumberjack,
                            "Talk about lumberjack quest",
                            new Dialog(LumberjackQuestLumberjackDialog.QuestExplanation, [
                                    new DialogText(NpcId.Player, "I will try my best", () => {
                                            this.completeStep(LumberjackQuestStepId.Intro)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new InjectionQuestStep(LumberjackQuestStepId.AskPermissionFromKing, [
                        new DialogRootInjection(
                            NpcId.King,
                            "That's a nice looking forest you got there",
                            new Dialog(LumberjackQuestKingDialog.AskWoodCuttingPermission, [
                                    new DialogText(NpcId.Player, "Hi, I want to help the lumberjack?"),
                                    new DialogText(NpcId.King, "What do you need from me?"),
                                    new DialogText(NpcId.Player, "Well I need to cut some trees in the forest"),
                                    new DialogText(NpcId.King, "And...?"),
                                    new DialogText(NpcId.Player, "And... I heard I needed your permission"),
                                    new DialogText(NpcId.King, "That is true"),
                                    new DialogText(NpcId.Player, "..."),
                                    new DialogText(NpcId.Player, "So can I get that permission?"),
                                    new DialogText(NpcId.King, "..."),
                                    new DialogText(NpcId.Player, "..."),
                                    new DialogText(NpcId.King, "Fine"),
                                    new DialogText(NpcId.Player, "Thanks...", () => {
                                            this.completeStep(LumberjackQuestStepId.AskPermissionFromKing)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ), new InjectionQuestStep(LumberjackQuestStepId.BackToLumberjack, [
                    new DialogRootInjection(
                        NpcId.Lumberjack,
                        "I've talked to the king",
                        new Dialog(LumberjackQuestLumberjackDialog.WoodcuttingExplanation, [
                                new DialogText(NpcId.Player, "The King said it's okay"),
                                new DialogText(NpcId.Lumberjack, "Great! Let's start chopping"),
                                new DialogText(NpcId.Player, "Ehm..."),
                                new DialogText(NpcId.Player, "Chop Chop?"),
                                new DialogText(NpcId.Lumberjack, "You do know how to chop wood don't you?"),
                                new DialogText(NpcId.Player, "Yes!"),
                                new DialogText(NpcId.Lumberjack, "..."),
                                new DialogText(NpcId.Player, "No...", () => {
                                        this.completeStep(LumberjackQuestStepId.BackToLumberjack)
                                    }
                                ),
                                new DialogText(NpcId.Lumberjack, "It's easy, just press the 'Chop Wood' button!"),
                                new DialogText(NpcId.Player, "I see, thanks"),
                                new DialogText(NpcId.Lumberjack, "Talk to me again when you've chopped 25 wood!"),
                            ]
                        )
                    )
                ]
                ), new CompleteSkillActionQuestStep(LumberjackQuestStepId.GatherWood, ActionId.CutWood, 25, [
                    new PermanentlyAddActionInjection(new TownLocationIdentifier(WorldLocationId.Lumberjack), ActionId.CutWood),
                ], features.adventurer),
                new InjectionQuestStep(LumberjackQuestStepId.WoodGathered, [
                    new DialogRootInjection(
                        NpcId.Lumberjack,
                        "I've gathered 25 wood",
                        new Dialog(LumberjackQuestLumberjackDialog.WoodGathered, [
                                new DialogText(NpcId.Player, "I did it, I chopped 25 wood!"),
                                new DialogText(NpcId.Lumberjack, "Thanks, I'll take that from you now!"),
                            ],
                            LumberjackQuestLumberjackDialog.HasEnoughWoodCheck
                        )
                    ),
                    new DialogInjection(
                        NpcId.Lumberjack,
                        new Dialog(LumberjackQuestLumberjackDialog.NotEnoughWood, [
                                new DialogText(NpcId.Lumberjack, "Are you trying to scam me? You don't have 25 wood!"),
                                new DialogText(NpcId.Player, "I must have lost it somewhere"),
                                new DialogText(NpcId.Lumberjack, "Well you better go and find it..."),
                            ],
                        )
                    ),
                    new DialogInjection(
                        NpcId.Lumberjack,
                        new Dialog(LumberjackQuestLumberjackDialog.HasEnoughWood, [
                                new DialogText(NpcId.Player, "Sure", () => {
                                    this.completeStep(LumberjackQuestStepId.WoodGathered)
                                }),
                                new DialogText(NpcId.Player, "Can I get a reward?"),
                                new DialogText(NpcId.Lumberjack, "I don't have anything to give you"),
                                new DialogText(NpcId.Player, "Oh..."),
                                new DialogText(NpcId.Lumberjack, "Maybe the king has something for you?"),
                            ],
                        )
                    ),
                    new DialogNpcDecisionInjection(NpcId.Lumberjack,
                        new NpcDecision(LumberjackQuestLumberjackDialog.HasEnoughWoodCheck, () => {
                            const cost = new ItemAmount(ItemId.Wood, 25);
                            if (!features.inventory.hasItemAmount(cost)) {
                                return LumberjackQuestLumberjackDialog.NotEnoughWood;
                            }
                            features.inventory.loseItemAmount(cost.id, cost.amount);
                            return LumberjackQuestLumberjackDialog.HasEnoughWood
                        }))
                ]),
                new InjectionQuestStep(LumberjackQuestStepId.GetBoatTicketFromKing, [
                        new DialogRootInjection(
                            NpcId.King,
                            "I've helped the Lumberjack",
                            new Dialog(LumberjackQuestKingDialog.ClaimReward, [
                                    new DialogText(NpcId.King, "So...?"),
                                    new DialogText(NpcId.Player, "So... I was hoping I could get a reward"),
                                    new DialogText(NpcId.King, "Shouldn't the Lumberjack reward you if you helped him"),
                                    new DialogText(NpcId.Player, "N.. N.. N-o"),
                                    new DialogText(NpcId.King, "No?"),
                                    new DialogText(NpcId.Player, "No!"),
                                    new DialogText(NpcId.Player, "He is your citizen, he needed help, you should have helped him in the first place!"),
                                    new DialogText(NpcId.King, "Now hold o-"),
                                    new DialogText(NpcId.Player, "So it is up to you give me a reward"),
                                    new DialogText(NpcId.King, "Ugh sure, if you promise to go away"),
                                    new DialogText(NpcId.Player, "Deal"),
                                    new DialogText(NpcId.King, "Here, you can have this boat ticket, it grants access to a small island to the east"),
                                    new DialogText(NpcId.Player, "Wow, thanks...", () => {
                                            this.completeStep(LumberjackQuestStepId.GetBoatTicketFromKing)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                )
            ],
            new NoRequirement(), features);
    }
}
