import { CSSProperties, ReactNode } from 'react';
import { Mesh } from 'three';

// Generic Types
export interface hasAdditionalProps {
    [key: string]: any;
}


// REACT Types
export interface hasChildren {
    children?: ReactNode | ReactNode[];
}
export interface Styleable {
    style?: CSSProperties;
}

// THREE/@React-Three-Fiber Types
export interface defaultMaterial extends THREE.Material {
    color: '0xffffff';
}
export interface hasThreeChildren {
    children?: Mesh | Mesh[] | JSX.Element | JSX.Element[];
}
export interface Animatable {
}