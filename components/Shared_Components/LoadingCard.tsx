const LoadingCard = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[200px] h-[300px] flex flex-col items-center justify-center rounded-lg bg-base-300 shadow-md overflow-hidden animate-pulse">
        {/* Hình (poster) */}
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      {/* Hai dòng chữ tách nhau */}
      <div className="w-full flex flex-col items-center justify-center gap-3 py-3 w-full">
        {/* Dòng 1: tên phim */}
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        {/* Dòng 2: ngày phát hành */}
        <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
