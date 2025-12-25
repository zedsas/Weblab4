import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { addNote, moveNote } from './store/notesSlice';
import { Card } from './components/Card'; 
import './App.css';

function App() {
  const cards = useSelector((state) => state.notes.items);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const pinnedCards = cards.filter(c => c.isPinned);
  const unpinnedCards = cards.filter(c => !c.isPinned);

  const handleAddCard = () => {
    const trimmedTitle = title.trim() || "Неизвестен";
    const trimmedDesc = description.trim() || "Без названия";
    dispatch(addNote({ title: trimmedTitle, description: trimmedDesc }));
    setTitle('');
    setDescription('');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index + pinnedCards.length;
    const toIndex = result.destination.index + pinnedCards.length;
    
    dispatch(moveNote({ fromIndex, toIndex }));
  };
  
console.log("Данные из Redux:", cards);

  return (
    <div className="wrapper">
      <div className="top-panel">
        <div className="fields">
          <input
            className="text-input"
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCard()}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCard()}
          />
        </div>
        <button className="add-btn tooltip" data-tooltip="Добавить" onClick={handleAddCard}>
          +
        </button>
      </div>

      <div className="cards">
        {}
        {pinnedCards.map((card) => (
          <Card
            key={card.id}
            {...card}
          />
        ))}

        {}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="notes-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {unpinnedCards.map((card, index) => (
                  <Draggable 
                    key={card.id} 
                    draggableId={String(card.id)} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, marginBottom: '20px' }}
                      >
                        <Card {...card} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
