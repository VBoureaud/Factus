import { useState } from "react";
import { Button } from "@chakra-ui/react";

import RegisterNostrKeyComponent from "../components/ContractMethods/registerNostrKey";

const Settings = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '20px' }}>Settings</h2>
      <RegisterNostrKeyComponent />
    </div>
  );
};

export default Settings;
