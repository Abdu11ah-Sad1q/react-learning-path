import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  message: "",
};

const input = "w-full border rounded p-2 mt-1";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

export default function BookingForm() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book the cabin</h1>

      <form className="space-y-4">
        <Field label="Name">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <Field label="Email">
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <Field label="Check-in">
          <input
            name="checkIn"
            type="date"
            value={values.checkIn}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <Field label="Check-out">
          <input
            name="checkOut"
            type="date"
            value={values.checkOut}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <Field label="Guests (1–6)">
          <input
            name="guests"
            type="number"
            value={values.guests}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <Field label="Message (optional)">
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            className={input}
          />
        </Field>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Book
        </button>
      </form>
    </div>
  );
}
