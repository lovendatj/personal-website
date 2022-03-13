import { useEffect, useRef, useState } from 'react';
import { hasAdditionalProps, defaultMaterial } from '../_types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';


interface BoxProps extends hasAdditionalProps{
    position: [number,number,number];
    dimensions?: [number,number,number];
    rotation?: [number,number,number];
    scale?: number;
    material?: defaultMaterial;
}

export const Box = (props : BoxProps) => {

    const [position, setPosition] = useState(props.position);
    const [dimensions, setDimensions] = useState(props.dimensions ? props.dimensions : [1,1,1]);
    const [material, setMaterial] = useState(props.material ? props.material : { color: '#FAF9F6' });
    const [rotation, setRotation] : [[number,number,number], Function] = useState(props.rotation ? props.rotation : [0,0,0]);
    
    const meshRef = useRef<THREE.Mesh>();

    const degToRad = (rad:[number,number,number]) : [number, number,number]  => {
        const calcRad = (deg:number) : number => { return deg * (Math.PI / 180); }
        return [calcRad(rad[0]), calcRad(rad[1]), calcRad(rad[2])];
    };

    const init = () => {
        setRotation(degToRad(rotation));
    }

    useEffect(() => {
        init();
    }, []);

    useFrame(() => {
        meshRef.current?.rotateY(0.01);
    });


    return (
        <mesh
            {...props}
            rotation={rotation}
            ref={meshRef}
            position={position}
        >
            <boxGeometry attach="geometry" args={[dimensions[0], dimensions[1], dimensions[2]]} />
            <meshStandardMaterial attach="material" color={material.color} />
        </mesh>

    )

}
