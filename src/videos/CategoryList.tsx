import * as React from 'react';
import { Category } from 'src/models/category';
import { CategoryView } from './CategoryView';

interface Props {
  categories: Category[];
}

export class CategoryList extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.categories.map(c => (
          <CategoryView key={c.name} category={c} />
        ))}
      </div>
    );
  }
}
