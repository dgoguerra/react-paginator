var React = require('react');
var Paginator = require('../Paginator.jsx');

var App = React.createClass({
    getInitialState: function() {
        return { currPage: 2, lastPage: 10 };
    },
    changeCurrPage: function(currPage) {
        this.setState({ currPage: currPage });
    },
    changeCurrPageEvent: function(evt) {
        this.changeCurrPage(evt.target.value);
    },
    onChangePagesNumEvent: function(evt) {
        var numPages = evt.target.value;
        this.setState({
            currPage: Math.max(this.state.currPage, numPages),
            lastPage: numPages
        });
    },
    render: function() {
        console.log(this.state);
        return (
            <div>
                <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                        <label>Current page:</label>
                        <input type="text" className="form-control" value={this.state.currPage} onChange={this.changeCurrPageEvent} />
                    </div>
                    <div className="form-group">
                        <label>Number of pages:</label>
                        <input type="text" className="form-control" value={this.state.lastPage} onChange={this.onChangePagesNumEvent} />
                    </div>
                </div>
                <div className="col-xs-12">
                    <Paginator currPage={this.state.currPage} lastPage={this.state.lastPage} onChange={this.changeCurrPage} />
                </div>
            </div>
        );
    }
});

exports.renderApp = function(containerId) {
    React.render(<App/>, containerId);
};
