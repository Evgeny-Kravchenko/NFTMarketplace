import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "./store";
import abi from "./abis/TimelessNFT.json";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (connectedAccount) {
    const web3 = window.web3;
    // Get network id
    const networkId = await web3.eth.net.getId();
    // Get network data by id
    const networkData = abi.networks[networkId];

    if (networkData) {
      // create a contract and return it
      const contract = new web3.eth.Contract(abi.abi, networkData.address);
      return contract;
    }
    return null;
  }
  // Return a contract from global state
  return getGlobalState("contract");
};

const connectWallet = async () => {
  try {
    // If there is no ethereum object as a user to install Metamask
    if (!ethereum) {
      return alert("Please install metamask");
    }
    // Otherwise receive all accaounts as an array from the ethereum object
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    // Set an account to the global state
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (err) {
    reportError(err);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) {
      return alert("Please install metamask");
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("accountsChanged", async (tratata) => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWalletConnected();
    });

    window.ethereum.on("chainChanged", async (chainId) => {
      window.location.reload();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      alert("Please connect a wallet");
      console.log("No ethereum accounts!");
    }
  } catch (err) {
    reportError(err);
  }
};

const mintNFT = async ({ title, description, metadataURI, price }) => {
  try {
    price = window.web3.utils.toWei(price.toString(), "ether");
    const contract = await getEthereumContract();
    const account = getGlobalState("connectedAccount");
    const mintPrice = window.web3.utils.toWei("0.01", "ether");

    await contract.methods
      .payToMint(title, description, metadataURI, price)
      .send({ from: account, value: mintPrice });

    return true;
  } catch (err) {
    reportError(err);
  }
};

const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const account = getGlobalState("connectedAccount");
    await contract.methods
      .changePrice(Number(id), cost)
      .send({ from: account });
  } catch (err) {
    reportError(err);
  }
};

const getAllNFTs = async () => {
  try {
    if (!ethereum) {
      return alert("Please install metamask");
    }
    const contract = await getEthereumContract();
    const nfts = await contract.methods.getAllNFTs().call();
    const transactions = await contract.methods.getAllTransactions().call();
    setGlobalState("nfts", structuredNFTs(nfts));
    setGlobalState("transactions", structuredNFTs(transactions));
  } catch (err) {
    reportError(err);
  }
};

const structuredNFTs = (nfts) =>
  nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      timestamp: nft.timestamp,
      metadataURI: nft.metadataURI,
    }))
    .reverse();

const buyNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), "ether");
    const contract = await getEthereumContract();
    const connectedAccount = getGlobalState("connectedAccount");
    await contract.methods
      .payToBuy(Number(id))
      .send({ from: connectedAccount, value: cost });
  } catch (err) {
    reportError(err);
  }
};

const reportError = async (error) => {
  console.log(error);
  setAlert(JSON.stringify(error, "red"));
  throw new Error("No ethereum object");
};

export {
  connectWallet,
  isWalletConnected,
  mintNFT,
  getAllNFTs,
  updateNFT,
  buyNFT,
};
