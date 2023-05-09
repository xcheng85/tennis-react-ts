import { useEffect, useState } from 'react';
import { getBrands } from './getBrands'; // think of it as di in angular
import { Brand } from './types';
import { BrandsList } from './BrandsList'; // parent-child component

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

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h2>All Tennis Brands</h2>
      <BrandsList brands={brands} />
    </div>
  );
}
