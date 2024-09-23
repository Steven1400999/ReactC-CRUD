import './App.css'
import { Lista } from './components/Lista'
import { EditarEmpleado } from './components/EditarEmpleado'
import { NuevoEmpleado } from './components/NuevoEmpleado'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (

<BrowserRouter>
    <Routes>
    <Route path="/" element={<Lista/>}/>
    <Route path="/nuevoempleado" element={<NuevoEmpleado/>}/>
    <Route path="/editarempleado/:id" element={<EditarEmpleado/>}/>
    
    </Routes>
</BrowserRouter>

  )
}

export default App
