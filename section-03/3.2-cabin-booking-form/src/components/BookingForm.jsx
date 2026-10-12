import { useState } from "react";

const MAX_NIGHTS = 14;

const initialValues = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  message: "",
};

const input = "w-full border rounded p-2 mt-1";

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
}

function validate(v) {
  const errors = {};
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local time
  const nights = getNights(v.checkIn, v.checkOut);
  const guests = Number(v.guests);

  if (!v.name.trim()) errors.name = "Name is required";

  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Enter a valid email";

  if (!v.checkIn) errors.checkIn = "Check-in date is required";
  else if (v.checkIn < today) errors.checkIn = "Check-in cannot be in the past";

  if (!v.checkOut) errors.checkOut = "Check-out date is required";
  else if (v.checkIn && nights <= 0)
    errors.checkOut = "Check-out must be after check-in";
  else if (nights > MAX_NIGHTS) errors.checkOut = "Maximum stay is 14 nights";

  if (!Number.isInteger(guests) || guests < 1 || guests > 6)
    errors.guests = "Guests must be between 1 and 6";

  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </label>
  );
}

export default function BookingForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  // show an error only after the user has left that field
  const err = (name) => (touched[name] ? errors[name] : undefined);

  const props = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: input,
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book the cabin</h1>

      <form className="space-y-4">
        <Field label="Name" error={err("name")}>
          <input {...props("name")} />
        </Field>

        <Field label="Email" error={err("email")}>
          <input {...props("email")} type="email" />
        </Field>

        <Field label="Check-in" error={err("checkIn")}>
          <input {...props("checkIn")} type="date" />
        </Field>

        <Field label="Check-out" error={err("checkOut")}>
          <input {...props("checkOut")} type="date" />
        </Field>

        <Field label="Guests (1–6)" error={err("guests")}>
          <input {...props("guests")} type="number" />
        </Field>

        <Field label="Message (optional)">
          <textarea {...props("message")} />
        </Field>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book
        </button>
      </form>
    </div>
  );
}
