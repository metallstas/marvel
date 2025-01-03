import { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { NavLink } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import useService from '../../services/Service'

import './searchChar.scss'

const SearchChar = () => {
    const [characters, setCharacters] = useState({status: 0, data: []})

    const {process, setProcess, clearError, getCharByName} = useService()

    const validate = (value) => {
        const error = {}
        if (!value.name) {
            error.name = 'This field is required'
        }
        return error
    }    

    const allCharByName = (value) => {
        clearError()
        getCharByName(value.name)
            .then(setCharacters)
            .then(() => setProcess('confirmed'))

    }

    const foundChar = (input) => {
        return (
            <div className='found-char'>
                <p className='search__success'>There is! Visit {input} page?</p>
                <NavLink to={`/characters/${input}`} className='btn btn-second'>to page</NavLink>
            </div>
        )
    }
 
    return (
        <Formik 
            initialValues={{name: ''}}
            validate={validate}
            onSubmit={allCharByName}
            >
                {({ values }) => (
                    <Form className='search'>
                        <label htmlFor='name' className='search__label'>
                            Or find a character by name:
                        </label>
                        <div className='input-block'>
                            <Field 
                                className='input-block__name'
                                name='name' 
                                id='name' 
                                type='text'
                                placeholder='Enter name'/>
                            <button type='submit' disabled={process === 'loading'} class='btn btn-main' >find</button>
                        </div>
                        {process === 'loading' ? <div style={{margin: '10px auto'}}><Spinner width={40} height={40} /></div> : null}
                        <ErrorMessage component='p' name='name' className='search__error'/>
                        {characters.data.length && values.name ? foundChar(values.name) : null}
                        {characters.status === 200 && !characters.data.length && values.name ? <p className='search__error'>The character was not found. Check the name and try again</p> : null}
                    </Form>  
                )}
            
        </Formik>
    )
}

export default SearchChar
