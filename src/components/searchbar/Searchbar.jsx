import { SearchForm } from './SearchForm';
import { SearchbarHeader } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => <SearchbarHeader><SearchForm onSubmit={onSubmit}/></SearchbarHeader>;
        
