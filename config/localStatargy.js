// import { Strategy as LocalStrategy } from 'passport-local';
// import User from '../models/User.model.js';

// const initializeLocalStrategy = (passport) => {
//   passport.use(
//     new LocalStrategy(async (username, password, done) => {
//       try {
//         const user = await User.findOne({ username: username });
//         if (!user) {
//           return done(null, false);
//         }
//         if (user.password !== password) {
//           return done(null, false);
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });
  
// };

// export default initializeLocalStrategy;
