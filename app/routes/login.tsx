import { ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { login } from "~/utils/session.server";

function validateEmail(email: string) {
  if (!email.includes("." && "@")) {
    return `please use a valid email`;
  }
}

function makeLowerCase(text: string) {
  return text.toLowerCase();
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
    return badRequest({
      formError: "Form not submitted correctly",
    });
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const user = await login({ email, password });

  if (user) {
    return redirect("/");
  }

  if (!user) {
    const error = badRequest({
      fields,
      formError: `We don't recognize these credentials.`,
    });
    return error;
  }

  return null;
};

export default function Login() {
  const actionData = useActionData<ActionData>();

  return (
    <div id="app">
      <main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
          <div className="text-center text-2xl mb-12 font-bold">Login</div>
          <Form method="post" className="w-full max-w-sm">
            {actionData?.formError ? (
              <p className="text-sm mb-6 text-red-300 text-center">
                {actionData?.formError}
              </p>
            ) : null}
            <div className="mb-6">
              <label
                htmlFor="email-input"
                className="block text-sm font-semibold leading-6"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email-input"
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
                  id="email-error"
                >
                  {actionData?.fieldErrors?.email}
                </p>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password-input"
                className="block text-sm font-semibold leading-6"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password-input"
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
              Login
            </button>
          </Form>
        </div>
      </main>
    </div>
  );
}
