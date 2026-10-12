import { useState } from "react";

const PRICE_PER_NIGHT = 1200;
const CLEANING_FEE = 500;
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
const nok = (n) => `${n.toLocaleString("en-US")} NOK`;

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  return Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
}

function calculatePrice(nights) {
  const discounted = nights >= 7; // 10% off the nightly price only
  const nightly = discounted ? PRICE_PER_NIGHT * 0.9 : PRICE_PER_NIGHT;
  const nightsTotal = Math.round(nights * nightly);
  return {
    discounted,
    nightly,
    nightsTotal,
    total: nightsTotal + CLEANING_FEE,
  };
}

function validate(v) {
  const errors = {};
  const today = new Date().toLocaleDateString("en-CA");
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
  const [booked, setBooked] = useState(false);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;
  const nights = getNights(values.checkIn, values.checkOut);
  const price = calculatePrice(nights);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) setBooked(true);
  };

  const reset = () => {
    setValues(initialValues);
    setTouched({});
    setBooked(false);
  };

  const err = (name) => (touched[name] ? errors[name] : undefined);

  const props = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: input,
  });

  if (booked) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Booking confirmed</h1>
        <ul className="space-y-1 mb-4">
          <li>
            <b>Name:</b> {values.name}
          </li>
          <li>
            <b>Email:</b> {values.email}
          </li>
          <li>
            <b>Check-in:</b> {values.checkIn}
          </li>
          <li>
            <b>Check-out:</b> {values.checkOut}
          </li>
          <li>
            <b>Nights:</b> {nights}
          </li>
          <li>
            <b>Guests:</b> {values.guests}
          </li>
          {values.message && (
            <li>
              <b>Message:</b> {values.message}
            </li>
          )}
          <li>
            <b>Total:</b> {nok(price.total)}
          </li>
        </ul>
        <button onClick={reset} className="w-full border p-2 rounded">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book the cabin</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {nights > 0 && !errors.checkOut && (
          <div className="border rounded p-3 bg-gray-50 space-y-1">
            <div className="flex justify-between">
              <span>
                {nights} nights × {nok(price.nightly)}
              </span>
              <span>{nok(price.nightsTotal)}</span>
            </div>
            {price.discounted && (
              <p className="text-sm text-green-700">
                10% discount applied (7+ nights)
              </p>
            )}
            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>{nok(CLEANING_FEE)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Total</span>
              <span>{nok(price.total)}</span>
            </div>
          </div>
        )}

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
