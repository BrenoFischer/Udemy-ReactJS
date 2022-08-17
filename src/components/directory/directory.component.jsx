import { CategoriesContainer } from './directory.styles';

import CategoryItem from '../directory-item/directory-item.component';

const Directory = ({categories}) => {
    return(
        <CategoriesContainer>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
      </CategoriesContainer>
    );
}

export default Directory;