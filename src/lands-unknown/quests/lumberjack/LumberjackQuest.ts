import {Quest} from "@/lands-unknown/quests/Quest";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {LumberjackDialog} from "@/ig-template/features/npcs/lumberjack/LumberjackDialog";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Features} from "@/ig-template/Features";
import {QuestStepId} from "@/lands-unknown/quests/QuestStepId";
import {DialogQuestStep} from "@/lands-unknown/quests/steps/DialogQuestStep";
import {KingDialog} from "@/ig-template/features/npcs/king/KingDialog";
import {PermanentlyAddActionInjection} from "@/lands-unknown/quests/injections/PermanentlyAddActionInjection";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";
import {CompleteSkillActionQuestStep} from "@/lands-unknown/quests/steps/CompleteSkillActionQuestStep";

export class LumberjackQuest extends Quest {
    before(): void {
        const introInjection = new DialogInjection<LumberjackDialog>(
            NpcId.Lumberjack,
            "I need something to do",
            new Dialog(LumberjackDialog.QuestIntro, [
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
                LumberjackDialog.QuestExplanation
            )
        );
        introInjection.inject(this._features);
    }

    completion(): void {
        console.log("Quest completed");
    }

    constructor(features: Features) {
        super(QuestId.Lumberjack, "Out of the woodworks", [
                new DialogQuestStep(QuestStepId.Intro, [
                        new DialogInjection<LumberjackDialog>(
                            NpcId.Lumberjack,
                            "Talk about lumberjack quest",
                            new Dialog(LumberjackDialog.QuestExplanation, [
                                    new DialogText(NpcId.Player, "I will try my best", () => {
                                            this.completeStep(QuestStepId.Intro)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ),
                new DialogQuestStep(QuestStepId.AskPermissionFromKing, [
                        new DialogInjection<KingDialog>(
                            NpcId.King,
                            "That's a nice looking forest you got there",
                            new Dialog(KingDialog.AskWoodCuttingPermission, [
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
                                            this.completeStep(QuestStepId.AskPermissionFromKing)
                                        }
                                    ),
                                ]
                            )
                        )
                    ]
                ), new DialogQuestStep(QuestStepId.BackToLumberjack, [
                    new DialogInjection<KingDialog>(
                        NpcId.Lumberjack,
                        "I've talked to the king",
                        new Dialog(KingDialog.AskWoodCuttingPermission, [
                                new DialogText(NpcId.Player, "The King said it's okay"),
                                new DialogText(NpcId.Lumberjack, "Great! Let's start chopping"),
                                new DialogText(NpcId.Player, "Ehm..."),
                                new DialogText(NpcId.Player, "Chop Chop?"),
                                new DialogText(NpcId.Lumberjack, "You do know how to chop wood don't you?"),
                                new DialogText(NpcId.Player, "Yes!"),
                                new DialogText(NpcId.Lumberjack, "..."),
                                new DialogText(NpcId.Player, "No...", () => {
                                        this.completeStep(QuestStepId.BackToLumberjack)
                                    }
                                ),
                                new DialogText(NpcId.Lumberjack, "It's easy, just press the 'Chop Wood' button!"),
                                new DialogText(NpcId.Lumberjack, "I see, thanks"),
                            ]
                        )
                    )
                ]
                ), new CompleteSkillActionQuestStep(QuestStepId.GatherWood, ActionId.CutWood, 25, [
                    new PermanentlyAddActionInjection(new TownLocationIdentifier(WorldLocationId.Lumberjack), ActionId.CutWood),
                ], features.adventurer),
            ],
            new NoRequirement(), features);
    }
}
