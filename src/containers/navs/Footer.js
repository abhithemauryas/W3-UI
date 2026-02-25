import { Colxx } from 'components/common/CustomBootstrap';
import { Row } from 'reactstrap';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted ml-2">AuctionX {year}</p>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
