import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main/Index";
import Repositorio from "./pages/Repositorio";

export default function RoutesComponent() {
  return (
     <BrowserRouter>
       <Routes>
         <Route path="/" Component={Main } />
         <Route path="/repositorio/:repositorio" Component={Repositorio } />
        
       </Routes>
     </BrowserRouter>
   );
}
