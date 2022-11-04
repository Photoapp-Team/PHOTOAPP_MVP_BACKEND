const express = require("express");
const { STRIPE_SECRET, STRIPE_WEBHOOK_KEY } = process.env;
const stripe = require("stripe")(process.env.STRIPE_SECRET); 
const User = require("../models/users.model");
const { DOMAIN } = process.env;


const router = express.Router();
router.use(express.static('.'));

router.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body;

    const arrayProducts= [];
    const prices = await stripe.prices.list({
        lookup_keys: [],
        expand: ['data.product'],
      });
      console.log({prices})

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN}/payment_success?userId=${userId}`, 
      cancel_url: `${DOMAIN}/payment_canceled`
    });
    const today = new Date ()
    const expirationDate = new Date (new Date().setDate(today.getDate()+30));
    const user= await User.findById (userId);
    console.log ("user", user)
    user.premium.isPremium= true;
    user.premium.expirationDate= expirationDate;
    user.save()
    console.log ("user", user)

    console.log (session.url)
    res.redirect(303, session.url);  
  });
  
router.post('/create-portal-session', async (req, res) => {
    const { session_id, userId } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id,userId);
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
      console.log ("event", event)
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
          console.log({subscription});
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

