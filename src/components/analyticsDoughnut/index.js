import { ThemeColors } from 'helpers/ThemeColors';
import { formatter } from 'helpers/Utils';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Doughnut from './Doughnut';

const colors = ThemeColors();

// const MEDIA_OPTIONS = {
//   USD: 'USD',
//   INR: 'INR',
// };

const AnalyticsDoughnut = ({
  title,
  height,
  width,
  playsInAuction,
  playRefunded,
  playInRegistration,
  // profitInCurrency,
  profitInPlays,
  // currencyCode,
}) => {
  const getDoughnutChartData = (totalPlayInLive, totalPlayInUpcoming) => {
    if (totalPlayInLive > totalPlayInUpcoming) {
      return {
        labels: ['Plays in Auction', 'Plays Refunded', 'Plays in Registration'],
        datasets: [
          {
            label: '',
            // borderColor: [
            //   colors.greenForest,
            //   colors.redColor,
            //   colors.greenColor,
            // ],
            backgroundColor: [
              colors.themeColor2,
              colors.redColor,
              colors.greenColor,
            ],
            borderWidth: 2,
            data: [playsInAuction, playRefunded, playInRegistration],
          },
        ],
      };
    }
    return {
      labels: ['Plays in Auction', 'Plays Refunded', 'Plays in Registration'],
      datasets: [
        {
          label: '',
          // borderColor: [colors.greenColor, colors.redColor, colors.greenForest],
          backgroundColor: [
            colors.greenColor,
            colors.redColor,
            colors.themeColor2,
          ],
          borderWidth: 2,
          data: [playsInAuction, playRefunded, playInRegistration],
        },
      ],
    };
  };
  return (
    <Card className="h-100 ">
      <div className="d-flex">
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <div style={{ height: `${height}px`, width: `${width}px` }}>
            <Doughnut
              shadow
              data={getDoughnutChartData(playsInAuction, playInRegistration)}
            />
          </div>
        </CardBody>
        <CardBody className="text-center d-flex flex-column justify-content-around align-items-center">
          <div>
            <i className="iconsminds-gamepad-2 text-large " />
            <p className="card-text font-weight-semibold mb-0 ">
              Total Profit in XPs
            </p>
            <p className="lead text-center">
              {formatter.format(profitInPlays)}
            </p>
          </div>
          <div>
            <i className="iconsminds-coins text-large" />
            <p className="card-text font-weight-semibold mb-0 ">Total Profit</p>
            <p className="lead text-center">
              {formatter.format(profitInPlays)}
            </p>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default AnalyticsDoughnut;
