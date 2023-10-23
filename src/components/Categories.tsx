import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: any[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="md:container mx-2 flex items-center gap-x-2 overflow-x-auto pb-2 mb-2 mt-4 ">
      {items.map((item) => (
        <CategoryItem
          key={Math.floor(Math.random() * 1000)}
          label={item}
          value={item}
        />
      ))}
    </div>
  );
};

export default Categories;
