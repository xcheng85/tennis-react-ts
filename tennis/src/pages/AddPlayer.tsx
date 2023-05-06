import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Player = {
  firstName: string;
  lastName: string;
  birthPlace: string;
  turnProYear: number;
};

export function AddPlayer() {
  const { register, handleSubmit } = useForm<Player>();
  const navigate = useNavigate();
  // React Hook Form will call this funtion after validation
  function onSubmit(p: Player) {
    console.log(JSON.stringify(p));
    const fullName = `${p.firstName} ${p.lastName}`;
    navigate(`/confirm/${fullName}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input {...register('firstName')} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input {...register('lastName')} />
      </div>
      <div>
        <label htmlFor="birthPlace">Birth Place</label>
        <input {...register('birthPlace')} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
