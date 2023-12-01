import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import Loader from '../../components/elements/loader';
import SecondaryButton from '../../components/button/secondary-button';
import BookCard from '../../components/cards/BookCard';
import classes from './Books.module.css';
import booksConstant from '../../constant/books';
import { useDownloadBook } from '../../contexts/downloadBookContext';
import DownloadBookModal from '../../components/elements/DownloadBookModal';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCurriculum, setSelectedCurriculum] = useState('');
    const formRef = useRef();

    const { showModal } = useDownloadBook();

    const filteredBooks = selectedCurriculum
        ? books.filter((book) => book.country === selectedCurriculum)
        : booksConstant;

    useEffect(() => {
        const script = document.createElement('script');
        script.src='//js.hsforms.net/forms/embed/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: '24047407',
                    formId: '4a23a9cc-bdc6-433a-9ac9-300bce68a5ea',
                    target: '#hubspotForm'
                })
            }
        });

        const getBooks = async () => {
            try {
                setIsLoading(true);
                setError('');
                // Reinstate once the API is fully loaded with books
                // const response = await axios.get(
                //     // 'https://app.prepanywhere.com/api/stu/static_books/all_books'
                //     '../../constant/books'
                // );
                // setBooks(response.data);
                setBooks(booksConstant);
            } catch (error) {
                if (error.response) {
                    setError('No Data Found!');
                } else if (error.request) {
                    setError('Network Error');
                } else {
                    setError('Something went wrong, Please try again!');
                }
            } finally {
                setIsLoading(false);
            }
        };
        // console.log(filteredBooks)
        // console.log(selectedCurriculum)
        getBooks();
    }, []);

    const handleCurriculumChange = (curriculum) => {
        setSelectedCurriculum(curriculum);
    };

    return (
        <div className={classes.section}>
            <div className={classes.header}>
                <h1> <span className="text-blue">FREE Curriculum-aligned Workbooks</span></h1>
            </div>
            <div className={classes.header}>
                <p> Over 3,000 questions per workbook with a video solution for each question</p>
            </div>
            <div className={classes.container}>
                <div className={classes['section__header']}>
                    <SecondaryButton
                        text='All'
                        isActive={selectedCurriculum === '' ? true : false}
                        onClick={() => handleCurriculumChange('')}
                    />
                    <SecondaryButton
                        text='United States'
                        isActive={selectedCurriculum === 'USA' ? true : false}
                        onClick={() => handleCurriculumChange('USA')}
                    />
                    <SecondaryButton
                        text='Canada'
                        isActive={selectedCurriculum === 'CA' ? true : false}
                        onClick={() => handleCurriculumChange('CA')}
                    />
                </div>
                {isLoading && <Loader />}
                {error && <p className='error-message'>{error}</p>}
                {!error && !isLoading && (
                    <div className={classes['section__grid']}>
                        {filteredBooks.map((book) => {
                            return (
                                <BookCard 
                                    key={book.id} 
                                    book={book}
                                    formRef={formRef}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            {showModal && <DownloadBookModal />}
            <div ref={formRef} className={classes.container}>
                <div className={classes.header}>
                    <h1> <span className="text-blue">Don't see the workbook you need?</span></h1>
                </div>
                <div className={classes.header}>
                    <p> Tell us what you need! We'll have it ready in no time</p>
                </div>
                <div className={classes.formWrapper}>
                    <div id="hubspotForm"></div>
                </div>
            </div>
        </div>
    );
};

export default Books;
