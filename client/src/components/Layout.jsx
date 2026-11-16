import { Link, NavLink, useNavigate } from "react-router-dom";
import { HeartPulse, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function Layout({ children }) {
  const { user, logout } = useAuth(); const navigate = useNavigate(); const [open,setOpen] = useState(false);
  function signOut(){logout();navigate("/");}
  return <><header className="header"><div className="nav wrap">
    <Link to="/" className="brand"><span className="brand-icon"><HeartPulse size={22}/></span>Life<span>Line</span></Link>
    <button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    <nav className={open?"nav-links open":"nav-links"}>
      <NavLink to="/">Home</NavLink><NavLink to="/donors">Find Donors</NavLink>
      {user ? <><NavLink to="/dashboard">Dashboard</NavLink><button className="nav-button" onClick={signOut}>Logout</button></> : <><NavLink to="/login">Login</NavLink><Link className="btn btn-small" to="/register">Join as donor</Link></>}
    </nav></div></header>{children}<footer className="footer"><div className="wrap footer-inner"><div className="brand"><span className="brand-icon"><HeartPulse size={20}/></span>Life<span>Line</span></div><p>Give blood. Share life. A community-powered donation initiative.</p><small>© {new Date().getFullYear()} LifeLine. Educational project demo.</small></div></footer></>;
}
