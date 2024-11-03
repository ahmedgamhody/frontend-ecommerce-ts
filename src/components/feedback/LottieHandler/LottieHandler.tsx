import Lottie from "lottie-react";
import error from "@assets/lottieFiles/error.json";
import error404 from "@assets/lottieFiles/error404.json";
import emtyRecord from "@assets/lottieFiles/emtyRecord.json";
import loadingRecord from "@assets/lottieFiles/loadingRecord.json";
import mainlottie from "@assets/lottieFiles/mainlottie.json";
import success from "@assets/lottieFiles/success.json";

const lottieFilesTypes = {
  error, // error : error
  error404, // error404 : error404
  emtyRecord, // emtyRecord : emtyRecord
  loadingRecord, // loadingRecord : loadingRecord
  mainlottie, // mainlottie : mainlottie
  success, // success : success
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesTypes;
  message?: string;
  className?: string;
};

export default function LottieHandler({
  type,
  message,
  className = "",
}: LottieHandlerProps) {
  const lottie = lottieFilesTypes[type];
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie
        animationData={lottie}
        style={{ height: "300px", marginBottom: "30px" }}
        loop={false}
      />
      {message && (
        <h3
          style={{ fontSize: "19px", marginBottom: "30px" }}
          className={`${className}`}
        >
          {message}
        </h3>
      )}
    </div>
  );
}
