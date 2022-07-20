import { ActionFunction, redirect, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { register } from "~/utils/session.server";

function validateEmail(email: string) {
  if (!email.includes("." && "@")) {
    return `please use a valid email`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const badRequest = (data: ActionData) => {
  return json(data, { status: 400 });
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const userExists = await db.user.findFirst({
    where: { email },
  });
  if (userExists) {
    return badRequest({
      fields,
      formError: `User with username ${email} already exists`,
    });
  }
  const user = await register({ email, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }

  if (user) {
    console.log(user);
    return redirect("/");
  }

  return null;
};

export default function SignUp() {
  const actionData = useActionData<ActionData>();

  return (
    <div id="app">
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="text-center text-2xl mb-12 font-bold">Sign Up</div>
          <Form method="post" className="w-full max-w-sm">
            {actionData?.formError ? (
              <p className="text-sm mb-6 text-red-300 text-center">
                {actionData?.formError}
              </p>
            ) : null}
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
                aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                aria-errormessage={
                  actionData?.fieldErrors?.email ? "email-error" : undefined
                }
              />
              {actionData?.fieldErrors?.email ? (
                <p
                  className="m-0 text-red-300 text-sm"
                  role="alert"
                  id="password-error"
                >
                  {actionData?.fieldErrors?.email}
                </p>
              ) : null}
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
                aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                aria-errormessage={
                  actionData?.fieldErrors?.password
                    ? "password-error"
                    : undefined
                }
              />
              {actionData?.fieldErrors?.password ? (
                <p
                  className="m-0 text-red-300 text-sm"
                  role="alert"
                  id="password-error"
                >
                  {actionData?.fieldErrors?.password}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded text-md bg-slate-100 w-full mt-2 py-2.5 px-4 text-slate-800 font-semibold hover:bg-slate-300"
            >
              Create an account
            </button>
          </Form>
          <Link to="/signup">Haven't signed up? Click here to sign up.</Link>
        </div>
      </main>
    </div>
  );
}
