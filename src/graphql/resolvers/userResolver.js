const { User, validateUser } = require("../../models/user");
const bcrypt = require("bcrypt");
const JwtService = require("../../services/jwtService");
module.exports = {
  Query: {
    getUser: async () => {
      try {
        const result = await User.find();
        return result.map((user) => {
          return { ...user._doc };
        });
      } catch (error) {
        throw error;
      }
    },
    login: async (_, args, { res }) => {
      console.log("entered login");
      // Validation
      const authSchema = validateUser.fork(["name", "userType"], (schema) =>
        schema.optional()
      );
      const { error } = authSchema.validate(args.input);
      if (error) return next(error);

      if (error) {
        throw new Error(error.message);
      }
      try {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Password is incorrect");
        }
        const access_token = JwtService.sign({
          userId: user._id,
          userType: user.userType,
        });
        console.log(access_token)
        res.cookie("jwt", access_token, { httpOnly: true });
        return { ...user._doc };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      console.log("entered createUser");

      const { error } = validateUser.validate(args.input);
      if (error) {
        throw new Error(error.message);
      }
      try {
        const isEmail = await User.exists({ email: args.input.email });
        if (isEmail) {
          throw new Error("Email already exists");
        }

        args.input.password = await bcrypt.hash(args.input.password, 10);

        const user = new User({ ...args.input });

        console.log(user, "user");

        const result = await user.save();
        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (args) => {
      try {
        args.input.password = await bcrypt.hash(args.input.password, 10);

        const result = await User.findOneAndUpdate(
          { _id: args.id },
          { ...args.input },
          { new: true }
        );
        return { ...result._doc };
      } catch (error) {
        throw error;
      }
    },
  },
};
