
import { NavLink } from 'react-router-dom'
import imageLogo from '../../assets/trendy-spot-logo.png'

const ProfileNav = () => {
  return (
    <>
        <nav>
            <NavLink to="/logged_in">
                <img src={imageLogo} alt="logo-home" className="logoHome" />
            </NavLink>

          
            <NavLink to="/logged_in/changue-password">
                <p>Changue Password</p>
            </NavLink>
            
           
            <NavLink to="/logged_in/edit-profile">
                <p>Edit Profile</p>
            </NavLink>
        </nav>
    
    </>
  )
}

export default ProfileNav