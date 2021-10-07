import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { nftaddress, nftmarketaddress } from "../config";
var nft2 = require("/public/nft2.jpg");
var nft3 = require("/public/nft3.jpg");
var nft4 = require("/public/nft4.jpg");
var nft5 = require("/public/nft5.jpg");
var nft6 = require("/public/nft6.jpg");
var nft7 = require("/public/nft7.jpg");

const nft = [
  {
    name: "CryptoPunk",
    image: nft2,
    price: "0.55",
  },
  {
    name: "Quiet of Nature",
    image: nft3,
    price: "0.33",
  },
  {
    name: "LOOKS RARE",
    image: nft4,
    price: "1.20",
  },
  {
    name: "Don't",
    image: nft5,
    price: "0.45",
  },
  {
    name: "Peace from Mind",
    image: nft6,
    price: "0.60",
  },
  {
    name: "nullius in verba",
    image: nft7,
    price: "0.85",
  },
];

export default function MarketPlace() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.matic.today"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="bg-gray-100">
      <Header />
      <h1 className="p-5 mt-16 font-serif text-4xl text-gray-800">
        Primary Marketplace
      </h1>
      <h1 className="px-5 pb-5 font-serif text-lg text-gray-800">
        Discover rare artworks by world class artists.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {nft.map((nft, i) => (
          <Card key={i} image={nft.image} name={nft.name} price={nft.price} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
