import "./FormInput.css";

export function FormInput({
  inputTitle,
  inputType,
  placeholder,
  id,
  handleChange,
}) {
  return (
    <span className="form__label">
      <h3 className={`input__title ${id}`}>{inputTitle}</h3>
      <input
        type={inputType}
        placeholder={placeholder}
        id={id}
        onChange={handleChange}
        className="form__input"
      />
    </span>
  );
}
