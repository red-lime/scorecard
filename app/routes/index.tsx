import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export default function Index() {
  let user = useLoaderData();
  return (
    <div id="app" className="h-screen w-screen flex flex-col">
      <div className="flex flex-row flex-wrap">
        <aside className="w-64 h-screen flex flex-col p-6 bg-gray-700">
          <a href="" className="mb-6">
            <img src="" alt="" />
            <h2 className="text-2xl font-semibold">magpai</h2>
          </a>
          <nav>
            <div>Assessments</div>
          </nav>
        </aside>
        <main className="p-6">
          <div>
            <h1 className="text-4xl font-semibold">Hello, Alex</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
