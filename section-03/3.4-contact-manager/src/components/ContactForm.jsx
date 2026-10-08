import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../slices/ContactSlice.jsx";

function ContactForm() {
  const contacts = useSelector((state) => state.contacts.list);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required.";
    }

    if (!/^\d{8}$/.test(phone)) {
      newErrors.phone = "Phone must be exactly 8 digits.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    } else {
      const emailExists = contacts.some(
        (c) => c.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (emailExists) {
        newErrors.email = "A contact with this email already exists.";
      }
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    // If there is at least one error, stop here
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    dispatch(
      addContact({
        id: Date.now(),
        name: name.trim(),
        phone: phone,
        email: email.trim(),
        favorite: favorite,
      }),
    );

    // Clear the form
    setName("");
    setPhone("");
    setEmail("");
    setFavorite(false);
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">Add contact</h2>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 w-full"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Phone (8 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-1 w-full"
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 w-full"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      <label className="block mb-2">
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
          className="mr-2"
        />
        Favorite
      </label>

      <button type="submit" className="border px-3 py-1">
        Add
      </button>
    </form>
  );
}

export default ContactForm;
