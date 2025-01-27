import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home:React.FC = () => {
  const navigate = useNavigate();
  const [numQuestions, setNumQuestions] = useState<number>(5);
  return (
    <div className="text-2xl sm:text-5xl grid place-items-center h-screen">
      <div className="text-center space-y-5">
        <button 
          className="bg-gray-400 hover:bg-gray-700 hover:text-white text-black font-bold py-4 px-20 rounded-full"
          onClick={() => {
            try {
              navigate("/quiz", {state: { data : numQuestions }});
            } catch (error) {
              console.error("Navigation error:", error);
            }
          }}
        >
          Start Quiz
        </button>
        <div className="flex justify-center space-x-4">
          <button 
            className="rounded-full hover:bg-gray-400"
            onClick={()=>{if (numQuestions > 1 ) setNumQuestions((q) => q - 1)}}
          ><ChevronLeft size={100}/></button>
          <div className="border-2 p-10 rounded-3xl">{numQuestions}</div>
          <button 
            className="rounded-full hover:bg-gray-400 "
            onClick={()=>{if (numQuestions < 20 ) setNumQuestions((q) => q + 1)}}
          ><ChevronRight size={100}/></button>
        </div>
      </div>
    </div>
  );
}

export default Home;