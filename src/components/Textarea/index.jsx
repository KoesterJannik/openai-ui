import React, { forwardRef, useState } from 'react'
import { classnames } from '../utils';
import Proptypes from 'prop-types'
import { Button } from '../Button';
import styles from './textarea.module.less'

export const Textarea = forwardRef((props, ref) => {
  const {
    onChange,
    placeholder,
    className,
    showClear,
    disable,
    children,
    rows,
    maxHeight,
    value,
    defaultValue,
    onClear,
    ...rest
  } = props;

  const [height, setHeight] = useState('auto')

  function handleChange(event) {
    setHeight('auto');
    setHeight(`${event.target.scrollHeight}px`);
    onChange && onChange(event.target.value);
  }
  function handleClear() {
    onChange && onChange("");
    onClear && onClear();
  }

  return (
    <div className={classnames(styles.textarea_box, className)}>
      <div className={styles.inner}>
        <textarea
          ref={ref}
          rows={rows}
          style={{ height }}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.textarea}
          value={value}
          {...rest}
        />
      </div>
      {showClear && <Button className={styles.clear} type="icon" onClick={handleClear} icon="cancel" />}
    </div>
  );
});

Textarea.defaultProps = {
  showClear: false,
  disable: false,
  defaultValue: '',
  maxHeight: 200,
  placeholder: '',
  rows: '1',
};

Textarea.propTypes = {
  showClear: Proptypes.bool,
  onClear: Proptypes.func,
  className: Proptypes.string,
  onChange: Proptypes.func,
  disable: Proptypes.bool,
  placeholder: Proptypes.string,
  maxHeight: Proptypes.number,
  rows: Proptypes.string,
}
