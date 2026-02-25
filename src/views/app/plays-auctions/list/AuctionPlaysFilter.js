/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import ApplicationMenu from 'components/common/ApplicationMenu';
import { Colxx } from 'components/common/CustomBootstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { NavItem } from 'reactstrap';

const ACTIVE_PLAYER = 'ACTIVE_PLAYER';
const IN_ACTIVE_PLAYER = 'IN_ACTIVE_PLAYER';
const ALL_PLAYER = 'ALL_PLAYER';

const SurveyApplicationMenu = ({ initialPlayersData, setPlayers }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (selectedOptions.length) {
      const playersInCountry = [];
      for (let i = 0; i < selectedOptions.length; i += 1) {
        const countryName = selectedOptions[i].label;

        // Iterate over the player array and filter players based on country
        for (let j = 0; j < initialPlayersData.length; j += 1) {
          if (initialPlayersData[j].country === countryName) {
            playersInCountry.push(initialPlayersData[j]);
          }
        }
      }
      setPlayers(playersInCountry);
    } else setPlayers(initialPlayersData);
  }, [selectedOptions]);
  const inActivePlayer = initialPlayersData.filter(
    (player) => player.isActive === false
  );
  const activePlayer = initialPlayersData.filter(
    (player) => player.isActive === true
  );
  const filterActivePlayer = function (value) {
    switch (value) {
      case ACTIVE_PLAYER:
        setPlayers(activePlayer);
        break;
      case IN_ACTIVE_PLAYER:
        setPlayers(inActivePlayer);
        break;
      case ALL_PLAYER:
        setPlayers(initialPlayersData);
        break;
      default:
        setPlayers(initialPlayersData);
        break;
    }
  };

  const selectData = [];
  initialPlayersData.map((player) => {
    const value = selectData.reduce((accumulator, currentValue) => {
      if (currentValue.label === player.country) accumulator += 1;
      return accumulator;
    }, 0);
    if (!value)
      selectData.push({ label: player.country, value: player.country });
    return '';
  });

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <p className="text-muted text-small">Active Players</p>
          <ul className="list-unstyled mb-5">
            <NavItem className="">
              <NavLink
                to="#"
                location={{}}
                onClick={() => filterActivePlayer(ALL_PLAYER)}
              >
                <i className="simple-icon-reload" />
                <span>All Players</span>
                <span className="float-right">{initialPlayersData.length}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="#"
                location={{}}
                onClick={() => filterActivePlayer(ACTIVE_PLAYER)}
              >
                <i className="simple-icon-check" />
                <span>Active Players</span>
                <span className="float-right">{activePlayer.length}</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="#"
                location={{}}
                onClick={() => filterActivePlayer(IN_ACTIVE_PLAYER)}
              >
                <i className="simple-icon-close" />
                <span>InActive Players</span>
                <span className="float-right">{inActivePlayer.length}</span>
              </NavLink>
            </NavItem>
          </ul>
          <p className="text-muted text-small">Country</p>
          <Colxx>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              isMulti
              name="form-field-name"
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={selectData}
            />
          </Colxx>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyApplicationMenu;
