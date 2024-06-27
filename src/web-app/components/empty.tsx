import React from "react";

const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Nothing to show</h1>
        <p className="text-lg mb-4">
          Oops! The page you are looking for has nothing to show.
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
};

export default Empty;
