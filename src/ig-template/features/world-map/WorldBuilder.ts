import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {RoadId} from "@/ig-template/features/world-map/roads/RoadId";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownId} from "@/ig-template/features/world-map/towns/TownId";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {RoadLocationIdentifier} from "@/ig-template/features/world-map/roads/RoadLocationIdentifier";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {Town} from "@/ig-template/features/world-map/towns/Town";

import worldMap from '@/assets/tiled/maps/overworld.json'
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";
import {ObjectGroup} from "@/ig-template/tools/tiled/types/layers/ObjectGroup";
import {TiledMap} from "@/ig-template/tools/tiled/types/TiledMap";
import {ObjectProperty} from "@/ig-template/tools/tiled/types/objects/ObjectProperty";

export class WorldBuilder {

    static globalToTilePosition(global: WorldPosition): WorldPosition {
        const tileHeight = worldMap.tileheight;
        const tileWidth = worldMap.tilewidth;
        return {
            x: Math.floor(global.x / tileWidth),
            y: Math.floor(global.y / tileHeight),
        }
    }

    static getPropertyValue(
        properties: ObjectProperty[], targetName: string) {
        const property = properties.find(property => {
            return property.name === targetName;
        })
        return property?.value
    }

    static parsePaths(): Road[] {
        // TODO double check
        const world = worldMap as unknown as TiledMap;
        const pathLayer = world.layers.find(layer => {
            return layer.name === "Paths"
        }) as ObjectGroup;


        const paths = pathLayer?.objects?.map(object => {
            const properties = object.properties as ObjectProperty[];
            const from = this.getPropertyValue(properties, "from")
            const to = this.getPropertyValue(properties, "to")
            const roadId = this.getPropertyValue(properties, "id") as RoadId;
            const baseDuration = this.getPropertyValue(properties, "baseDuration")
            console.log(from, to, baseDuration)
            const points = object.polyline?.map(position => {
                return this.globalToTilePosition({
                    x: position.x + object.x,
                    y: position.y + object.y,
                });
            }) ?? [];
            return new Road(new RoadLocationIdentifier(roadId), "Road", new TownLocationIdentifier(from), new TownLocationIdentifier(to), points, baseDuration);
        });

        console.log(paths)


        return paths;
    }

    static createWorld(): WorldMap {
        const roads = this.parsePaths();

        const towns = [
            this.createTown(TownId.Market, "Toon Town", TownTier.Town),
            this.createTown(TownId.FisherMan, "Small Town", TownTier.Town),
            this.createTown(TownId.AwesomeTown, "Awesome Town", TownTier.Town),
        ];

        return new WorldMap(roads, towns);
    }

    static createTown(id: TownId, displayName: string, tier: TownTier, requirement: Requirement = new NoRequirement()): Town {
        return new Town(new TownLocationIdentifier(id), displayName, tier, requirement);
    }

}
