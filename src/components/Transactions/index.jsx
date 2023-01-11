import React, { useState, useEffect, useCallback } from "react";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import artPreview from "../../assets/art-preview.jpg";
import { truncate, useGlobalState } from "../../store";

const Transaction = ({ tx }) => {
  return (
    <div className="flex justify-between items-center border border-pink-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <div className="rounded-md shadow-sm shadow-pink-500 p-2">
        <BiTransfer />
      </div>
      <div>
        <h4 className="text-sm">NFT Transfered</h4>
        <small className="flex justify-start items-center">
          <span className="mr-1">Received by</span>
          <a className="text-pink-500 mr-2" href="#" target="_blank">
            {truncate(tx.owner || "", 4, 4, 11)}
          </a>
          <span>
            <MdOpenInNew />
          </span>
        </small>
      </div>
      <p className="text-sm font-medium">{tx.cost} ETH</p>
    </div>
  );
};

export default function Transactions() {
  const [transactions] = useGlobalState("transactions");
  const [end, setEnd] = useState(3);
  const [count, setCount] = useState(3);
  const [collection, setCollection] = useState([]);

  const getCollection = useCallback(() => {
    return transactions.slice(0, end);
  }, [transactions, end]);

  const loadMore = () => {
    setEnd(end + count);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [getCollection]);

  return (
    <div className="bg-[#151c25]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl text-gradient font-bold uppercase">
          {collection.length > 0 ? "Latest Transactions" : "No Transactions"}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-2 py-2.5 gaps-2">
          {collection.map((tx, i) => {
            return <Transaction key={i} tx={tx} />;
          })}
        </div>
        {collection.length > 0 && transactions.length > collection.length && (
          <div className="text-center my-5">
            <button
              onClick={loadMore}
              className="text-white shadow-lg shadow-black text-sm bg-[#e32970] hover:bg-[#bd366f] rounded-full transition-[0.2s] px-1.5 py-2"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
