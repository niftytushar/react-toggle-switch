import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Anchor from '@trendmicro/react-anchor';
import styles from './index.styl';

class ToggleSwitch extends PureComponent {
    static propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        size: PropTypes.oneOf([
            'lg',
            'large',
            'sm',
            'small'
        ]),
        labels: PropTypes.shape({
            on: PropTypes.string,
            off: PropTypes.string
        })
    };
    static defaultProps = {
        checked: false,
        disabled: false,
        size: 'lg',
        labels: {
            on: 'Yes',
            off: 'No'
        }
    };

    state = {
        checked: this.props.checked
    };
    actions = {
        handleChange: (event) => {
            event.preventDefault();

            if (this.props.disabled) {
                return;
            }

            if (typeof this.props.onChange === 'function') {
                this.props.onChange(event);
                return;
            }

            this.setState({ checked: !this.state.checked });
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.checked !== nextProps.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }
    get checked() {
        return this.state.checked;
    }
    render() {
        const {
            className,
            disabled,
            size,
            labels,
            ...props
        } = this.props;

        delete props.checked;
        delete props.onChange;

        return (
            <Anchor
                {...props}
                className={classNames(
                    className,
                    styles.switch,
                    { [styles.switchSm]: size === 'sm' || size === 'small' },
                    { [styles.checked]: this.state.checked }
                )}
                onClick={this.actions.handleChange}
            >
                <div
                    className={classNames(
                        styles.toggle,
                        { [styles.toggleSm]: size === 'sm' || size === 'small' },
                        styles.round,
                        { [styles.disabled]: disabled }
                    )}
                >
                    <span
                        className={classNames(
                            styles.label,
                            styles.labelOn,
                            { [styles.labelSm]: size === 'sm' || size === 'small' },
                        )}
                    >
                        {labels.on}
                    </span>
                    <span
                        className={classNames(
                            styles.label,
                            styles.labelOff,
                            { [styles.labelSm]: size === 'sm' || size === 'small' },
                        )}
                    >
                        {labels.off}
                    </span>
                </div>
            </Anchor>
        );
    }
}

export default ToggleSwitch;
