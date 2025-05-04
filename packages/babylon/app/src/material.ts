import { Color3, PBRMaterial, Scene, StandardMaterial, Texture } from "@babylonjs/core";

const scaleUV = (u: number, v?: number): {
    uScale: number;
    vScale: number; 
} => {
 if (v === 0 || !v) {
    return {
        uScale: u,
        vScale: u 
        }
    }
    return {
        uScale: u,
        vScale: v 
        }
}

export const doCreateTextureMaterial = (scene: Scene) => (name: string, uvScale: number): StandardMaterial => {
    const textures: Texture[] = [];
    const material = new StandardMaterial(name, scene);
    const diffuseTexture = new Texture("pathToDiffuseTextureJpg", scene);
    material.diffuseTexture = diffuseTexture;
    textures.push(diffuseTexture);
    const normalTexture = new Texture("pathToNormalTextureJpg", scene);
    material.bumpTexture = normalTexture;
    textures.push(normalTexture);
    const aoTexture = new Texture("pathToAoTextureJpg", scene);
    material.ambientTexture = aoTexture;
    textures.push(aoTexture);
    const specTexture = new Texture("pathToSpecTextureJpg", scene);
    material.specularTexture = specTexture;
    textures.push(aoTexture);

    textures.forEach((texture) => {
        texture.uScale = uvScale
        texture.vScale = uvScale
    });

    return material
}
export const doCreateColorMaterial = (scene: Scene) => (color: Color3): PBRMaterial => {
    const material = new PBRMaterial(color.toHexString(), scene);
    material.roughness = 1;
    material.albedoColor = color;

    return material
}

