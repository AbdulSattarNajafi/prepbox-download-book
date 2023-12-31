import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/elements/loader';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Latex from 'react-latex';
import capitalizeString from '../../../utils/capital';
import { AiFillCaretLeft } from 'react-icons/ai';
import classes from './Solution.module.css';
import Button from '../../../components/button/Button';
// const sgMail = require('@sendgrid/mail');

const Solution = () => {
    const navigate = useNavigate();
    const { bookName, materialName, chapterName, questionId } = useParams();
    const [solutions, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageId, setImageId] = useState('');
    const [isHovering, setHover] = useState(false);

    useEffect(() => {
        // sgMail
        //     .send(msg)
        //     .then(() => {
        //         console.log('Email sent')
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })

        const getSolution = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await axios.get(
                    `https://app.prepanywhere.com/api/stu/static_books/question_details?id=${questionId}`
                );
                const data = response.data;
                const parser = new DOMParser();
                const doc = parser.parseFromString(data?.question_html, 'text/html');

                const imageElement = doc.querySelector('img');
                const imageSrc = imageElement ? imageElement.getAttribute('src') : '';

                const imageId = imageSrc.substring(imageSrc.lastIndexOf('/') + 1);

                const isImageIdExist =
                    data?.question?.slice(-(imageId.length + 1)) === `#${imageId}`;

                const questionData = isImageIdExist
                    ? data.question?.slice(0, -(imageId.length + 1))
                    : data.question;

                const solutionData = {
                    ...data,
                    question: questionData.replace(/`/g, ''),
                };

                setSolution(solutionData);
                setImageId(imageId);
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
        getSolution();
    }, [questionId]);

    const bookNavigationHandler = (bookName) => {
        navigate(`/worksheets/${bookName}`, { replace: true });
    };
    const worksheetNavigationHandler = () => {
        navigate(`/worksheets`, { replace: true });
    };

    const materialNavigationHandler = (bookName, chapterName, materialName) => {
        navigate(`/worksheets/${bookName}/${chapterName}/${materialName}`, { replace: true });
    };

    return (
        <section className={classes.solution}>
            <div className={classes.navigation}>
                <div className='container'>
                    <div className={classes.navigationBook}>
                        <div
                            className={classes.navigationPrevious}
                            onClick={() => worksheetNavigationHandler()}
                        >
                            <span>
                                <AiFillCaretLeft />
                            </span>
                            <span>All Workbooks</span>
                        </div>
                        <div
                            className={classes.navigationPrevious2}
                            onClick={() => bookNavigationHandler(bookName)}
                        >
                            <span>
                                <AiFillCaretLeft />
                            </span>
                            <span>{capitalizeString(bookName.replace(/-/g, ' '))}</span>
                        </div>
                    </div>
                    <div
                        className={classes.navigationCurrent}
                        onClick={() =>
                            materialNavigationHandler(bookName, chapterName, materialName)
                        }
                    >
                        {capitalizeString(materialName.replace(/-/g, ' '))}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className={classes['solution-body']}>
                    <h2> Don't settle. Get an A in math</h2>
                        <div 
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            >
                            <Button
                            type='external-link'
                            url='https://prepboxconsultation.paperform.co/'
                            >
                                {isHovering ? "Let's get that A+!" : "Book consultation"}
                            </Button>
                        </div>
                </div>
            </div>
            <div className='container'>
                <div className={classes['solution-container']}>
                    {isLoading && <Loader />}
                    {error && <p className='error-message'>{error}</p>}

                    {!error && !isLoading && (
                        <div>
                            {solutions ? (
                                <div className={classes['solution-body']}>
                                    {/* <h2>{capitalizeString(bookName.replace(/-/g, ' '))}</h2>
                                    <h3>
                                        {capitalizeString(
                                            materialName.replace('-', '.').replace(/-/g, ' ')
                                        )}
                                    </h3> */}
                                    <h3>Question</h3>
                                    <div className={classes.questionsTexts}>
                                        <Latex>{solutions.question}</Latex>
                                    </div>
                                    {imageId && (
                                        <img
                                            src={`https://prepanywhere.s3.amazonaws.com/qimages/${imageId}-original.png`}
                                            alt={solutions.question}
                                        />
                                    )}
                                    {solutions.youtube_code && (
                                        <div className={classes['solution-video']}>
                                            <ReactPlayer
                                                url={`https://www.youtube.com/watch?v=${solutions.youtube_code}`}
                                                width='100%'
                                                height='100%'
                                                display='flex'
                                                justify-content='center'
                                                config={{
                                                    youtube: {
                                                        playerVars: { showinfo: 1 },
                                                    },
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className={classes.questionsAnswers}> 
                                        <h3 >Answer: </h3>
                                        {solutions.answer ? <Latex>{solutions.answer}</Latex> : "not available"}
                                    </div>
                                </div>
                            ) : (
                                <div className={classes['post__error']}>
                                    <h2 className='text-blue'>Solution video not Found</h2>
                                    <p>
                                        The Solution video you are looking for might have been
                                        removed, had it's name changed or is temporary unavailable.
                                    </p>
                                    <button
                                        type='button'
                                        aria-label='Questions Page'
                                        onClick={() => navigate(-1)}
                                    >
                                        Go to Questions
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Solution;