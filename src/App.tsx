
import { useRef } from 'react'
// import './App.css'
import Filters from './components/filters'
import IndicatorSelector from './components/indicatorSelector'
import ScatterPlot from './components/scatter'
import { Separator } from './components/ui/separator'
import YearSelector from './components/yearSelector'
import { useDimensions } from './hooks/use-dimensions'
import useStore from './hooks/useStore'

function App() {

  const ref = useRef<any>(null)
  const { width, height } = useDimensions(ref)
  const indicator = useStore((state) => state.indicator)
  return (
    <div className='p-8 h-screen'>
      {/* <div className='w-full flex flex-col items-center justify-center'> */}
      <h1 className="w-full text-2xl font-bold mb-4">{indicator} vs GDP Dashboard</h1>
      <div className='h-full flex flex-col items-center gap-4'>
        <IndicatorSelector />
        <div className='w-full h-[66vh] flex flex-row gap-4' >
          <div className='w-full flex flex-col gap-4' ref={ref} id='svg-container'>
            <ScatterPlot height={height} width={width} />
            <YearSelector />
          </div>
          <Separator orientation='vertical' />
          <Filters />
        </div>

      </div>
      {/* </div> */}
    </div>

  )
}

export default App
