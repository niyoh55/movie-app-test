import React from "react";

const TestPage = () => {
  return (
    <div>
      <h1 className="text-9xl text-pink-400">Eto yons</h1>
      <h1 className="text-9xl text-pink-400">ENV: {process.env.MY_NAME}</h1>
    </div>
  );
};

export default TestPage;
