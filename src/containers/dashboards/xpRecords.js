/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from 'components/cards/IconCard';
import GlideComponent from 'components/carousel/GlideComponent';

const XpRecordsShow = ({ className = 'icon-cards-row', xpData }) => {
  // XP data structure - can be replaced with props or API data
  const data = [
    {
      title: 'dashboards.free-xp',
      icon: 'iconsminds-coins',
      value: xpData?.totalFreeXp || '0',
    },
    {
      title: 'dashboards.xp-bought',
      icon: 'iconsminds-add-cart',
      value: xpData?.totalXpBought || '0',
    },
    {
      title: 'dashboards.xp-spent',
      icon: 'iconsminds-arrow-refresh',
      value: xpData?.totalXpSpent || '0',
    },
    {
      title: 'dashboards.xp-remaining',
      icon: 'iconsminds-basket-coins',
      value: xpData?.totalXpRemaining || '0',
    },
    {
      title: 'dashboards.xp-utilization',
      icon: 'iconsminds-pie-chart',
      value: xpData?.xpPercentage || '0%',
    },
  ];

  return (
    <div className={className}>
      <GlideComponent
        settings={{
          gap: 5,
          perView: 4,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: true,
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={`xp_record_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </GlideComponent>
    </div>
  );
};
export default XpRecordsShow;
