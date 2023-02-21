import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex items-center flex-col justify-center py-64">
      <h1 className="font-bold text-3xl mb-4">Oops!</h1>
      <p className="mb-4">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}