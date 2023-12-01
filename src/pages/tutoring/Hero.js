import { useState } from 'react';
import Button from '../../components/button/Button';
import TutorHero from './../../assets/images/heroA.png';
import classes from './Hero.module.css';

const Hero = () => {
    const [isHovering, setHover] = useState(false);

    return (
        <section className={classes.hero}>
            <div className='container'>
                <div className={classes.heroContent}>
                    <div className={classes.texts}>
                        <h1>
                            Don't settle for less <br/>
                            <span className='text-blue'> Ace your math tests</span>
                        </h1>
                        <p>
                            <span className='text-blue'>Math skills give you wings</span> in life. <br/>Let us help you soar
                        </p>
                        <div className={classes.textsButton}
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
                    <div className={classes.image}>
                        <img src={TutorHero} alt='Tutor' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
