import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./Icons";

export default function PasswordField({ value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input type={visible ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        tabIndex={-1}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
