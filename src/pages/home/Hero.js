import Button from '../../components/button/Button';
import HeroImage from './../../assets/images/home-hero2.png';
import classes from './Hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className='container'>
                <div className={classes.heroContent}>
                    <div className={classes.heroContentTexts}>
                        <h1>
                            Math with <span className='text-blue'>world-class instructions</span> and <span className='text-blue'>instant feedback</span>
                        </h1>
                        <h2>
                            Achieve mastery through guided practice with immediate feedback, and progress reports
                        </h2>
                        <Button
                            type='external-link'
                            url='https://prepboxconsultation.paperform.co/'
                        >
                            Book consultation
                        </Button>
                    </div>

                    <div className={classes.heroContentImage}>
                        <img src={HeroImage} alt='Banner' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;