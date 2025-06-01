import { useMemo } from "react";
import * as THREE from "three";

export const TriangleGeometry = (vertices: Array<THREE.Vector3>) => {

    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(vertices.flatMap(vertex => vertex.toArray()));

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Define the indices for the triangle
        const indices = new Uint16Array([0, 1, 2]);
        geom.setIndex(new THREE.BufferAttribute(indices, 1));

        // Compute the normals for shading
        geom.computeVertexNormals();

        // Define UV coordinates
        const uvs = new Float32Array([
            0, 1,
            0, 0,
            1, 0
        ]);
        geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        return geom;
    }, [vertices]);

    return geometry;
};