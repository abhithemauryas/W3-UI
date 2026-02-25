import { Card, CardBody } from 'reactstrap';

const SmallCard = ({ title, value }) => {
  return (
    <Card>
      <CardBody className="d-flex justify-content-between align-items-center">
        <div className="mb-0">{title}</div>
        <div>{value}</div>
      </CardBody>
    </Card>
  );
};

export default SmallCard;
