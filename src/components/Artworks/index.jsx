import React from "react";
import artPreview from "../../assets/art-preview.jpg";
import { setGlobalState } from "../../store";

const Card = ({ nft }) => {
  const openDetails = () => {
    setGlobalState("showModal", "scale-100");
  };
  return (
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <img
        src={artPreview}
        alt="NFT Image"
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
      />
      <h4 className="text-white font-semibold">NFT #{nft}</h4>
      <p className="text-gray-400 text-sm my-1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque nobis
        architecto, obcaecati, vero voluptatem non placeat quod consequatur
        impedit illum beatae, iure sed deleniti alias consequuntur. Quo placeat
        ratione illo.
      </p>
      <div className="flex justify-between items-center mt-3 text-white">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="font-sm font-semibold">0.34 ETH</p>
        </div>
        <button
          onClick={openDetails}
          className="shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s] px-1.5 py-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default function Artworks() {
  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          Latest Artworks
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {Array(4)
            .fill()
            .map((nft, i) => {
              return (
                <Card nft={i + 1} key={i}>
                  Component
                </Card>
              );
            })}
        </div>
        <div className="text-center my-5">
          <button className="text-white shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s] px-1.5 py-2">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}
