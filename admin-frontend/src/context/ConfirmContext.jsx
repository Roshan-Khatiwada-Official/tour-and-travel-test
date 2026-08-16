import { createContext, useCallback, useContext, useRef, useState } from "react";

const ConfirmContext = createContext(null);

// Promise-based confirm modal so call sites can just `await confirm(...)`
// instead of the native window.confirm() dialog admin actions used before —
// this one is stylable, doesn't block the whole browser tab, and looks like
// part of the product.
export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback(({ title = "Are you sure?", message = "", confirmLabel = "Confirm", danger = true }) => {
    setDialog({ title, message, confirmLabel, danger });
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = (result) => {
    setDialog(null);
    resolver.current?.(result);
    resolver.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialog && (
        <div className="confirm-overlay" role="presentation" onClick={() => close(false)}>
          <div className="confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onClick={(e) => e.stopPropagation()}>
            <h3 id="confirm-title">{dialog.title}</h3>
            {dialog.message && <p>{dialog.message}</p>}
            <div className="confirm-actions">
              <button type="button" className="admin-btn admin-btn-outline" onClick={() => close(false)}>
                Cancel
              </button>
              <button
                type="button"
                className={`admin-btn ${dialog.danger ? "admin-btn-danger-solid" : "admin-btn-green"}`}
                onClick={() => close(true)}
                autoFocus
              >
                {dialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside a ConfirmProvider");
  return ctx;
}
