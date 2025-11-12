interface ButtonProps {
  action: () => void;
  title: string;
}

export const Button = ({ action, title }: ButtonProps) => {
  return <button onClick={action}>{title}</button>;
};
