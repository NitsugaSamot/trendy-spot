import  { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName } from '../../redux/actions'
import { useParams } from 'react-router-dom';
import Cards from '../cards/Cards';

const ComponentName = () => {
    const dispatch = useDispatch()
    const productsByName = useSelector(state => state.productsByName)
      
    const {name} = useParams()

    useEffect(() => {
        dispatch(getProductsByName(name))
      }, [dispatch, name])

  return (
    <Cards products={productsByName} />
  )
}

export default ComponentName