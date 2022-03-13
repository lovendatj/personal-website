
import { CanvasWrapper } from './library/layouts/Canvas';
import { Box } from './library/boxes/Box';
import { DefaultLightPortfoio } from './library/lights/Lights';
import CreateGroups from './library/figure/Figure';



export default function App(){
  return (
      <CanvasWrapper 
        parentId={'canvas-container'} 
        width={`100vw`} height={`100vh`}
        
      >

        <CreateGroups scale={2} position={[0,0,0]} rotation={[15, 0, 0]} dimensions={[1,1,1]} />        
        <DefaultLightPortfoio position={[10,10,10]} helper={true}/>
    </CanvasWrapper>
  )
}