import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  showModal: "scale-0",
  updateModal: "scale-0",
  loading: { show: false, msg: "" },
  alert: { show: false, msg: "", color: "" },
  connectedAccount: "",
  nft: null,
  nfts: [],
  transactions: [],
  contract: null,
});

const setAlert = (msg, color) => {
  setGlobalState("loading", { show: false, msg: "" });
  setGlobalState("alert", { show: true, msg, color });
  const timer = setTimeout(() => {
    clearTimeout(timer);
    setGlobalState("alert", { show: false, msg, color });
  }, 6000);
};

const setLoadingMsg = (msg) => {
  setGlobalState("loading", { show: true, msg });
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    const end = text.substring(text.length - endChars, text.length);

    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  setLoadingMsg,
  setAlert,
  truncate,
};
