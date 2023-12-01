import ReactPlayer from 'react-player';
import JumpToCourse from './../../assets/videos/jump-to-course.mp4';
import classes from './StudentPractice.module.css';

const StudentPractice = () => {
    return (
        <section className={classes.section}>
            <div className='container'>
                <div className={classes.sectionContent}>
                    <div className={classes.sectionContentTexts}>
                        <h3>
                            <span className='text-blue'>Jump to the sections</span> that need practice
                        </h3>
                        <p>
                            Pick the sections you need from 3,000+ questions. Our A.I. will even give you more questions if you need! 
                        </p>
                    </div>

                    <div className={classes.sectionContentVideo}>
                        <ReactPlayer url={JumpToCourse} width='100%' controls={true} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentPractice;
