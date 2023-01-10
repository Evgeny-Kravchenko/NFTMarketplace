import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import artPreview from "../../assets/art-preview.jpg";
import { useGlobalState, setGlobalState } from "../../store";

export default function UpdateNFT() {
  const [price, setPrice] = useState("");

  const [modal] = useGlobalState("updateModal");

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const resetForm = () => {
    setPrice("");
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price) return;
    console.log("Updated...");
    closeModal();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold">Candy NFT</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={artPreview}
                alt="NFT"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              required
              type="number"
              className="block w-full text-sm text-slate-500 focus:outline-none focus:ring-0 rounded-xl bg-transparent border-0"
              placeholder="Price (ETH)"
              name="price"
              min={0.01}
              step={0.01}
              value={price}
              onChange={handleChangePrice}
            />
          </div>
          <button className="flex justify-center items-center w-full mt-5 p-2 text-white shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s]">
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
}
