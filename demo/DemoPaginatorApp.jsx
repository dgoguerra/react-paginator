var React = require('react');
var Paginator = require('react-laravel-paginator');
var sprintf = require("sprintf-js").sprintf;
var faker = require('faker/locale/en');


function snapToRange(num, min, max) {
    return Math.max(min, Math.min(num, max));
}


var DemoStore = function() {};

DemoStore.setCurrentPage = function(num) {
    num = Number(num);

    if (isNaN(num)) {

    }

    this.currentPage = num;
};

DemoStore.getCurrentPage = function(num) {
    return this.currentPage;
};

DemoStore.setPageLength = function(num) {
    this.pageLength = num;
};

DemoStore.getPageLength = function(num) {
    return this.pageLength;
};

DemoStore.getNumPages = function(num) {
    return Math.ceil(this.items.length / this.pageLength);
};

DemoStore.generateItems = function(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push({
            id: i+1,
            name: faker.name.findName(),
            email: faker.internet.email()
        });
    }
    this.items = arr;
};

DemoStore.getItems = function() {
    return this.items;
};

DemoStore.getCurrentPageItems = function() {
    var offset = this.pageLength * (this.currentPage - 1);
    return this.items.slice(offset, offset + this.pageLength);
};


var App = React.createClass({
    getInitialState: function() {
        return {
            pageNum: DemoStore.getCurrentPage(),
            numItems: DemoStore.getItems().length
        };
    },
    onChangePageEvent: function(evt) {
        var num = evt.target.value;
        var filtered = /^[0-9]*$/.test(num) ? num : this.state.pageNum;
        this.setState({ pageNum: filtered });
    },
    onUpdatePageEvent: function(evt) {
        this._updatePage(this.state.pageNum);
    },
    onUpdatePage: function(num) {
        this._updatePage(num);
    },
    _updatePage: function(num) {
        var validated = snapToRange(num, 1, DemoStore.getNumPages());

        if (validated == DemoStore.getCurrentPage()) {
            return;
        }

        DemoStore.setCurrentPage(validated);
        this.setState({
            pageNum: DemoStore.getCurrentPage(),
            numItems: DemoStore.getItems().length
        });
    },
    onChangeNumUsersEvent: function(evt) {
        var num = evt.target.value;
        var filtered = /^[0-9]*$/.test(num) ? num : this.state.numItems;
        this.setState({ numItems: filtered });
    },
    onUpdateNumUsersEvent: function(evt) {
        var validated = Math.max(0, this.state.numItems);

        if (validated == DemoStore.getItems().length) {
            return;
        }

        DemoStore.setCurrentPage(1);
        DemoStore.generateItems(validated);
        this.setState({
            pageNum: DemoStore.getCurrentPage(),
            numItems: DemoStore.getItems().length
        });
    },
    renderUsersTable: function(users) {
        return (
            <table className="table table-condensed table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(function(user) {
                        return (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    },
    render: function() {
        var code = sprintf(
            "<Paginator\n  currPage={%s}\n  lastPage={%s}\n  onChange={/* function */}\n/>",
            DemoStore.getCurrentPage(),
            DemoStore.getNumPages()
        );

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h2>Demo</h2>
                    <p>The <code>Paginator</code> component provides a general, unopinionated way of
                    showing the pagination of a set of elements in ReactJS, using Bootstrap's
                    pagination component.</p>
                    <p>It receives the current and maximum page number as parameters, and a callback
                    to inform when another page was selected in the paginator.</p>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="form-group">
                        <label>Change current page:</label>
                        <input type="text" className="form-control" value={this.state.pageNum}
                            onChange={this.onChangePageEvent} onBlur={this.onUpdatePageEvent} />
                    </div>
                    <div className="form-group">
                        <label>Change number of items:</label>
                        <input type="text" className="form-control" value={this.state.numItems}
                            onChange={this.onChangeNumUsersEvent} onBlur={this.onUpdateNumUsersEvent} />
                    </div>
                    <label>Paginator component arguments:</label>
                    <pre><code>{code}</code></pre>
                </div>
                <div className="col-sm-12 col-md-8">
                    <div style={{height: '190px'}}>
                        {this.renderUsersTable(DemoStore.getCurrentPageItems())}
                    </div>
                    <Paginator
                        currPage={DemoStore.getCurrentPage()}
                        lastPage={DemoStore.getNumPages()}
                        onChange={this.onUpdatePage} />
                </div>
            </div>
        );
    }
});

exports.renderApp = function(containerId) {
    DemoStore.setCurrentPage(1);
    DemoStore.setPageLength(5);
    // create 16 pages of items initially. Leave last page half full
    DemoStore.generateItems(DemoStore.getPageLength() * 16 - 4);

    React.render(<App/>, containerId);
};
