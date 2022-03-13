import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Camera, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';


import { hasThreeChildren } from '../_types';
import { StaticReadUsage } from 'three';

interface CanvasProps extends hasThreeChildren{
    parentId: string;
    width: number | string | 500;
    height: number | string | 500;
}

const CanvasPortfolio = () => {
    const { gl, scene, camera } = useThree();

    useFrame(() => {
        
    });
    
    useEffect(() => {
        camera.scale.set(2, 2, 2);
    }, []);

    return (
        <>
        </>
    )
}

export const CanvasWrapper = (props : CanvasProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    // const { gl, scene, camera, size } = useThree();

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);
    

    const adjustCanvasSize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    

    useEffect(() => {

        window.addEventListener('resize', adjustCanvasSize);

        return () => {
            window.removeEventListener('resize', () => {});
        }
    }, [])




    return (
        <div id={props.parentId} style={{ width: props.width, height: props.height }}>
            <Canvas 
                ref={canvasRef}
            >   
                <CanvasPortfolio/>
                {props.children}
            </Canvas>
        </div>
    );
}