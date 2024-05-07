import "preline/preline"
import Trainings from "./components/Trainings"
import Customers from "./components/Customers"
import { CalendarPage } from "./components/Calendar"


export function IndexPage() {
    return (
      <div className='mt-6 mx-5'>
        <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
            <button type="button" className="text-xl hs-tab-active:bg-gray-500 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent font-medium text-gray-500 hover:text-gray-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300 active" id="fill-and-justify-item-1" data-hs-tab="#fill-and-justify-1" aria-controls="fill-and-justify-1" role="tab">
                Trainings
            </button>
            <button type="button" className="text-xl hs-tab-active:bg-gray-500 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent font-medium text-gray-500 hover:text-gray-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300" id="fill-and-justify-item-3" data-hs-tab="#fill-and-justify-3" aria-controls="fill-and-justify-3" role="tab">
                Customers
            </button>
            <button type="button" className="text-xl hs-tab-active:bg-gray-500 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2 bg-transparent font-medium text-gray-500 hover:text-gray-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300" id="fill-and-justify-item-4" data-hs-tab="#fill-and-justify-4" aria-controls="fill-and-justify-4" role="tab">
                Calendar
            </button>
        </nav>
        <div className='mt-2'>
          <div id="fill-and-justify-1" role="tabpanel" aria-labelledby="fill-and-justify-item-1">
            <Trainings />
          </div>
          <div id="fill-and-justify-3" className="hidden" role="tabpanel" aria-labelledby="fill-and-justify-item-3">
            <Customers />
          </div>
          <div id="fill-and-justify-4" className="hidden" role="tabpanel" aria-labelledby="fill-and-justify-item-4">
            <CalendarPage />
          </div>
        </div>
      </div>
    )
}