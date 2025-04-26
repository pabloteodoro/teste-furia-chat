
type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
  };
  
  export default function Button({ children, onClick, type = "button" }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
      >
        {children}
      </button>
    );
  }
  