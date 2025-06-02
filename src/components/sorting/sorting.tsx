import { useState } from 'react';
import { SortBy } from '../../const';
import { useAppSelector } from '../../store/hooks';
import classNames from 'classnames';

type Sorting = {
  onChange: (sort: string) => void;
}

export default function Sorting({ onChange }: Sorting) {
  const activeSort = useAppSelector((state) => state.DATA.activeSort);
  const [isActiveClass, setActiveClass] = useState(false);

  function handleSortMouse() {
    setActiveClass((isActive) => !isActive);
  }

  const classNameForUl = classNames('places__options places__options--custom', {
    'places__options--opened': isActiveClass
  });
  const classNameForLi = classNames('places__option', {
    'places__option--active': activeSort
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by &nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortMouse}>
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNameForUl}>
        {Object.values(SortBy).map((sort, index) => (
          <li key={sort}
            className={classNameForLi}
            tabIndex={index}
            onClick={() => {
              onChange(sort);
              handleSortMouse();
            }}
          >
            {sort}
          </li>))}
      </ul>
    </form>
  );
}
