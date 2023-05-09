import { useEffect, useState } from 'react';
import { getBrands } from './getBrands'; // think of it as di in angular
import { addBrand } from './addBrands'; // think of it as di in angular
import { Brand, NewBrandPayload } from './types';
import { BrandsList } from './BrandsList'; // parent-child component
import { NewBrandForm } from './NewBrandForm';

// use react native state management
export function BrandsPage() {
  // initial loading state is true;
  // setIsLoading like dispatch actin
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  useEffect(() => {
    let cancel = false;
    // does not support async await
    getBrands().then((data) => {
      if (!cancel) {
        setBrands(data);
        setIsLoading(false);
      }
    });
    return () => {
      // clean up function
      cancel = true;
    };
  }, []);

  // here async is due to addBrand
  async function handleSave(payload: NewBrandPayload) {
    const newBrand = await addBrand(payload);
    // state is updated, ui is updated.
    // this is like reducer. state change
    setBrands([newBrand, ...brands]);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h2>All Tennis Brands</h2>
      <BrandsList brands={brands} />
      <NewBrandForm onSave={handleSave} />
    </div>
  );
}
