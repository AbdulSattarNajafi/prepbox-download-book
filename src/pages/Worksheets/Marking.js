import Button from '../../components/button/Button';
import classes from './Marking.module.css';
import { useState } from 'react';
const Marking = () => {
    const [isHovering, setHover] = useState(false);

    return (
        <section className={classes.marking}>
            <div className='container'>
                <div className={classes.markingContent}>
                    <h2><span className="text-blue">Get an A in math</span></h2>
                    <div
                        // onMouseEnter={setHover(true)}
                        // onMouseLeave={setHover(false)}
                    >
                        <Button url='https://prepboxconsultation.paperform.co/'>Let's get it!</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Marking;