import { FieldError } from 'react-hook-form';

type Props = {
  fieldError: FieldError | undefined;
};

export function FormValidationError({ fieldError }: Props) {
  if (!fieldError) {
    // no error, this component is invisible
    return null;
  } else {
    return (
      <div role={'alert'} className="text-red-500">
        {fieldError.message}
      </div>
    );
  }
}
