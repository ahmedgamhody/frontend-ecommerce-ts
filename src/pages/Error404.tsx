import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import "./Error404.css";
import { LottieHandler } from "@components/feedback";

function Error404() {
  let errorStatus: number;
  let errorStatusText: string;
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 d-con">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center text-danger">{errorStatus}</h1>
              </div>
              <LottieHandler type="error404" />
              <div className="contant_box_404">
                <h3 className="h2">{errorStatusText}</h3>
                <Link
                  to="/"
                  type="button"
                  className="btn btn-success w-25"
                  replace={true}
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Error404;
