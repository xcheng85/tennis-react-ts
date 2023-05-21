import { useForm, FieldError, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query'; // useQuery hooker to get data,
import { FormValidationError } from './FormValidationError';
import { addPlayerPayload, Country, GenderType } from '../api/addPlayer';
import { addPlayer } from '../api/addPlayer'; // think of it as di in angular
import { getCountries } from '../api/getCountries'; // think of it as di in angular
import { getGenderTypes } from '../api/getGenderTypes';

type addPlayerFormInput = {
  first: string;
  last: string;
  country: { label: string; value: Country };
  gender: { label: string; value: GenderType };
};

export function AddPlayerV2() {
  // query country list and gender list from graphql server
  const countriesQs = useQuery(['countries'], getCountries);
  const countries = countriesQs.data
    ? countriesQs.data.map((c) => ({ value: c, label: c as unknown as string }))
    : [];
  const genderTypesQs = useQuery(['genderTypes'], getGenderTypes);
  const genderTypes = genderTypesQs.data
    ? genderTypesQs.data.map((c) => ({ value: c, label: c as unknown as string }))
    : [];
  // for graphql mutation
  const { mutate } = useMutation(addPlayer, {});
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
    mutate(payload);
    navigate(`/playersV2`);
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
