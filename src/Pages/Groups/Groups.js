import React from 'react';
import './Group.css'

const data = [
  {
    title: 'ASDC',
    membersCount: 6,
  }
];

const Card = ({ title, membersCount, buttonType, onJoinClick }) => (
  <div className="card">
    <div className="members">
      image
      <p className="members__count">{membersCount} members</p>
    </div>
    <p className="card__title">{title}</p>
    <p className="card__count">{membersCount} members</p>
  </div>
);

const Groups = () => {
  return (
    <div className="card-list">
      {data.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          membersCount={card.membersCount}
          buttonType={card.buttonType}
          onJoinClick={() => console.log(`Join ${card.title}`)} 
        />
      ))}
    </div>
  );
};

export default Groups;
