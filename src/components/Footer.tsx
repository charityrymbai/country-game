import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 bg-gray-800 w-screen flex flex-col space-y-2 items-center sm:space-y-0 sm:flex-row sm:justify-around text-gray-500 text-xs sm:text-sm p-4">
      <p className="flex space-x-2 items-center">
        <FaGithub />
        <a href="https://github.com/charityrymbai">charityrymbai</a>
      </p>
      <p>
        Created with 💓 by &nbsp;
        <a className="text-red-400" href="mailto:charityrymbai@hotmail.com">
          Charity Rymbai
        </a>
      </p>
      <p className="flex space-x-2 items-center">
        <FaLinkedinIn />
        <a href="https://linkedin.com/in/charityrymbai">charityrymbai</a>
      </p>
    </footer>
  );
};

export default Footer;
