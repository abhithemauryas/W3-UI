import { copyToClipboard } from 'helpers/copyToClipboard';
import { formatWalletAddress, getCurrentColor } from 'helpers/Utils';
import { useEffect, useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const WalletAddressTooltip = (walletAddress, isFormatted) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [darktheme, setDarkTheme] = useState(false);
  const color = getCurrentColor();

  useEffect(() => {
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, [color]);

  const handleCopyWalletAddress = () => {
    copyToClipboard(walletAddress);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };
  const iconClassName = darktheme ? 'icon-white' : 'icon-black';
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="mr-1">
        <span id="wallet-address-tooltip">
          {isFormatted ? formatWalletAddress(walletAddress) : walletAddress}
        </span>
        <Button
          type="button"
          onClick={handleCopyWalletAddress}
          className="p-0 border-0"
          style={{ background: 'transparent' }}
        >
          <span className={`iconsminds-files ml-1 ${iconClassName}`} />
          {isCopied && (
            <Tooltip
              placement="top"
              isOpen={isCopied}
              target="wallet-address-tooltip"
              toggle={() => setIsCopied(false)}
            >
              Copied
            </Tooltip>
          )}
        </Button>

        {isFormatted && (
          <Tooltip
            placement="top"
            isOpen={tooltipOpen && !isCopied}
            target="wallet-address-tooltip"
            toggle={() => setTooltipOpen(!tooltipOpen)}
          >
            {walletAddress}
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default WalletAddressTooltip;
