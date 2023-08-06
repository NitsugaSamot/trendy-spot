import  { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchName } from '../../redux/actions'
import { useParams } from 'react-router-dom';
import Cards from '../cards/Cards';

const ComponentName = () => {
    const dispatch = useDispatch()
    const productsByName = useSelector(state => state.productsByName)

    console.log(productsByName)

    const {name} = useParams()

    useEffect(() => {
        dispatch(searchName(name))
      }, [dispatch, name])

  return (
    <Cards products={productsByName} />
  )
}

export default ComponentName