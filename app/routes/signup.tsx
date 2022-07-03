import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/utils/db.server";

type ActionData = {
  email: string;
  passwordHash: string;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const passwordHash = form.get("password");

  if (typeof email !== "string" || typeof passwordHash !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields: ActionData = { email, passwordHash };

  const user = await db.user.create({ data: fields });

  return redirect("/");
};

export default function SignUp() {
  return (
    <div id="app">
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="text-center text-2xl mb-12 font-bold">Sign Up</div>
          <Form method="post" className="w-full max-w-sm">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6"
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
                className="block text-sm font-semibold leading-6"
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
          </Form>
        </div>
      </main>
    </div>
  );
}
