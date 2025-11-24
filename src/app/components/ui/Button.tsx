interface ButtonProps {
  action: () => void;
  title: string;
}

export function Button({ title, action }: ButtonProps) {
  return (
    <button
      onClick={action}
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
    >
      {title}
    </button>
  );
}
