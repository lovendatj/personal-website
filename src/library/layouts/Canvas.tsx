import * as THREE from 'three';
import { ReactDOM } from 'react';
import React, { Component, createRef } from 'react';

import { hasChildren } from '../_types';

interface CanvasProps extends hasChildren{
    width: number | string | 500;
    height: number | string | 500;
    
}

export default class Canvas extends Component<CanvasProps>{

    canvasRef = createRef<HTMLCanvasElement>();

    constructor(props: CanvasProps){
        super(props);
    }

    private static degreeToRadian(degree: number){
        return degree * (Math.PI / 180);
    }

    componentDidMount(){
        if (this.canvasRef !== null && this.canvasRef.current !== null){
            const canvas = this.canvasRef.current;
            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({ canvas });
            const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.z = 5;
            
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
           
            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotateX(Canvas.degreeToRadian(45));
            mesh.rotateY(Canvas.degreeToRadian(45));
            scene.add(mesh);

            const lightDirectional = new THREE.PointLight(0xffffff, 1);
            const lightAmbient = new THREE.AmbientLight(0x9eaeff, 0.2);
            lightDirectional.position.set(5, 5, 5);
            scene.add(lightDirectional);
            scene.add(lightAmbient);

            

            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.render(scene, camera);
        }
    }

    render = () => {
        return (
            <canvas ref={this.canvasRef} style={{ width: this.props.width, height: this.props.height }} >
                {this.props.children}
            </canvas>
        )
    }
}
