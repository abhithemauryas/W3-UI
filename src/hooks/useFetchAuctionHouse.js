import { convertToDropdownData } from 'helpers/Utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuctionHouse,
  getAuctionHouseForDropdown,
} from 'redux/auctionHouse/actions.auctionHouse';

const useFetchAuctionHouse = () => {
  const dispatch = useDispatch();
  const auctionHouseData = useSelector(
    (state) => state.auctionHouses.auctionHouseData
  );
  const auctionHouseDropdownData = useSelector(
    (state) => state.auctionHouses.auctionHouseDropdownData
  );

  useEffect(() => {
    dispatch(getAuctionHouse());
    dispatch(getAuctionHouseForDropdown());
  }, [dispatch]);
  // Use dropdown data if available, otherwise convert from auctionHouseData
  const auctionHouseDropdownList =
    auctionHouseDropdownData && auctionHouseDropdownData.length > 0
      ? convertToDropdownData(auctionHouseDropdownData, 'name', 'id')
      : convertToDropdownData(auctionHouseData, 'name', 'id');

  return {
    auctionHouseData,
    auctionHouseDropdownList,
  };
};

export default useFetchAuctionHouse;
