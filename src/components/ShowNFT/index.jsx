import React from "react";
import { FaTimes } from "react-icons/fa";
import Identicon from "react-identicons";
import {
  useGlobalState,
  setGlobalState,
  truncate,
  setLoadingMsg,
  setAlert,
} from "../../store";
import { buyNFT } from "../../Blockchain.services";

export default function ShowNFT() {
  const [showModal] = useGlobalState("showModal");
  const [nft] = useGlobalState("nft");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const closeModal = () => {
    setGlobalState("showModal", "scale-0");
  };

  const opemUpdateNFTHandler = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-0");
    setGlobalState("updateModal", "scale-100");
  };

  const handlePurchase = async () => {
    try {
      setLoadingMsg("Purchasing, awaiting MetaMask approval...");
      await buyNFT(nft);
      setAlert("NFT purchased");
      window.location.reload();
    } catch (err) {
      console.log("Error purchasing", err);
      setAlert("Purchase failed", "red");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${showModal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold">Buy NFT</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-40 w-40">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-semibold">{nft?.title}</h4>
            <p className="text-gray-400 text-xs my-1">{nft?.description}</p>
            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicon
                  className="h-10 w-10 object-contain rounded-full mr-3"
                  string={nft?.owner}
                  size={50}
                />
                <div className="flex flex-col justify-center items-start">
                  <small className="font-bold">@Owner</small>
                  <small className="text-pink-800 font-semibold">
                    {truncate(nft?.owner || "", 4, 4, 11)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft?.cost} ETH</p>
              </div>
            </div>
          </div>
          {connectedAccount === nft?.owner ? (
            <button
              onClick={opemUpdateNFTHandler}
              className="flex justify-center items-center w-full mt-5 p-2 text-white shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s]"
            >
              Change Price
            </button>
          ) : (
            <div
              className="flex justify-between items-center space-x-2"
              onClick={handlePurchase}
            >
              <button className="flex justify-center items-center w-full mt-5 p-2 text-white shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s]">
                Purchase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
