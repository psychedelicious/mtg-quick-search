import findCard from './findCard';
import getSelection from './util/getSelection';

let { text: searchTerm, x, y } = getSelection();

findCard({ searchTerm, x, y });
