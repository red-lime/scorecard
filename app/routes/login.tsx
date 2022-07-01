export default function Login() {
  return (
    <>
      <form action="post" className="w-full max-w-sm">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-md font-semibold leading-6"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 appearance-none rounded-md block w-full h-10 px-3 bg-slate-600 shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-md font-semibold leading-6"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-2 appearance-none rounded-md block w-full h-10 px-3 bg-slate-600 shadow-sm sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded text-md bg-slate-100 w-full mt-2 py-2.5 px-4 text-slate-800 font-semibold hover:bg-slate-300"
        >
          Create an account
        </button>
      </form>
    </>
  );
}
