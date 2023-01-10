import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  showModal: "scale-0",
  updateModal: "scale-0",
  loading: { show: false, msg: "" },
  alert: { show: false, msg: "", color: "" },
});

const setAlert = (msg, color) => {
  const alert = getGlobalState("alert");
  setGlobalState("loading", { show: false, msg: "" });
  setGlobalState("alert", { show: true, msg, color });
  const timer = setTimeot(() => {
    clearTimeout(timer);
    setGlobalState("alert", { show: false, msg, color });
  }, 6000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  setLoadingMsg,
  setAlert,
};
