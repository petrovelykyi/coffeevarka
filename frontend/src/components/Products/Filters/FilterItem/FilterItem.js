import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MDBInput } from 'mdbreact';
import { ReactComponent as ChevronDown } from '../../../../images/catalog/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../../images/catalog/chevron-up.svg';

import './FilterItem.scss';

const FilterItem = ({ item, onFilterChange }) => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggleCollapse = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      <div role="presentation" className="filter__item-header" onClick={toggleCollapse}>
        <h6 className="filter__item-name font-weight-bold mb-0">{item.name}</h6>
        {state.collapsed ? <ChevronDown className="filter__item-chevron mb-2" />
          : <ChevronUp className="filter__item-chevron mb-2" />}
      </div>
      <div className={`filter__item-body ${state.collapsed ? 'collapsed' : ''}`}>

        {item.children.map((child) => (
          <MDBInput
            type="checkbox"
            key={child._id}
            id={child._id}
            data-parent={child.parent}
            label={child.name}
            checked={child.checked}
            onChange={onFilterChange}
            containerClass="filter__item-label"
          />
        ))}
      </div>
    </div>
  );
};

FilterItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    filter_name: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterItem;
