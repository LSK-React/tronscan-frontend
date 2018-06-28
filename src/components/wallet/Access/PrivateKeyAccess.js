import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {trim} from "lodash";
import {tu} from "../../../utils/i18n";
import {loadWalletWithPrivateKey} from "../../../actions/wallet";

class PrivateKeyAccess extends Component {

  constructor() {
    super();

    this.state = {
      privateKey: "",
    }
  }

  isKeyValid = () => {
    let {privateKey} = this.state;

    if (!privateKey || privateKey.length === 0) {
      return false;
    }

    if (privateKey.length !== 64) {
      return false;
    }

    return true;
  };

  login = () => {
    let {privateKey} = this.state;
    let {history} = this.props;
    this.props.loadWalletWithPrivateKey(privateKey);

    history.push("/account");
  };

  render() {

    return (
      <div className="text-center p-3 mx-auto mt-5" style={{ maxWidth: '400px' }}>
        {/*<h2>{tu("private_key")}</h2>*/}
        <div className="text-muted text-center">
          Open a wallet with the private key
        </div>
        <div className="form-group text-center mt-3">
          <input
            type="text"
            className="form-control text-center"
            onChange={ev => this.setState({ privateKey: ev.target.value })}
            placeholder="Private Key"/>
        </div>
        <button className="btn btn-success"
                disabled={!this.isKeyValid()}
                onClick={this.login}>
          {tu("open_wallet")}
        </button>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
  loadWalletWithPrivateKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateKeyAccess));