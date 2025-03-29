export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-screen">
      <div className="relative flex items-center justify-center">
        <div className="flex space-x-5 text-gray-600">
          <span className="animate-bounce rounded-full h-8 w-8 bg-yellow-500">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-yellow-300 opacity-75"></span>
          </span>
          <span className="delay-100 animate-bounce rounded-full h-8 w-8 bg-orange-500">
            <span className="delay-100 animate-ping absolute inline-flex h-8 w-8 rounded-full bg-orange-300 opacity-75"></span>
          </span>
          <span className="delay-200 animate-bounce rounded-full h-8 w-8 bg-red-500">
            <span className="delay-200 animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-300 opacity-75"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
