
import { useRef } from 'react'
// import './App.css'
import Filters from './components/filters'
import IndicatorSelector from './components/indicatorSelector'
import ScatterPlot from './components/scatter'
import { Separator } from './components/ui/separator'
import YearSelector from './components/yearSelector'
import { useDimensions } from './hooks/use-dimensions'

function App() {
  const ref = useRef<any>(null)
  const { width, height } = useDimensions(ref)
  return (
    <div className='p-8 '>
      <div className='h-screen '>
        {/* <div className='w-full flex flex-col items-center justify-center'> */}
        <h1 className="w-full text-2xl mb-4">Liderazgo femenino y desarrollo económico: historias que contrastan</h1>
        <div className='h-full flex flex-col items-center gap-4'>
          <IndicatorSelector />
          <div className='w-full h-[66vh] flex flex-row gap-4' >
            <Filters />
            <Separator orientation='vertical' />
            <div className='w-full flex flex-col gap-4' ref={ref} id='svg-container'>
              <ScatterPlot height={height} width={width} />
              <YearSelector />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
