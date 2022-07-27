import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import './list.scss';

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const handleClick = (e) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (e === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (e === 'right' && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.tile}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined className="slideArrow left" onClick={() => handleClick('left')} style={{ display: !isMoved && 'none' }} />
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItem index={index} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined className="slideArrow right" onClick={() => handleClick('right')} />
      </div>
    </div>
  );
}
