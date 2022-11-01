const express = require("express");
const env = require ('react-dotenv')
const { STRIPE_SECRET, STRIPE_WEBHOOK_KEY } = process.env;
const stripe = require("stripe")(env.STRIPE_SECRET);

const { DOMAIN } = env.DOMAIN;


const router = express.Router();
router.use(express.static('.'));

router.post('/create-checkout-session', async (req, res) => {
    const arrayProducts= [];
    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
      });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN}/payment_sucess`, 
      cancel_url: `${DOMAIN}/payment_failed`,
    });
    console.log (session.url)
    res.redirect(303, session.url);

  });
  
router.post('/create-portal-session', async (req, res) => {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const returnUrl = DOMAIN;
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  
    res.redirect(303, portalSession.url);
  });
  
  router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    (request, response) => {
      let event = request.body;
        const endpointSecret = STRIPE_WEBHOOK_KEY ;

      if (endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent( request.body, signature, endpointSecret );
          console.log("Webhook verified.")
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
      
      
      let subscription;
      let status;
      console.log ("event.type", event.type)


      switch (event.type) {
        case 'customer.subscription.trial_will_end':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        case 'customer.subscription.deleted':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        case 'customer.subscription.created':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // fecha de cuando inicia y cuando termina  y estatus de pagado
          // Then define and call a method to handle the subscription created.
          // handleSubscriptionCreated(subscription);
          break;
        case 'customer.subscription.updated':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription update.
          // handleSubscriptionUpdated(subscription);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );
  
  module.exports = router;

