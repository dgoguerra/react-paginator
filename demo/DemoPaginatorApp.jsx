var React = require('react');
var Paginator = require('../Paginator.jsx');

var sprintf = require("sprintf-js").sprintf;

var App = React.createClass({
    getInitialState: function() {
        return { currPage: 2, lastPage: 10 };
    },
    changeCurrPage: function(currPage) {
        this.setState({ currPage: currPage });
    },
    changeCurrPageEvent: function(evt) {
        var currPage = Number(evt.target.value);
        this.setState({
            currPage: Math.min(currPage, this.state.lastPage)
        });
    },
    onChangePagesNumEvent: function(evt) {
        var numPages = Number(evt.target.value);
        this.setState({
            currPage: Math.min(numPages, this.state.currPage),
            lastPage: numPages
        });
    },
    render: function() {
        var code = sprintf(
            "<Paginator currPage={%s} lastPage={%s} onChange={/* function */} />",
            this.state.currPage,
            this.state.lastPage
        );

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1>Demo</h1>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                        <label>Current page:</label>
                        <input type="text" className="form-control" value={this.state.currPage}
                            onChange={this.changeCurrPageEvent} />
                    </div>
                    <div className="form-group">
                        <label>Number of pages:</label>
                        <input type="text" className="form-control" value={this.state.lastPage}
                            onChange={this.onChangePagesNumEvent} />
                    </div>
                </div>
                <div className="col-sm-12 col-md-8">
                    <label>The component arguments are: </label>
                    <pre><code>{code}</code></pre>
                </div>
                <div className="col-xs-12">
                    <Paginator currPage={this.state.currPage} lastPage={this.state.lastPage}
                        onChange={this.changeCurrPage} />
                </div>
            </div>
        );
    }
});

exports.renderApp = function(containerId) {
    React.render(<App/>, containerId);
};
