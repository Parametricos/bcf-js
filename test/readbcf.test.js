import { BcfReader } from "../src"
import * as fs from "fs/promises"

describe("Read BCF", () => {

    let file
    let reader

    beforeAll(async () => {
        file = await fs.readFile("./test-data/MaximumInformation.bcf")
        console.log('file', file)
        reader = new BcfReader()
        await reader.read(file)
    })

    it("BCF is not null", () => {
        expect(reader.markups.length).toEqual(2)
    })

    it("Markup Topic Title is Defined", () => {
        expect(reader.markups[1].topic.title).toBe("Maximum Content")
    })

    it("Maximum Content Viewpoint", () => {
        expect(reader.markups[1].viewpoints[0].perspective_camera)
        .toStrictEqual({
            camera_view_point: { x: 12.2088897788292, y: 52.323145074034, z: 5.24072091171001 },
            camera_direction: {
                x: -0.381615611200324,
                y: -0.825232810204882,
                z: -0.416365617893758
            },
            camera_up_vector: { x: 0.05857014928797, y: 0.126656300502579, z: 0.990215996212637 },
            field_of_view: 60
        })
    })
})