import { IndexPage } from "./IndexPage";
import { Route, Routes } from 'react-router-dom' 
import { EditCustomer } from "./components/Details/customerEdit";
import { EditTraining } from "./components/Details/trainingEdit";

export default function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="/edit/:id" element={<EditCustomer />} />
      <Route path=":id/trainings" element={<EditTraining />} />
    </Routes>
  )
}