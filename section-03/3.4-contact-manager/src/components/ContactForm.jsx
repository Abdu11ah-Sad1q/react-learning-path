import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../slices/ContactSlice.jsx";
import { updateContact } from "../slices/ContactSlice.jsx";

function ContactForm({ contactToEdit, onDone }) {
  const contacts = useSelector((state) => state.contacts.list);
  const dispatch = useDispatch();

  const isEditing = contactToEdit !== null;

  // If editing, start with the contact's values. Otherwise start empty.
  const [name, setName] = useState(isEditing ? contactToEdit.name : "");
  const [phone, setPhone] = useState(isEditing ? contactToEdit.phone : "");
  const [email, setEmail] = useState(isEditing ? contactToEdit.email : "");
  const [favorite, setFavorite] = useState(
    isEditing ? contactToEdit.favorite : false,
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required.";
    }

    /*
    ^	start of the text
    \d	one digit (0 to 9)
    {8}	exactly 8 of them
    $	end of the text */

    if (!/^\d{8}$/.test(phone)) {
      newErrors.phone = "Phone must be exactly 8 digits.";
    }

    /*
      ^	start
      \S+	one or more characters that are not spaces
      @	an at sign
      \S+	one or more non-space characters
      \.	a dot
      \S+	one or more non-space characters
      $	end 
      */
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    } else {
      const emailExists = contacts.some(
        (c) =>
          c.email.toLowerCase() === email.trim().toLowerCase() &&
          (!isEditing || c.id !== contactToEdit.id),
      );
      if (emailExists) {
        newErrors.email = "A contact with this email already exists.";
      }
    }

    return newErrors;
  }

  function clearForm() {
    setName("");
    setPhone("");
    setEmail("");
    setFavorite(false);
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (isEditing) {
      // Keep the same id so it updates in place
      dispatch(
        updateContact({
          id: contactToEdit.id,
          name: name.trim(),
          phone: phone,
          email: email.trim(),
          favorite: favorite,
        }),
      );
      onDone(); // leave edit mode
    } else {
      dispatch(
        addContact({
          id: Date.now(),
          name: name.trim(),
          phone: phone,
          email: email.trim(),
          favorite: favorite,
        }),
      );
      clearForm();
    }
  }

  function handleCancel() {
    clearForm();
    onDone(); // leave edit mode, nothing was saved
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 mb-6">
      <h2 className="text-lg font-bold mb-2">
        {isEditing ? "Edit contact" : "Add contact"}
      </h2>

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

      <button type="submit" className="border px-3 py-1 mr-2">
        {isEditing ? "Save changes" : "Add"}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={handleCancel}
          className="border px-3 py-1"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ContactForm;
