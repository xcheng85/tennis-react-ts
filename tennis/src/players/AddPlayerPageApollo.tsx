import { useForm, FieldError, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation, useApolloClient } from '@apollo/client';

import { FormValidationError } from './FormValidationError';
import { addPlayerPayload, Country, GenderType } from '../api/addPlayer';
import { ADD_PLAYER_APOLLO } from '../api/addPlayer'; // think of it as di in angular
import { APOLLO_GET_COUNTRIES_QUERY } from '../api/getCountries'; // think of it as di in angular
import { APOLLO_GET_GENDERTYPES_QUERY } from '../api/getGenderTypes';

type addPlayerFormInput = {
  first: string;
  last: string;
  country: { label: string; value: Country };
  gender: { label: string; value: GenderType };
};

export function AddPlayerApollo() {
  // query country list and gender list from graphql server
  const countriesTypesQs = useQuery(APOLLO_GET_COUNTRIES_QUERY);
  const tempCountries = countriesTypesQs.data
    ? (countriesTypesQs.data.__type.enumValues.map((v: any) => v.name) as Country[])
    : [];
  const countries = tempCountries.map((c) => ({ value: c, label: c as unknown as string }));
  const genderTypesQs = useQuery(APOLLO_GET_GENDERTYPES_QUERY);
  const tempGenderTypes = genderTypesQs.data
    ? (genderTypesQs.data.__type.enumValues.map((v: any) => v.name) as GenderType[])
    : [];
  const genderTypes = tempGenderTypes.map((c) => ({ value: c, label: c as unknown as string }));

  // for graphql mutation
  const [addPlayer] = useMutation(ADD_PLAYER_APOLLO);

  // formState has a field errors which contains all the current validation errors.
  // register an input field into React Hook Form so that it is available for the validation,
  // and its value can be tracked for changes.
  const { register, handleSubmit, formState, control } = useForm<addPlayerFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  // navigate to Players page.
  const navigate = useNavigate();
  // React Hook Form will call this funtion after validation
  function onSubmit({ first, last, country, gender }: addPlayerFormInput) {
    const payload: addPlayerPayload = {
      first,
      last,
      country: country.value,
      gender: gender.value,
    };
    addPlayer({ variables: payload });
    //navigate(`/playersV2`);
  }
  const onErrors = (errors: any) => console.error(errors);
  // disable native html validation
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div>
        <label htmlFor="first">First Name</label>
        <input
          {...register('first', {
            required: 'first name must be provided',
          })}
        />
        <FormValidationError fieldError={formState.errors.first}></FormValidationError>
      </div>
      <div>
        <label htmlFor="last">Last Name</label>
        <input
          {...register('last', {
            required: 'last name must be provided',
          })}
        />
        <FormValidationError fieldError={formState.errors.last}></FormValidationError>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Select {...field} options={countries} />}
        />
        <FormValidationError fieldError={formState.errors.country?.value}></FormValidationError>
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Select {...field} options={genderTypes} />}
        />
        <FormValidationError fieldError={formState.errors.country?.value}></FormValidationError>
      </div>
      <div>
        {/* submit for form */}
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
