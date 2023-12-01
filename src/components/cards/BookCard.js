import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classes from './BookCard.module.css';
import { useDownloadBook } from '../../contexts/downloadBookContext';
const BookCard = ({ book, formRef }) => {
    const {
        id: bookId,
        name,
        common_name: commonName,
        cover_image: image,
        bookPDF: bookFile,
        bookPDF_name: bookFileName,
        question_count,
        available,
    } = book;

    const navigate = useNavigate();
    const { showModalHandler, setBookHandler } = useDownloadBook();

    const bookHandler = (event) => {
        if(available === true) {
            navigate(commonName)
        } else {
            formRef.current.scrollIntoView({behavior:"smooth"})
        }
    };

    const buttonHandler = (bookFile, bookFileName, bookId, event) => {
        event.stopPropagation();
        showModalHandler();
        setBookHandler({ file: bookFile, name: bookFileName, id: bookId});
    };

    const renderButton = (available) => {
        if (available === true) {
            return (
                <button
                    onClick={(event) => buttonHandler(bookFile, bookFileName, bookId, event)}
                    className={classes['card__body-button']}
                >
                    Get the Book
                </button>
            );
        } else {
            return (
                <button
                    disabled
                    onClick={(event) => buttonHandler(bookFile, bookFileName, bookId, event)}
                    className={classes['card__body-button-unavailable']}
                >
                    Coming Soon
                </button>
            );
        }
    };

    return (
        <div className={classes.card} onClick={bookHandler}>
            <div className={classes['card__image']}>
                <LazyLoadImage src={image} alt={name} width='200' height='200' />
            </div>
            <div className={classes['card__body']}>
                <h3 className={classes['card__body-title']}>{name}</h3>
                {available ? <p className={classes['card__body-body']}>Questions with video: {question_count}</p> : <p className={classes['card__body-body']}>  in progress!  </p>}
                {renderButton(available)}
            </div>
        </div>
    );
};

export default BookCard;
