import React, { useState, useEffect, useCallback } from "react";
import artPreview from "../../assets/art-preview.jpg";
import { setGlobalState, useGlobalState } from "../../store";

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };

  return (
    <div className="flex flex-col w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <img
        src={nft.metadataURI}
        alt={nft.title}
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
      />
      <h4 className="text-white font-semibold">{nft.title}</h4>
      <p className="text-gray-400 text-sm my-1">{nft.description}</p>
      <div className="flex-grow" />
      <div className="flex justify-between items-center mt-3 text-white">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="font-sm font-semibold">{nft.cost} ETH</p>
        </div>
        <button
          onClick={setNFT}
          className="shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s] px-1.5 py-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default function Artworks() {
  const [nfts] = useGlobalState("nfts");
  const [end, setEnd] = useState(4);
  const [count, setCount] = useState(4);
  const [collection, setCollection] = useState([]);

  const getCollection = useCallback(() => {
    return nfts.slice(0, end);
  }, [nfts, end]);

  const loadMore = () => {
    setEnd(end + count);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [getCollection]);

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {collection.length > 0 ? "Latest Artworks" : "No Artworks"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {collection.map((nft, i) => {
            return (
              <Card nft={nft} key={i}>
                Component
              </Card>
            );
          })}
        </div>
        {collection.length > 0 && nfts.length > collection.length && (
          <div className="text-center my-5">
            <button
              onClick={loadMore}
              className="text-white shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s] px-1.5 py-2"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
