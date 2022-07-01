import Login from "./login";

export default function Index() {
  return (
    <div id="app">
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="text-center text-2xl mb-12">
            Login to create a scorecard
          </div>
          <Login />
        </div>
      </main>
    </div>
  );
}
