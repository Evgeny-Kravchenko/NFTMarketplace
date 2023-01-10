import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import artPreview from "../../assets/art-preview.jpg";
import { useGlobalState, setGlobalState } from "../../store";

export default function CreateNFT() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imgBase64, setImagBase64] = useState("");

  const [modal] = useGlobalState("modal");

  const handleChangeFile = (e) => {
    setImagBase64(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const resetForm = () => {
    setFileUrl("");
    setTitle("");
    setPrice("");
    setDescription("");
    setImagBase64("");
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) return;
    console.log("Minted...");
    closeModal();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold">Add NFT</p>
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
                src={imgBase64 || artPreview}
                alt="NFT"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose Profile Photo</span>
              <input
                required
                type="file"
                accept="image/png, image/gif, image/webp"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0"
              />
            </label>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              required
              type="text"
              className="block w-full text-sm text-slate-500 focus:outline-none focus:ring-0 rounded-xl bg-transparent border-0"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
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
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              required
              type="text"
              className="block w-full text-sm text-slate-500 focus:outline-none focus:ring-0 rounded-xl bg-transparent border-0 h-20 resize-none"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
          <button className="flex justify-center items-center w-full mt-5 p-2 text-white shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s]">
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
}
