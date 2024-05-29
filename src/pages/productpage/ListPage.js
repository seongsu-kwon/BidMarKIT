import { useParams } from 'react-router-dom';
import ProductInfListPage from './ProductInfListPage';
import SuggestProductInfListPage from './SuggestProductInfListPage';
import SuggestListPage from './SuggestListPage';
export default function ListPage() {
    const { type } = useParams();

    if (type === 'all') {
        return <ProductInfListPage />;
    } else if (type === 'suggest') {
        return <SuggestListPage />;
    } else if (type === 'imminent') {
        return <ProductInfListPage />;
    }
}
