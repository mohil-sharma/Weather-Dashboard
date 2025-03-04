import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { formatDate, formatTemperature, getWeatherIcon, generateId } from '../utils/helpers';
import { Edit, Trash2, Save, X } from 'lucide-react';

interface WeatherJournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: JournalEntry) => void;
  onUpdateEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
  currentCity: string;
  currentTemp: number;
  currentDescription: string;
  currentIcon: string;
  unit: 'celsius' | 'fahrenheit';
}

const WeatherJournal: React.FC<WeatherJournalProps> = ({
  entries,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  currentCity,
  currentTemp,
  currentDescription,
  currentIcon,
  unit,
}) => {
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  const handleAddEntry = () => {
    if (notes.trim()) {
      const newEntry: JournalEntry = {
        id: generateId(),
        date: Math.floor(Date.now() / 1000),
        city: currentCity,
        temperature: currentTemp,
        description: currentDescription,
        notes: notes,
        icon: currentIcon,
      };
      onAddEntry(newEntry);
      setNotes('');
    }
  };

  const handleStartEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditingNotes(entry.notes);
  };

  const handleSaveEdit = (entry: JournalEntry) => {
    onUpdateEntry({
      ...entry,
      notes: editingNotes,
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Weather Journal</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold dark:text-white truncate">
              {currentCity} - {formatTemperature(currentTemp, unit)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 capitalize truncate">{currentDescription}</p>
          </div>
          <img 
            src={getWeatherIcon(currentDescription)} 
            alt={currentDescription} 
            className="w-12 h-12 flex-shrink-0 ml-2"
          />
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your weather notes here..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
        />
        
        <button
          onClick={handleAddEntry}
          disabled={!notes.trim()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Add Entry
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No journal entries yet. Add your first entry above!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center flex-wrap">
                    <p className="font-semibold dark:text-white truncate mr-2">{entry.city}</p>
                    <span className="text-gray-400 mx-1">•</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(entry.date)}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <img 
                      src={getWeatherIcon(entry.description)} 
                      alt={entry.description} 
                      className="w-8 h-8 mr-1 flex-shrink-0"
                    />
                    <p className="text-sm dark:text-gray-300 truncate">{formatTemperature(entry.temperature, unit)}, {entry.description}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 flex-shrink-0 ml-2">
                  {editingId === entry.id ? (
                    <>
                      <button 
                        onClick={() => handleSaveEdit(entry)}
                        className="p-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleStartEdit(entry)}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => onDeleteEntry(entry.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {editingId === entry.id ? (
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              ) : (
                <p className="mt-2 text-gray-700 dark:text-gray-300 break-words">{entry.notes}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeatherJournal;