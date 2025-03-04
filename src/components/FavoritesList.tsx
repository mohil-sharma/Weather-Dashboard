import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Star, GripVertical, X } from 'lucide-react';
import { FavoriteCity } from '../types';

interface FavoritesListProps {
  favorites: FavoriteCity[];
  onReorder: (newOrder: FavoriteCity[]) => void;
  onSelect: (city: string) => void;
  onRemove: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onReorder,
  onSelect,
  onRemove,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center transition-colors">
        <Star className="text-yellow-500 mx-auto mb-2" size={24} />
        <p className="text-gray-600 dark:text-gray-300">No favorite cities yet. Search for a city and add it to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
      <h3 className="text-lg font-semibold mb-3 flex items-center dark:text-white">
        <Star className="text-yellow-500 mr-2 flex-shrink-0" size={18} />
        Favorite Cities
      </h3>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {favorites.map((city, index) => (
                <Draggable key={city.id} draggableId={city.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div
                          {...provided.dragHandleProps}
                          className="mr-2 cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                        >
                          <GripVertical size={16} />
                        </div>
                        <button
                          onClick={() => onSelect(city.name)}
                          className="flex-1 text-left px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors dark:text-white truncate"
                        >
                          {city.name}
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(city.id)}
                        className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FavoritesList;