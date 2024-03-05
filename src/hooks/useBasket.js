import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentBasket } from '../redux/slices'

export const useBasket = () => {
    
    const basket = useSelector( currentBasket )         
    return useMemo( () => ( basket  ), [ basket ] )
}
