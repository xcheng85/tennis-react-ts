import { useForm, FieldError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormValidationError } from './FormValidationError';

type Player = {
  firstName: string;
  lastName: string;
  birthPlace: string;
  turnProYear: number;
};

export function AddPlayer() {
  // formState has a field errors which contains all the current validation errors.
  const { register, handleSubmit, formState } = useForm<Player>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();
  // React Hook Form will call this funtion after validation
  function onSubmit(p: Player) {
    console.log(JSON.stringify(p));
    const fullName = `${p.firstName} ${p.lastName}`;
    navigate(`/confirm/${fullName}`);
  }
  // disable native html validation
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          {...register('firstName', {
            required: 'first name must be provided',
          })}
        />
        <FormValidationError fieldError={formState.errors.firstName}></FormValidationError>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          {...register('lastName', {
            required: 'last name must be provided',
          })}
        />
        <FormValidationError fieldError={formState.errors.lastName}></FormValidationError>
      </div>
      <div>
        <label htmlFor="birthPlace">Birth Place</label>
        <input
          {...register('birthPlace', {
            required: 'birth place must be provided',
          })}
        />
        <FormValidationError fieldError={formState.errors.birthPlace}></FormValidationError>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
