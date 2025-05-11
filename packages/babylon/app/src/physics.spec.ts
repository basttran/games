import { MeshBuilder } from "@babylonjs/core"
import { buildCreator } from "./physics";

describe('Builder', () => {
  it('buildCreator', () => {
    // given
    const builder = MeshBuilder.CreateBox;
    const key = 'CreateBox' as keyof typeof MeshBuilder;
    // when
    const newBuildFunction = buildCreator(key, builder);
    // then
    const oldArgs = newBuildFunction.arguments;
    expect(newBuildFunction.arguments).toEqual(builder.arguments);
  })
})