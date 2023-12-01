import classes from './PlansCard.module.css';

const PlansCard = ({ title, price, session, eligible }) => {
    return (
        <div className={classes.card}>
            <div className={classes.cardHeader}></div>
            <div className={classes.cardBody}>
                <h2 className={classes['card__title']}>{title}</h2>
                <h3 className={classes.price}>{price}</h3>
                <p className={classes.session}>
                    {session}
                </p>
                {eligible && <p className={classes.eligible}>{eligible}</p>}
            </div>
        </div>
    );
};

export default PlansCard;