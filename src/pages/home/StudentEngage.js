import ReactPlayer from 'react-player';
import WhiteboardIntro from './../../assets/videos/whiteboard-intro.mov';
import Button from '../../components/button/Button';
import classes from './StudentEngage.module.css';

const StudentEngage = () => {
    return (
        <section className={classes.section}>
            <div className='container'>
                <div className={classes.sectionContent}>
                    <div className={classes.sectionContentVideo}>
                        <ReactPlayer url={WhiteboardIntro} width='100%' controls={true} />
                    </div>

                    <div className={classes.sectionContentTexts}>
                        <h3>
                            Solve problems and receive <span className='text-blue'>instant feedback</span>
                            {/* <span className='text-blue'> low-stakes practice </span> */}
                        </h3>
                        <p>
                            Instant marking and solution videos keep students engaged. On average, our students solve <span className="text-blue">70 questions per month</span>
                        </p>
                        <p className={classes.priceText}>
                            *Instant marking is
                            <span className='text-blue'> free for the 1st month</span> and $19.99 /
                            month afterwards
                        </p>

                        <Button
                            type='external-link'
                            url='https://prepboxconsultation.paperform.co/'
                        >
                            Set up my course!
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentEngage;
