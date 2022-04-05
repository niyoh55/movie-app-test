import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        padding: 0,
        margin: 0,
        minHeight: "100vh",
      }}
    >
      {/* <div className="flex justify-center gap-10 pt-10 pb-5 ">
        <Link href="/">
          <h1 className="text-5xl">Home Page</h1>
        </Link>
        <Link href="/add-meetup">
          <h1 className="text-5xl">New Meetup</h1>
        </Link>
      </div> */}

      <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 ml-6">
          <span className="font-bold text-2xl tracking-tight">Movies App</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="px-20 w-full block flex-grow lg:flex lg:items-center lg:w-auto gap-x-20">
          <Link href="/" className="block mt-4 lg:inline-block lg:mt-0  mr-4">
            <p className="text-xl text-white hover:text-blue-400 hover:text-2xl">
              All Movies
            </p>
          </Link>
          <Link
            href="/add-movie"
            className="block mt-4 lg:inline-block lg:mt-0  mr-4"
          >
            <p className="text-xl text-white hover:text-blue-400 hover:text-2xl">
              Add Movie
            </p>
          </Link>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
