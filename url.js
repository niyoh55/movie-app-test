let dev = true;

const urlForApi =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://movie-app-test-five.vercel.app";
export default urlForApi;
