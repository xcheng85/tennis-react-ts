import { useEffect, useState, Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom'; // hooker to access the loaded data
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // useQuery hooker to get data,
import { getBrands, assertIsBrands } from './getBrands'; // think of it as di in angular
import { addBrand } from './addBrands'; // think of it as di in angular
import { Brand, NewBrandPayload } from './types';
import { BrandsList } from './BrandsList'; // parent-child component
import { NewBrandForm } from './NewBrandForm';

// use react native state management
export function BrandsPage() {
  // no delay
  //   const brands = useLoaderData();
  //   assertIsBrands(brands);

  // method3: useQuery hook from react-query
  //   TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey,
  // query key is ['brands']
  // TData is getBrands
  // alias data to be brands, more readability
  const { isLoading, isFetching, data: brands, isError } = useQuery(['brands'], getBrands);
  // mutate is to trigger the mutation
  // if rest api error, isError will be true
  // queryClient is used to update the cache once data is fetched from the server successfully
  // same key ['brands'], basically save a call to server to fetch the brands
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addBrand, {
    onSuccess: (newBrand) => {
      // like reducer function for the data on key ['brands']
      queryClient.setQueriesData<Brand[]>(['brands'], (oldBrands) => {
        if (oldBrands === undefined) {
          return [newBrand];
        } else {
          return [newBrand, ...oldBrands];
        }
      });
    },
  });
  if (isLoading || brands === undefined) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <h2>All Tennis Brands</h2>
      {/* for non-defer */}
      {/* <BrandsList brands={brands} /> */}
      <NewBrandForm onSave={mutate} />
      {isFetching ? <div>Fetching...</div> : <BrandsList brands={brands} />}
    </div>
  );

  // method2: with delay
  // const data = useLoaderData();
  // assertIsData(data);

  // method1: useEffect
  //   // initial loading state is true;
  //   // setIsLoading like dispatch actin
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [brands, setBrands] = useState<Brand[]>([]);
  //   useEffect(() => {
  //     let cancel = false;
  //     // does not support async await
  //     getBrands().then((data) => {
  //       if (!cancel) {
  //         setBrands(data);
  //         setIsLoading(false);
  //       }
  //     });
  //     return () => {
  //       // clean up function
  //       cancel = true;
  //     };
  //   }, []);

  // here async is due to addBrand
  async function handleSave(payload: NewBrandPayload) {
    const newBrand = await addBrand(payload);
    // // state is updated, ui is updated.
    // // this is like reducer. state change
    // setBrands([newBrand, ...brands]);
  }

  //   if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }
  // return (
  //   <div>
  //     <h2>All Tennis Brands</h2>
  //     {/* for non-defer */}
  //     {/* <BrandsList brands={brands} /> */}
  //     <NewBrandForm onSave={handleSave} />
  //     <Suspense fallback={<div>Fetching...</div>}>
  //       <Await resolve={data.brands}>
  //         {(brands) => {
  //           assertIsBrands(brands);
  //           return <BrandsList brands={brands} />;
  //         }}
  //       </Await>
  //     </Suspense>
  //   </div>
  // );
}

// loader: async () => defer({ brands: getBrands() }),
type Data = {
  brands: Brand[];
};

export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== 'object') {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error('Data is null');
  }
  if (!('brands' in data)) {
    throw new Error("data doesn't contain brands");
  }
}
