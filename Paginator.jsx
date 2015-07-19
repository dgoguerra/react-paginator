'use strict';

var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');

var Paginator = React.createClass({
    propTypes: {
        currPage: React.PropTypes.number.isRequired,
        lastPage: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    previousPageClicked: function() {
        if (this.props.currPage != 1) {
            this.props.onChange(this.props.currPage-1);
        }
    },
    nextPageClicked: function() {
        if (this.props.currPage != this.props.lastPage) {
            this.props.onChange(this.props.currPage+1);
        }
    },
    pageClicked: function(pageNum) {
        this.props.onChange(pageNum);
    },
    renderPrevious: function() {
        var classStr = classNames({ disabled: this.props.currPage == 1 });
        return <li key="prev" className={classStr}><a rel="prev" onClick={this.previousPageClicked}>«</a></li>;
    },
    renderNext: function() {
        var classStr = classNames({ disabled: this.props.currPage == this.props.lastPage });
        return <li key="next" className={classStr}><a rel="next" onClick={this.nextPageClicked}>»</a></li>;
    },
    renderDots: function(key) {
        return <li key={key} className="disabled"><span>...</span></li>;
    },
    renderRange: function(firstNum, lastNum) {
        var pages = [];
        for (var i = firstNum; i <= lastNum; i++) {
            if (this.props.currPage == i) {
                pages.push(<li key={i} className="active"><span>{i}</span></li>);
            }
            else {
                pages.push(<li key={i}><a onClick={_.partial(this.pageClicked, i)}>{i}</a></li>);
            }
        }

        return pages;
    },
    renderStart: function() {
        var pages = this.renderRange(1, 2);
        pages.push(this.renderDots('dots-start'));

        return pages;
    },
    renderFinish: function() {
        var pages = this.renderRange(this.props.lastPage-1, this.props.lastPage);
        pages.unshift(this.renderDots('dots-finish'));

        return pages;
    },
    renderAdjacentRange: function() {
        return this.renderRange(this.props.currPage-2, this.props.currPage+2);
    },
    renderSlider: function() {
        var sliderNum = 6;
        var buttons = [];

        if (this.props.currPage <= sliderNum) {
            buttons = buttons.concat(this.renderRange(1, sliderNum+2));
            buttons = buttons.concat(this.renderFinish());
        }

        else if (this.props.currPage >= this.props.lastPage - sliderNum) {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderRange(this.props.lastPage-sliderNum, this.props.lastPage));
        }

        else {
            buttons = buttons.concat(this.renderStart());
            buttons = buttons.concat(this.renderAdjacentRange());
            buttons = buttons.concat(this.renderFinish());
        }

        return buttons;
    },
    render: function() {
        var buttons = [];

        buttons.push(this.renderPrevious());

        if (this.props.lastPage <= 13) {
            buttons = buttons.concat(this.renderRange(1, this.props.lastPage));
        }
        else {
            buttons = buttons.concat(this.renderSlider());
        }

        buttons.push(this.renderNext());
        return (
            <div className="text-center">
                <ul className="pagination">
                    {buttons}
                </ul>
            </div>
        );
    }
});

module.exports = Paginator;
