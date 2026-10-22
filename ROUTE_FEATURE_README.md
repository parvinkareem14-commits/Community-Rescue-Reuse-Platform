# Route-Based 2-in-1 Volunteer Delivery (ADDITIVE FEATURE)

Existing app untouched. This module only ADDS route-based matching.

## Files added
- backend/utils/routeMatch.js (detour + score heuristic, no map key)
- backend/controllers/routeTravelController.js (GET/PUT travel route)
- backend/controllers/routeMatchController.js (matches, accept, skip)
- backend/controllers/routeOtpController.js (pickup/delivery OTP verify + role-scoped OTP fetch)
- frontend/src/components/TravelRouteForm.jsx (My Travel Route section)
- frontend/src/components/RouteMatchesList.jsx (Route-Matched Deliveries cards)
- frontend/src/components/RouteOTPBox.jsx (volunteer OTP entry)
- frontend/src/components/RouteOTPDisplay.jsx (donor/requester OTP view)
- frontend/src/components/RouteVolunteerCard.jsx (safe volunteer card on tracking)

## Files modified (additive only)
- backend/models/Volunteer.js: travelFrom, travelTo, travelDate, travelTime, maxDetourDistance, maxItemSize, travelStatus, skippedRouteDeliveries
- backend/models/Delivery.js: isRouteDelivery, detourDistance, estimatedExtraTime, routeMatchScore, routeInfo{}, pickupOTP(select false), deliveryOTP(select false), pickupVerified, deliveryVerified
- backend/models/Donation.js: itemSize (Small/Medium/Large)
- backend/controllers/donationController.js: accepts optional itemSize
- backend/routes/volunteerRoutes.js: + travel-route, route-matches, route-accept, route-skip
- backend/routes/deliveryRoutes.js: + verify-pickup, verify-delivery, route-otps
- frontend/src/api/client.js: + route + OTP helpers
- frontend/src/pages/VolunteerDashboard.jsx: renders TravelRouteForm + RouteMatchesList + RouteOTPBox on route tasks
- frontend/src/pages/TrackingPage.jsx: route badge + OTP display + safe volunteer card
- frontend/src/pages/CreateDonationPage.jsx: optional itemSize dropdown

## New APIs
- GET /api/volunteers/travel-route
- PUT /api/volunteers/travel-route {travelFrom, travelTo, travelDate, travelTime, vehicleType, maxDetourDistance, maxItemSize, travelStatus}
- GET /api/volunteers/route-matches -> scored open deliveries
- POST /api/volunteers/route-accept {deliveryId} (reuses Volunteer Assigned flow, stamps route info + OTPs)
- POST /api/volunteers/route-skip {deliveryId}
- POST /api/deliveries/:id/verify-pickup {otp} -> Picked Up
- POST /api/deliveries/:id/verify-delivery {otp} -> Delivered
- GET /api/deliveries/:id/route-otps (donor sees pickup OTP, requester sees delivery OTP)

## Run
- Backend: cd backend; npm install; npm run dev (needs MONGO_URI + JWT_SECRET)
- Frontend: cd frontend; npm install; npm run dev

## Test 2-in-1 flow
1. Seed or create donor donation (Guindy, Small) + requester request (Tambaram) -> confirm Match in admin so a Delivery task (volunteer=null) exists.
2. Login as volunteer -> /dashboard/volunteer -> My Travel Route: From Chennai, To Tambaram, max detour 5km, size Small -> Save.
3. Route-Matched Deliveries shows card: Pickup Guindy, Drop Tambaram, +3km, score ~82%, GOOD MATCH -> Accept.
4. Claimed task shows OTP box; Tracking page (donor login) shows Pickup OTP; requester login shows Delivery OTP.
5. Volunteer enters pickup OTP -> Picked Up; delivery OTP -> Delivered; then existing Mark Completed finishes + points.
6. Existing flows (donate/request/match/volunteer/track) unchanged — all old tests still valid.
