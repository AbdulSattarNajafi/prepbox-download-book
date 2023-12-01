import PlansCard from './../../components/cards/PlansCard';
import Button from '../../components/button/Button';
import classes from './Plans.module.css';

const Plans = () => {
    return (
        <section className={classes.plans} id='plans'>
            <div className='container'>
                <div className={classes['plans-title']}>
                    <h2>Our Plans</h2>
                </div>
                <div className={classes['plans-grid']}>
                    <PlansCard
                        title='A.I.'
                        price="$19.99 per month"
                        session='1-month free'
                    />
                    <PlansCard 
                        title='Group' 
                        price="$200-$450 per month" 
                        session='1-4 times per week' 
                    />
                    <PlansCard 
                        title='1:1' 
                        price="$80-$100 per hour" 
                        session='flexible times' 
                    />
                </div>
                <div className={classes['plans-button']}>
                    <Button url='https://prepboxconsultation.paperform.co/'>Book consultation</Button>
                </div>
            </div>
        </section>
    );
};

export default Plans;
