import React, { Component, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

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
    rotation?: [number, number, number];
    head: defaultFigureProps;
    body: defaultFigureProps;
    arms: defaultFigureProps;
    legs: defaultFigureProps;
}

interface GroupsProps {
    position: [number, number, number];
    rotation: [number, number, number];
    dimensions: [number, number, number];
    scale?: number;    
}

const calcRad = (deg: number) => { return deg * (Math.PI / 180); }
const degToRad = (rad:[number,number,number]) : [number, number,number]  => {
    return [calcRad(rad[0]), calcRad(rad[1]), calcRad(rad[2])];
};

const Figure = (props:FigureElementsProps) => {

    const { gl, scene, camera } = useThree();
    const [group, setGroup] = useState<THREE.Group>(new THREE.Group());
    const [scale, setScale] = useState(props.body.scale ? props.body.scale : 1);
    const [rotation, setRotation] = useState(props.rotation ? degToRad(props.rotation) : [0,0,0]);


    const [head, setHead] = useState<THREE.Mesh>(new THREE.Mesh());
    const [body, setBody] = useState<THREE.Mesh>(new THREE.Mesh());
    const [leftArm, setLeftArm] = useState<THREE.Mesh>(new THREE.Mesh());
    const [rightArm, setRightArm] = useState<THREE.Mesh>(new THREE.Mesh());
    const [leftLeg, setLeftLeg] = useState<THREE.Mesh>(new THREE.Mesh());
    const [rightLeg, setRightLeg] = useState<THREE.Mesh>(new THREE.Mesh());

    const createHead = () : THREE.Mesh => {
        const head = new THREE.Mesh(
            new THREE.BoxGeometry(props.head.dimensions[0], props.head.dimensions[1], props.head.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.head.material.color })
        );
        let rotation = degToRad(props.head.rotation);

        head.position.set(
            props.position[0] *  scale, 
            props.position[1] + props.head.dimensions[1] * 2 *  scale, 
            props.position[2] *  scale);
        head.rotation.set(rotation[0], rotation[1], rotation[2]);
        head.scale.set(scale, scale, scale);

        setGroup(group.add(head));
        return head;
    };
    const createBody = () : THREE.Mesh => {
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(props.body.dimensions[0], props.body.dimensions[1], props.body.dimensions[2]),
            new THREE.MeshStandardMaterial({ color: props.body.material.color })
        );
        let rotation = degToRad(props.body.rotation);
                
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
            props.position[0] - props.body.dimensions[0] / 2 - props.arms.dimensions[0] * scale, 
            props.position[1] + props.body.dimensions[1] / 3 * scale, 
            props.position[2] * scale);
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
            props.position[0] + props.body.dimensions[0] / 2 + props.arms.dimensions[0] * scale, 
            props.position[1]*2 + props.body.dimensions[1] / 3 * scale, 
            props.position[2] * scale);
        arms.rotation.set(-rotation[0], -rotation[1], -rotation[2]);
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
            props.position[0] - props.body.dimensions[0] / 2 + props.legs.dimensions[0] / 3 * scale, 
            props.position[1] - props.body.dimensions[1] / 2 - props.legs.dimensions[1] * scale, 
            props.position[2] * scale);
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
            props.position[0] + props.body.dimensions[0] / 2 - props.legs.dimensions[0] / 3 * scale, 
            props.position[1] - props.body.dimensions[1] / 2 - props.legs.dimensions[1] * scale, 
            props.position[2] * scale );
            leg.rotation.set(rotation[0], rotation[1], rotation[2]);
        leg.scale.set(scale, scale, scale);
        
        setGroup(group.add(leg));
        return leg;
    }


    useFrame(() => {
        group.rotation.y += 0.01;
    });
    
    useEffect(() => {
        
        group.rotation.set(
                rotation[0],
                rotation[1],
                rotation[2]
        )

        setHead(createHead());
        setBody(createBody());
        setLeftArm(createLeftArm());
        setRightArm(createRightArm());
        setLeftLeg(createLeftLeg());
        setRightLeg(createRightLeg());



        scene.add(group);

        return () => {
            scene.remove(group);
        }
    }, []);
    
    return (
        <></>
    );
}

export default class CreateGroups extends Component<GroupsProps> {

    mesh : React.RefObject<THREE.Mesh>;
    scale: number;

    constructor(props: GroupsProps) {
        super(props);

        
        this.state = {
            position: props.position,
            rotation: props.rotation
        }
        this.mesh = React.createRef();  
        this.scale = props.scale ? props.scale : 1;
    }

    render = () => {

        const { dimensions } = this.props;
        let volumn = dimensions[0] * dimensions[1] * dimensions[2];
        let headMass = volumn * 0.2;
        let bodyMass = volumn * 0.5;
        let armMass = volumn * 0.1; 
        let legMass = volumn * 0.1;

        return (
            <Figure
                position={this.props.position}
                rotation={this.props.rotation}
                head={{
                    dimensions: [dimensions[0] * headMass, dimensions[1] * headMass, dimensions[2] * headMass],
                    rotation: [0, 0, 0],
                    material: {
                        color: '#ffffff'
                    },
                    scale: this.props.scale
                }}
                body ={{
                    dimensions: [dimensions[0]*bodyMass / 2, dimensions[1]*bodyMass, dimensions[2]*bodyMass / 3],
                    rotation: [0, 0, 0],
                    material: {
                        color: '#ff0000'
                    },
                    scale: this.props.scale
                }}
                arms ={{
                    dimensions: [dimensions[0]*armMass * 2, dimensions[1]*armMass, dimensions[2]*armMass],
                    rotation: [0, 0, 45],
                    material: {
                        color: '#00ff00'
                    },
                    scale: this.props.scale
                }}                    
                legs ={{
                    dimensions: [dimensions[0]*legMass, dimensions[1]*legMass * 2, dimensions[2]*legMass],
                    rotation: [0, 0, 0],
                    material: {
                        color: '#0000ff'
                    },
                    scale: this.props.scale
                }}
            />
        )
    }
}
