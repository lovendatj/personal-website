import * as THREE from 'three';
import { useHelper } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

import { hasAdditionalProps } from '../_types';
import {  } from '@react-three/fiber';
import { DirectionalLightHelper, PointLightHelper } from 'three';


interface LightProps extends hasAdditionalProps{
    position : [number, number, number];
    intensity?: number;
    helper? : boolean;
    color? : string ;
}

export const DefaultLightPortfoio = (props : LightProps) => {
    // Init
    const [position, setPosition] = useState(props.position);
    const [helper, setHelper] = useState(props.helper ? props.helper : false);
    const [color, setColor] = useState(props.color ? props.color : '0xffffff');

    // Helper
    const meshRef = useRef<THREE.Mesh>();
    useHelper( helper && meshRef, PointLightHelper, 10,'cyan' );
   
    return (
        <mesh ref={meshRef}>
            <ambientLight intensity={props.intensity? props.intensity :1} />
            <pointLight position={props.position} />
            
        </mesh>
    )
}