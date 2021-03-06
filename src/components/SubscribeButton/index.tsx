import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
   priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const session = useSession(); //ele faz com []
   
   async function handleSubscribe() {
       console.log('chegou aqui')
       if (!session) {
            signIn('github')
            return;
        }

        
        try {
            const response = await api.post('/subscribe')
            console.log('a',response)
            const { sessionId } = response.data;
            const stripe = await getStripeJs()
            await stripe.redirectToCheckout({ sessionId: sessionId })
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}