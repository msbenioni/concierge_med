// Inspired by react-hot-toast library
import { useState, useEffect } from "react";

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 350; // Quick removal after animation (300ms + buffer)

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map();
const dismissTimeouts = new Map();

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  // Clear auto-dismiss timer if toast is manually dismissed
  const dismissT = dismissTimeouts.get(toastId);
  if (dismissT) {
    clearTimeout(dismissT);
    dismissTimeouts.delete(toastId);
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const _clearFromRemoveQueue = (toastId) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
    toastTimeouts.delete(toastId);
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners = [];

let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast({ ...props }) {
  const id = genId();

  const update = (props) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
    },
  });

  // AUTO-DISMISS after duration (default 3000ms)
  const duration =
    typeof props.duration === "number"
      ? props.duration
      : TOAST_CONFIG.DEFAULT_DURATION;

  if (duration !== Infinity) {
    const t = window.setTimeout(() => {
      dismiss();
      dismissTimeouts.delete(id);
    }, duration);
    dismissTimeouts.set(id, t);
  }

  return {
    id,
    dismiss,
    update,
  };
}

// Toast configuration constants for consistent behavior across the app
export const TOAST_CONFIG = {
  DURATION: {
    NORMAL: 3000,    // 3 seconds - for auto-dismiss behavior
  },
  DEFAULT_DURATION: 3000, // 3 seconds default for auto-dismiss
};

function useToast() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []); // Empty dependency array to prevent infinite loops

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    remove: (toastId) => dispatch({ type: actionTypes.REMOVE_TOAST, toastId }),
  };
}

export { useToast, toast }; 