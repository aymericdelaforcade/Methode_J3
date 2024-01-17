import { useSelector, useDispatch } from 'react-redux';
import { counterSlice } from '../redux/reducers/reducmatiere2';



const matiere = useSelector((state) => state.matiere.matiere)

export default liste_matiere = {
    id: 1,
    liste: {matiere},
}