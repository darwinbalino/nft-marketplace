import axios from "axios";
import { ethers } from "ethers";
import Head from "next/head";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Card from "../components/Card";
import Filler from "../components/Filler";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { nftaddress, nftmarketaddress } from "../config";

export default function Home() {
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

  // if (loadingState === "loaded" && !nfts.length)
  //   return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="min-h-screen overflow-x-hidden ">
      <Head>
        <title>KnownOrigin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {nfts.map((nft, i) => (
          <Card key={i} image={nft.image} name={nft.name} price={nft.price} />
        ))}
      </div>
      <Filler />
      <Footer />
    </div>
  );
}
