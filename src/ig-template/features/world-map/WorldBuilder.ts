import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {RoadId} from "@/ig-template/features/world-map/roads/RoadId";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownId} from "@/ig-template/features/world-map/towns/TownId";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {WorldLocationIdentifier} from "@/ig-template/features/world-map/WorldLocationIdentifier";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {RoadLocationIdentifier} from "@/ig-template/features/world-map/roads/RoadLocationIdentifier";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {Town} from "@/ig-template/features/world-map/towns/Town";

export class WorldBuilder {

    static createWorld(): WorldMap {


        // TODO generate from Tiled
        const roads = [
            this.createRoad(RoadId.OldTownRoad, "Old Town Road", new TownLocationIdentifier(TownId.FisherMan), new TownLocationIdentifier(TownId.Market), 50),
        ];

        const towns = [
            this.createTown(TownId.Market, "Toon Town", TownTier.Town),
            this.createTown(TownId.FisherMan, "Small Town", TownTier.Town),
            this.createTown(TownId.AwesomeTown, "Awesome Town", TownTier.Town),
        ];

        return new WorldMap(roads, towns);
    }

    static createRoad(id: RoadId, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, requirement: Requirement = new NoRequirement()): Road {
        return new Road(new RoadLocationIdentifier(id), displayName, from, to, baseDifficulty, requirement);
    }

    static createTown(id: TownId, displayName: string, tier: TownTier, requirement: Requirement = new NoRequirement()): Town {
        return new Town(new TownLocationIdentifier(id), displayName, tier, requirement);
    }

}
