import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyledForm, StyledField, SearchFormButton, StyledErrorMessage } from './SearchForm.styled';
import { FaSearch } from 'react-icons/fa';

export const SearchForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ query: '' }}
            validationSchema={Yup.object({
                query: Yup.string().trim().required('Enter something'),
            })}
            onSubmit={onSubmit}
        >
            <StyledForm autoComplete='off'  >
                <SearchFormButton aria-label="search" type='sumbit'>
                    <FaSearch />
                </SearchFormButton>
                <StyledField type="text" name="query" placeholder="Search images and photos" />
                <StyledErrorMessage name="query" component="span" />
            </StyledForm>  
        </Formik>
    )

 }