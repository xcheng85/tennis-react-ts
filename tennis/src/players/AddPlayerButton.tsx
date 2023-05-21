type Props = {
  onClick: () => void;
};

export function AddPlayerButton({ onClick }: Props) {
  return <button type="button" onClick={onClick}></button>;
}
