import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Footer from 'containers/navs/Footer';
import Sidebar from 'containers/navs/Sidebar';
import TopNav from 'containers/navs/Topnav';

const AppLayout = ({ containerClassnames, children, history }) => {
  // Import custom sidebar CSS for scroll and responsive
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
