import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import img1 from "../../../images/img-recieving-food.jpg";
import img2 from "../../../images/img-clean_water.jpg";
import img3 from "../../../images/img-clean-community.jpg";
import img4 from "../../../images/img-vaccine.jpg";
import img5 from "../../../images/img-reading-books.jpg";

function Cards() {
  return (
    <div className='cards'>
      <h1>See the impact we made!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src = {img1}
              text='Cooked meals feed joy'
              label='Health Care'
              path='/about'
            />
            <CardItem
              src = {img2}
              text='Clean water for everyone'
              label='Clean Water'
              path='/about'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src = {img3}
              text='Better sanitization and hygiene brings new beginnings'
              label='Community'
              path='/about'
            />
            <CardItem
              src = {img4}
              text='The double punch of malnutrition and COVID-19'
              label='Health Care'
              path='/about'
            />
            <CardItem
              src = {img5}
              text='Kids unlock their book smarts'
              label='Education'
              path='/about'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
