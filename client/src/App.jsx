import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import Donors from "./pages/Donors";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
function Wrapped({children}){return <Layout>{children}</Layout>}
export default function App(){return <Routes>
 <Route path="/" element={<Wrapped><Home/></Wrapped>}/>
 <Route path="/login" element={<Wrapped><Login/></Wrapped>}/>
 <Route path="/register" element={<Wrapped><Register/></Wrapped>}/>
 <Route path="/donors" element={<Wrapped><Donors/></Wrapped>}/>
 <Route path="/dashboard" element={<Wrapped><ProtectedRoute><Dashboard/></ProtectedRoute></Wrapped>}/>
 <Route path="/admin/dashboard" element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/>
 <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>}
