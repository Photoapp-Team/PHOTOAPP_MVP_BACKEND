const express = require("express");
const { STRIPE_SECRET, STRIPE_WEBHOOK_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET);
const User = require("../models/users.model");
const { DOMAIN } = process.env;

const router = express.Router();
const app = express();
//router.use(express.static("."));
const endpointSecret = STRIPE_WEBHOOK_KEY;
router.post("/create-checkout-session", async (req, res) => {
  const { userId } = req.body;
  const arrayProducts = [];
  const prices = await stripe.prices.list({
    lookup_keys: [],
    expand: ["data.product"],
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${DOMAIN}/PayResponse/${userId}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  if (session.id) {
    const user = await User.findById(userId);
    if (user?.premium?.isPremium === false) {
      const userData = { ...user._doc, currentPaymentId: session.id };

      const userAfter = await User.findByIdAndUpdate(userId, userData, {
        returnDocument: "after",
      });
    }
  }

  res.redirect(303, session.url);
});

router.post("/create-portal-session", async (req, res) => {
  const { session_id, userId } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, userId);
  const returnUrl = DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });
  res.redirect(303, portalSession.url);
});
router.post("/webhook", express.json({ type: "application/json" }), async (request, response) => {
  const event = request.body;

  switch (event.type) {
    case "checkout.session.completed":
      const sessionCompleted = event.data.object;

      const user = await User.findOne({ currentPaymentId: sessionCompleted.id });
      if (user?.name) {
        const today = new Date();
        const expirationDate = new Date(new Date().setDate(today.getDate() + 30));
        user.premium.isPremium = true;
        user.premium.expirationDate = expirationDate;
        user.save();
      }

      break;

    default:
  }
  response.json({ received: true });
});

module.exports = router;
