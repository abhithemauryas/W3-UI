import React, { useEffect, useRef, useState } from "react";
import { openWeb3Modal } from "lib/web3Config";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Auth } from "hooks/useWeb3Auth";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { login } = useWeb3Auth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const shortenAddress = (addr) =>
    `${addr?.slice(0, 5)}...${addr?.slice(-4)}`;

  const handleMainClick = () => {
    if (!isConnected) {
      openWeb3Modal();
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleSwitchWallet = () => {
    setOpen(false);
    openWeb3Modal();
  };

  const handleDisconnect = () => {
  setOpen(false);
  localStorage.removeItem("jwt");
  disconnect();
};

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
  if (isConnected && address) {
    const token = localStorage.getItem("jwt");

    // only login if no token exists
    if (!token) {
      login();
    }
  }
}, [isConnected, address]);

  return (
    <nav
      style={{
        width: "100%",
        height: "85px",
        backgroundColor: "#0e2a4d",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#ffffff",
          marginRight: "auto",
        }}
      >
        ENTRY
      </div>
      {/* RIGHT */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        {/* MAIN BUTTON */}
        <button
          type="button"
          onClick={handleMainClick}
          style={{
            backgroundColor: "#4ea1ff",
            color: "#ffffff",
            border: "none",
            padding: "10px 22px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {isConnected ? shortenAddress(address) : "Connect Wallet"}
        </button>
        {/* DROPDOWN */}
        {open && isConnected && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              backgroundColor: "#0e2a4d",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              overflow: "hidden",
              minWidth: "170px",
              zIndex: 999,
            }}
          >
            <button
              type="button"
              onClick={handleSwitchWallet}
              className="dropdownItemStyle"
            >
              🔄 Switch Wallet
            </button>

            <button
              type="button"
              onClick={handleDisconnect}
               className="dropdownItemStyle"
              style={{
                
                color: "#ff6b6b",
              }}
            >
              ❌ Disconnect
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// const dropdownItemStyle = {
//   width: "100%",
//   padding: "12px 16px",
//   background: "transparent",
//   border: "none",
//   color: "#ffffff",
//   fontSize: "14px",
//   textAlign: "left",
//   cursor: "pointer",
// };

export default Navbar;
