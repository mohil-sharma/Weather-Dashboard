import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { JournalEntry } from '../types';
import { formatDate, formatTemperature, getWeatherIcon } from '../utils/helpers';

interface ExportButtonProps {
  entries: JournalEntry[];
  unit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark';
}

const ExportButton: React.FC<ExportButtonProps> = ({ entries, unit, theme }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (entries.length === 0) return;
    
    setIsExporting(true);
    
    try {
      // Create a temporary div to render the journal
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '20px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);
      
      // Add title
      const title = document.createElement('h1');
      title.textContent = 'Weather Journal';
      title.style.fontSize = '24px';
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '20px';
      title.style.textAlign = 'center';
      title.style.color = '#1e3a8a';
      tempDiv.appendChild(title);
      
      // Add date
      const dateElement = document.createElement('p');
      dateElement.textContent = `Generated on: ${new Date().toLocaleDateString()}`;
      dateElement.style.marginBottom = '20px';
      dateElement.style.textAlign = 'center';
      dateElement.style.color = '#6b7280';
      tempDiv.appendChild(dateElement);
      
      // Add entries
      entries.forEach((entry) => {
        const entryDiv = document.createElement('div');
        entryDiv.style.marginBottom = '20px';
        entryDiv.style.padding = '15px';
        entryDiv.style.border = '1px solid #e5e7eb';
        entryDiv.style.borderRadius = '8px';
        
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '10px';
        
        const cityDate = document.createElement('div');
        cityDate.innerHTML = `<strong>${entry.city}</strong> - ${formatDate(entry.date)}`;
        header.appendChild(cityDate);
        
        const weather = document.createElement('div');
        weather.textContent = `${formatTemperature(entry.temperature, unit)}, ${entry.description}`;
        header.appendChild(weather);
        
        entryDiv.appendChild(header);
        
        const notes = document.createElement('p');
        notes.textContent = entry.notes;
        notes.style.marginTop = '10px';
        entryDiv.appendChild(notes);
        
        tempDiv.appendChild(entryDiv);
      });
      
      // Generate PDF
      const canvas = await html2canvas(tempDiv);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('weather-journal.pdf');
      
      // Clean up
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting || entries.length === 0}
      className="flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      <FileDown size={18} className="mr-2" />
      {isExporting ? 'Exporting...' : 'Export to PDF'}
    </button>
  );
};

export default ExportButton;