import React, {useEffect, useState} from "react";
import ReputationSystemArtifact from "../contracts-abi/ReputationSystem.json";
import ReputationSystemAddress from "../contracts-abi/ReputationSystem_address.json";
import { publicProvider } from 'wagmi/providers/public'
import ContractType from '../types/contracts/ReputationSystem'
import { ethers } from "ethers";

const Web3Context = React.createContext({
    contract: null,

    initContract: () => {},
});

export const Web3ContextProvider = (props) => {
  const [contract, setContract] = useState(null);

  const initContract = () => {
      //const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/PBXduGax6Cm6R6hOmwO7aE9zPSqR2yoR');
      //const signer = provider.getSigner();
      
      const ethersContract = new ethers.Contract(
        ReputationSystemAddress.Contract,
        ReputationSystemArtifact,
        publicProvider()
      ) as ContractType;
      console.log({ ethersContract });
      setContract(ethersContract);
  }

  return (
        <Web3Context.Provider
            value={{
                contract,
                initContract,
            }}>
            {props.children}
        </Web3Context.Provider>
    )
}

export default Web3Context;