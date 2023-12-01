import { createPortal } from 'react-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import useInput from '../../hooks/useInput';
import { validateEmail } from '../../utils/helpers';
import { useDownloadBook } from '../../contexts/downloadBookContext';
import axios from 'axios';

import classes from './DownloadBookModal.module.css';

const DownloadBookModal = () => {
    const { hideModalHandler, downloadBookHandler, book } = useDownloadBook();
    const ref = useOutsideClick(hideModalHandler);

    const {
        value: selectedType,
        isValid: selectedTypeIsValid,
        hasError: selectedTypeHasError,
        inputBlurHandler: typeBlurHandler,
        inputChangeHandler: typeChangeHandler,
    } = useInput((value) => value !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: enteredEmailHasError,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler,
    } = useInput((value) => validateEmail(value));

    const emailErrorMessage =
        enteredEmail === '' ? 'Email is required' : 'Please enter a valid Email address!';

    let formIsValid = false;

    if (selectedTypeIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    async function submitHandler(e) {
        e.preventDefault();

        const webhookUrl =
            'https://hooks.slack.com/services/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';

        if (!formIsValid) {
            typeBlurHandler();
            emailBlurHandler();
            return;
        }

        // ========= API Request
        const data = {
            text: `Workbook Downloaded! \nDownloaded book: ${book.name}\nType: ${selectedType} \nEmail: ${enteredEmail}`,
        };
        console.log(data);

        let res = await axios.all([
            // Slack API call
            axios.post(webhookUrl, JSON.stringify(data), {
                withCredentials: false,
                transformRequest: [
                    (data) => {
                        return data;
                    },
                ],
            }),
            // back-end call
            axios.post(
                `https://app.prepanywhere.com/api/stu/static_book_downloads/new_download?book_id=${book.id}&email=${enteredEmail}&user_type=${selectedType}`
            ),
        ]);
        console.log(res);
        if (res[0].status === 200 && res[1].status === 200) {
            hideModalHandler();
        } else {
            alert('There was an error.  Please try again later.');
        }

        // console.log(`I am a ${selectedType}, and my Email is ${enteredEmail}`);

        // A- Close Modal
        hideModalHandler();

        // B- Download the Book
        downloadBookHandler();
    }

    return createPortal(
        <div className={classes.modal}>
            <div className={classes.modalContent} ref={ref}>
                <form onSubmit={submitHandler} className={classes.form}>
                    <div className={classes.formControl}>
                        <label htmlFor='type'> Please tell us a bit about you! </label>
                        <select
                            id='type'
                            name='type'
                            value={selectedType}
                            onBlur={typeBlurHandler}
                            onChange={typeChangeHandler}
                        >
                            <option value='' disabled>
                                I am a parent / teacher / student
                            </option>
                            <option value='Parent'> Parent </option>
                            <option value='Teacher'> Teacher </option>
                            <option value='Student'> Student </option>
                        </select>
                        {selectedTypeHasError && (
                            <span className={classes.errorText}>
                                Please select you are a Parent, Teacher or Student
                            </span>
                        )}
                    </div>
                    <div className={classes.formControl}>
                        <input
                            type='text'
                            placeholder='Email address'
                            value={enteredEmail}
                            onBlur={emailBlurHandler}
                            onChange={emailChangeHandler}
                        />
                        {enteredEmailHasError && (
                            <span className={classes.errorText}>{emailErrorMessage}</span>
                        )}
                    </div>

                    <div className={classes.formButton}>
                        <button
                            type='button'
                            className={classes.cancelBtn}
                            onClick={() => hideModalHandler()}
                        >
                            Cancel
                        </button>
                        <button type='submit' className={classes.submitBtn}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default DownloadBookModal;
