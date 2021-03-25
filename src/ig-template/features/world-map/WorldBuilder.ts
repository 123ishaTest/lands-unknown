import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
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
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";

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
            const id = this.getPropertyValue(properties, "id") as WorldLocationId;
            const baseDuration = this.getPropertyValue(properties, "baseDuration")
            console.log(from, to, baseDuration)
            const points = object.polyline?.map(position => {
                return this.globalToTilePosition({
                    x: position.x + object.x,
                    y: position.y + object.y,
                });
            }) ?? [];
            return new Road(new RoadLocationIdentifier(id), "Road", new TownLocationIdentifier(from), new TownLocationIdentifier(to), points, baseDuration);
        });

        console.log(paths)


        return paths;
    }

    static createWorld(): WorldMap {
        const roads = this.parsePaths();

        const towns = [
            this.createTown(WorldLocationId.Market, "Toon Town", TownTier.Town),
            this.createTown(WorldLocationId.FisherMan, "Small Town", TownTier.Town),
        ];

        return new WorldMap(roads, towns);
    }

    static createTown(id: WorldLocationId, displayName: string, tier: TownTier, requirement: Requirement = new NoRequirement()): Town {
        return new Town(new TownLocationIdentifier(id), displayName, tier, requirement);
    }

}
