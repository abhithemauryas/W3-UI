import axios from "axios";
import { useAccount, useSignMessage, useChainId } from "wagmi";
import { SiweMessage } from "siwe";

const API_BASE = "http://52.140.121.204:3000/api/v1";
const BACKEND_PROJECT_ID = "aa02cde2-ba90-4aba-9ba8-ec2d67d1dd9b";

export const useWeb3Auth = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const login = async () => {
    try {
      if (!address) {
        console.log("❌ No wallet address found");
        return;
      }

      // 1️⃣ Get nonce
      const { data: nonceResponse } = await axios.get(
        `${API_BASE}/auth/nonce`,
        {
          params: {
            address,
            projectId: BACKEND_PROJECT_ID,
          },
        }
      );

      const { nonce } = nonceResponse;

      // ✅ 2️⃣ Proper SIWE message (THIS is the real fix)
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Sign in to project ${BACKEND_PROJECT_ID}`,
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });

      const message = siweMessage.prepareMessage();

      // 3️⃣ Sign message
      const signature = await signMessageAsync({ message });

      console.log("VERIFY PAYLOAD:", {
        message,
        signature,
        projectId: BACKEND_PROJECT_ID,
      });

      // 4️⃣ Verify signature
      const { data: verifyResponse } = await axios.post(
        `${API_BASE}/auth/verify`,
        {
          message,
          signature,
          projectId: BACKEND_PROJECT_ID,
        }
      );

      const { token } = verifyResponse;

      localStorage.setItem("jwt", token);

      console.log("✅ Web3 Login Successful");
    } catch (error) {
      console.error("❌ Web3 Login Failed:", error.response?.data || error.message);
    }
  };

  return { login };
};