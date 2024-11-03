import axios from "axios";
import { useState } from "react";
type TEmailStatus =
  | "idle"
  | "available"
  | "notAvailable"
  | "checking"
  | "failed";
export default function useCheckEmailAvailability() {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TEmailStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEmailAvailabilityStatus("checking");
    setEnteredEmail(email);
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (response.data.length > 0) {
        setEmailAvailabilityStatus("notAvailable");
      } else {
        setEmailAvailabilityStatus("available");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
      console.log(error);
    }
  };

  const resetCheckEmailAvailability = () => {
    // دى عشان لو اليوز مسح الايميل ودخل قيمه جديده غير صحيحه فى عاوز اعمل reste
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };
  return {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
}
