import { IndexPage } from "./IndexPage";
import { Route, Routes } from 'react-router-dom' 
import { EditCustomer } from "./components/Details/customerEdit";
import { EditTraining } from "./components/Details/trainingEdit";
import { CalendarPage } from "./components/Calendar";

export default function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="/edit/:id" element={<EditCustomer />} />
      <Route path=":id/trainings" element={<EditTraining />} />
    </Routes>
  )
}