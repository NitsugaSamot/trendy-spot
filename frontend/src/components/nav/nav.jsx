import  { useState } from "react";
import { Link } from "react-router-dom";
import './nav.css'
const Nav = () => {
  const[name, setName] = useState('')

  function handleInputName(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleClick(e) {
    setName('')
  }


  return (
    <div>
    <div className='searchBar'>
        <input 
            className='inputSearch' 
            type='text' 
            value={name} 
            onChange={e=>handleInputName(e)}
            placeholder='Search'
         ></input>
        <Link  to={`/products/${name}`}>
              <button className='btnNav' onClick={e => handleClick(e)}>Search</button>
        </Link>
 </div>
        </div>

  );
};
export default Nav;

  // const dispatch = useDispatch();

  // // const handleSubmit = (e) => {
  // //   e.preventDefault();
  // //   dispatch(getRecipesByName(search));
  // //   setSearch("");
  // // };