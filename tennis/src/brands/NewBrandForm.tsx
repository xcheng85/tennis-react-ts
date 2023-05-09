import { FieldError, useForm } from 'react-hook-form';
import { FormValidationError } from '../pages/FormValidationError';
import { NewBrandPayload } from './types';

type Props = {
  // React Hook Form will call this funtion after validation
  onSave: (payload: NewBrandPayload) => void;
};
export function NewBrandForm({ onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewBrandPayload>();
  const fieldStyle = 'flex flex-col mb-2';
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? 'border-red-500' : '';
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSave)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'You must enter a name for the brand',
          })}
        />
        <FormValidationError fieldError={errors.name} />
      </div>
      <div>
        <label htmlFor="origin">Origin</label>
        <input
          type="text"
          id="origin"
          {...register('origin', {
            required: 'You must enter a origin for the brand',
          })}
        />
        <FormValidationError fieldError={errors.origin} />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
        {isSubmitSuccessful && <div role="alert">The brand was successfully added</div>}
      </div>
    </form>
  );
}
