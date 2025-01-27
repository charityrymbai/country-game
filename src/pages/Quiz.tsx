import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { countriesList } from "../data/countriesData";

interface Questions {
    options: string[];
    correct_option: string;
    question_text: string;
    image_url: string;
}

const Quiz = () => {
  const location = useLocation();
  const NUM_QUESTIONS : number = location.state?.data;
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Questions[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [backGroundColor, setBackGroundColor] = useState<string>("");
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (!NUM_QUESTIONS) {
        navigate("/home");
    }
    const generateQuestions = () => {
      const countryCodes = Object.keys(countriesList);
      const questions: Questions[] = [];
    

      for (let i = 0; i < NUM_QUESTIONS; i++) {
        const options:string[] = [];
        while (options.length < 4) {
          const randomIndex = Math.floor(Math.random() * countryCodes.length);
          const countryCode = countryCodes[randomIndex];
          if (!options.includes(countryCode)) {
            options.push(countryCode);
          }
        }
        const correctOption = options[Math.floor(Math.random() * 4)];
        questions.push({
          options,
          correct_option: correctOption,
          question_text: `Which country does this flag belong to?`,
          image_url: `https://flagsapi.com/${correctOption}/flat/64.png`,
        });
      }
      setQuestions(questions);
    };
    generateQuestions();
  }, [NUM_QUESTIONS, navigate]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setAnswers({ ...answers, [currentQuestionIndex]: option });
    if (option === currentQuestion.correct_option) {
      setBackGroundColor("bg-green-500");
    } else {
      setBackGroundColor("bg-red-500");
      setShowAnswer(true);
    }
    setDisableButtons(true);
    setTimeout(()=>{
        handleNextQuestion();
    }, 1000)
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] || null);
    } else {
      setQuizCompleted(true);
    }
    setBackGroundColor("");
    setDisableButtons(false);
    setShowAnswer(false);
  };

  const evaluateQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_option) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  return (
    <div className={`${backGroundColor} flex flex-col wrapper min-h-[100vh] h-fit min-w-[100vw] w-fit items-center justify-center  p-6`}>
      {!quizCompleted ? (
        currentQuestion && (
          <div className="bg-gray-100 p-10 rounded-3xl w-full max-w-3xl text-center mt-4 shadow-black shadow-lg">
            <h2 className="text-2xl  mb-6 text-black  p-4 rounded-full font-baloo">
              {currentQuestion.question_text}
            </h2>
            <img src={currentQuestion.image_url} alt="Country flag" className="w-36 mb-6 mx-auto" />
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  disabled={disableButtons}
                  className={`p-4 font-baloo rounded-full text-xl text-black border border-[#0A2463] hover:shadow-md hover:shadow-black transition-colors ${showAnswer && (option === currentQuestion.correct_option)? "bg-green-400" : ""} 
                    ${selectedOption === option? 
                        `shadow-md shadow-black ${ selectedOption === currentQuestion.correct_option? "bg-green-400" : "bg-red-500"} `
                      : 
                        ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {countriesList[option]}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="bg-gray-100 p-10 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
          <p className="text-2xl mb-4">
            You answered {evaluateQuiz()} out of {questions.length} questions
            correctly.
          </p>
          <button
            className="bg-gray-400 hover:bg-gray-800 hover:text-white p-4 rounded-lg text-xl"
            onClick={() => navigate("/home")}
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
