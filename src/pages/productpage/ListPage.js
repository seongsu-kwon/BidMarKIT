import { useParams } from 'react-router-dom';
import ProductInfListPage from './ProductInfListPage';
import SuggestProductInfListPage from './SuggestProductInfListPage';
import SuggestListPage from './SuggestListPage';
import ImminentProductInfListPage from './ImminentProductInfListPage';
export default function ListPage() {
    const { type } = useParams();

    if (type === 'all') {
        return <ProductInfListPage />;
    } else if (type === 'suggest') {
        return <SuggestProductInfListPage />;
    } else if (type === 'imminent') {
        return <ImminentProductInfListPage />;
    }
}
