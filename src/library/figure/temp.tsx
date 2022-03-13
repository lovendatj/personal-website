import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React, { Component, useEffect, useState } from 'react';
import { Box } from '../boxes/Box';
import { hasAdditionalProps, Animatable } from '../_types';


interface defaultFigureProps extends hasAdditionalProps, Animatable {
    dimensions: [number, number, number];
    rotation: [number, number, number];
    material: {
        color: string;
    }
    scale?: number;
}

interface FigureElementsProps {
    position: [number, number, number];
    // rotation: [number, number, number];
    // dimensions?: [number, number, number];
    body: defaultFigureProps;
    arms: defaultFigureProps;
    legs: defaultFigureProps;
}

const degToRad = (rad:[number,number,number]) : [number, number,number]  => {
    const calcRad = (deg:number) : number => { return deg * (Math.PI / 180); }
    return [calcRad(rad[0]), calcRad(rad[1]), calcRad(rad[2])];
};

const Figure = (props:FigureElementsProps) => {

    const { gl, scene, camera } = useThree();
    const [group, setGroup] = useState<THREE.Group>(new THREE.Group);
    const [scale, setScale] = useState(props.body.scale ? props.body.scale : 1);



    const [body, setBody] = useState<THREE.Mesh>(new THREE.Mesh);
    const [leftArm, setLeftArm] = useState<THREE.Mesh>(new THREE.Mesh);
    const [rightArm, setRightArm] = useState<THREE.Mesh>(new THREE.Mesh);
    const [leftLeg, setLeftLeg] = useState<THREE.Mesh>(new THREE.Mesh);
    const [rightLeg, setRightLeg] = useState<THREE.Mesh>(new THREE.Mesh);

    const createBody = () : THREE.Mesh => {
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(props.body.dimensions[0], props.body.dimensions[1], props.body.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.body.material.color })
        );
        let rotation = degToRad(props.body.rotation);
        console.log(rotation);
                
        body.position.set(props.position[0], props.position[1], props.position[2]);
        body.rotation.set(rotation[0], rotation[1], rotation[2]);
        body.scale.set(scale, scale, scale);
        
        setGroup(group.add(body));
        return body;
    }

    const createLeftArm = () : THREE.Mesh => {
        const arms = new THREE.Mesh(
            new THREE.BoxGeometry(props.arms.dimensions[0], props.arms.dimensions[1], props.arms.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.arms.material.color })
        );
        let rotation = degToRad(props.arms.rotation);

        arms.position.set(
            props.position[0] - props.body.dimensions[0] / 2 - props.arms.dimensions[0], 
            props.position[1] + props.body.dimensions[1] / 3, 
            props.position[2]);
        arms.rotation.set(rotation[0], rotation[1], rotation[2]);
        arms.scale.set(scale, scale, scale);
        
        setGroup(group.add(arms));
        return arms;
    }

    const createRightArm = () : THREE.Mesh => {
        const arms = new THREE.Mesh(
            new THREE.BoxGeometry(props.arms.dimensions[0], props.arms.dimensions[1], props.arms.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.arms.material.color })
        );
        let rotation = degToRad(props.arms.rotation);
        
        arms.position.set(
            props.position[0] + props.body.dimensions[0] / 2 + props.arms.dimensions[0], 
            props.position[1] + props.body.dimensions[1] / 3, 
            props.position[2]);
        arms.rotation.set(rotation[0], rotation[1], rotation[2]);
        arms.scale.set(scale, scale, scale);
        
        setGroup(group.add(arms));
        return arms;
    }
    
    const createLeftLeg = () : THREE.Mesh => {
        const leg = new THREE.Mesh(
            new THREE.BoxGeometry(props.legs.dimensions[0], props.legs.dimensions[1], props.legs.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.arms.material.color })
        );
        let rotation = degToRad(props.legs.rotation);
        
        leg.position.set(
            props.position[0] - props.body.dimensions[0] / 2 + props.legs.dimensions[0] / 3, 
            props.position[1] - props.body.dimensions[1] / 2 - props.legs.dimensions[1], 
            props.position[2] );
            leg.rotation.set(rotation[0], rotation[1], rotation[2]);
        leg.scale.set(scale, scale, scale);
        
        setGroup(group.add(leg));
        return leg;
    }

    const createRightLeg = () : THREE.Mesh => {
        const leg = new THREE.Mesh(
            new THREE.BoxGeometry(props.legs.dimensions[0], props.legs.dimensions[1], props.legs.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.arms.material.color })
        );
        let rotation = degToRad(props.legs.rotation);
        
        leg.position.set(
            props.position[0] + props.body.dimensions[0] / 2 - props.legs.dimensions[0] / 3, 
            props.position[1] - props.body.dimensions[1] / 2 - props.legs.dimensions[1], 
            props.position[2] );
            leg.rotation.set(rotation[0], rotation[1], rotation[2]);
        leg.scale.set(scale, scale, scale);
        
        setGroup(group.add(leg));
        return leg;
    }


    useFrame(() => {
        
        
    });
    
    useEffect(() => {
        setBody(createBody());
        setLeftArm(createLeftArm());
        setRightArm(createRightArm());
        setLeftLeg(createLeftLeg());
        setRightLeg(createRightLeg());
        scene.add(group);
    }, []);
    
    return (
        <></>
    );
}

interface GroupProps {
    position: [number, number, number];
    rotation: [number, number, number];
    dimensions?: [number, number, number];
}

export default class Group extends Component<GroupProps> {

    mesh : React.RefObject<THREE.Mesh>;
    dimensions: [number, number, number];

    constructor(props: GroupProps) {
        super(props);

        this.mesh = React.createRef();
        
        this.dimensions = props.dimensions? degToRad(props.dimensions): [0, 0, 0];
        
        this.state = {
            position: props.position,
            rotation: props.rotation,
            dimensions: this.dimensions
        }
   
    }

    render = () => {

        const dimensions  = this.dimensions;
        let volumn = dimensions[0] * dimensions[1] * dimensions[2];
        let bodyMass = volumn * 0.5;
        let armMass = volumn * 0.1; 
        let legMass = volumn * 0.1;


        return (
            
            <mesh
                ref={this.mesh}
                rotation={this.props.rotation}
            >   
                <Figure
                    position={this.props.position}
                    body ={{
                        dimensions: [dimensions[0]*bodyMass / 2, dimensions[1]*bodyMass, dimensions[2]*bodyMass],
                        rotation: [0, 0, 0],
                        material: {
                            color: '#ff0000'
                        }
                    }}
                    arms ={{
                        dimensions: [dimensions[0]*armMass * 2, dimensions[1]*armMass, dimensions[2]*armMass],
                        rotation: [0, 0, 0],
                        material: {
                            color: '#00ff00'
                        }
                    }}                    
                    legs ={{
                        dimensions: [dimensions[0]*legMass, dimensions[1]*legMass * 2, dimensions[2]*legMass],
                        rotation: [0, 0, 0],
                        material: {
                            color: '#0000ff'
                        }
                    }}
                />
            </mesh>
        )
    }
}
