const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[100px]">
      <div className="loader w-[50px] h-[50px] grid aspect-square relative">
        <div className="absolute inset-0 bg-no-repeat animate-spin-loader"></div>
        <div className="absolute inset-[4px] bg-no-repeat animate-spin-loader filter hue-rotate-45"></div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .loader div {
          --c: no-repeat radial-gradient(farthest-side, #add8e6 92%, transparent);
          background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%, var(--c) 0 50%;
        }
        .loader div:first-child {
          background-size: 12px 12px;
          animation: spin-loader 1s infinite;
        }
        .loader div:last-child {
          background-size: 8px 8px;
          animation: spin-loader 1s infinite linear;
          filter: hue-rotate(180deg);
        }
        @keyframes spin-loader {
          100% {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
