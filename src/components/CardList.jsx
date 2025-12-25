import { Card } from './Card';

export function CardList({ cards }) {
  return (
    <div className="cards">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          isPinned={card.isPinned}
        />
      ))}
    </div>
  );
}
