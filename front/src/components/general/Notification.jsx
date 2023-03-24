import { Transition } from "@headlessui/react";
import React from "react";
import { resolveValue, ToastBar, Toaster, ToastIcon } from "react-hot-toast";

const Notification = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "green",
          },
        },
        error: {
          style: {
            background: "red",
          },
        },
        style: { color: "white" },
      }}
    >
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={`transform p-2 w-[200px] flex shadow-sm rounded-sm`}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
          style={{ ...t.style }}
        >
          <ToastIcon toast={t} />
          <p className="px-2">{resolveValue(t.message)}</p>
        </Transition>
      )}
    </Toaster>
  );
};

export default Notification;
