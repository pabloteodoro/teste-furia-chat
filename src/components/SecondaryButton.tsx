import { FiArrowLeft } from "react-icons/fi"; 

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function SecondaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-300 flex items-center gap-2"
    >
      <FiArrowLeft size={20} />
      {children}
    </button>
  );
}
