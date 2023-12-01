import StudentProgressImage from './../../assets/images/student-progress.png';
import classes from './StudentProgress.module.css';

const StudentProgress = () => {
    return (
        <section className={classes.section}>
            <div className='container'>
                <div className={classes.sectionContent}>
                    <div className={classes.sectionContentTexts}>
                        <h3>
                        <span className='text-blue'>Monitor progress</span> and review mistakes in detail
                        </h3>
                        <p>
                            <span className='text-blue'>You can track progress</span> through detailed reports <span className='text-blue'>showing all the steps and work</span>
                        </p>
                    </div>

                    <div className={classes.sectionContentImage}>
                        <img src={StudentProgressImage} alt='Student Progress' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentProgress;
