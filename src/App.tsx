
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
    <div className='p-8 h-screen flex flex-col items-center justify-center'>
      <h1 className="w-full text-2xl mb-4 h-auto">Liderazgo femenino y desarrollo económico: historias que contrastan</h1>
      <div className='h-full flex flex-col items-end gap-4 w-full'>
        <IndicatorSelector />
        <div className='flex flex-row gap-4 w-full flex-1'>
          <Filters />
          <Separator orientation='vertical' />
          <div className='w-full flex flex-col gap-4' >
            <div ref={ref} id='svg-container' className='w-full h-full'>
              <ScatterPlot height={height} width={width} />
            </div>
            <YearSelector />
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
